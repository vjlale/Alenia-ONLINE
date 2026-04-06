import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateImage, fileToBase64, generatePromptSuggestions } from './services/geminiService';
import type { Status } from './types';
import { Logo } from './components/Logo';
import { UploadIcon, SparklesIcon, DownloadIcon, EditIcon, XCircleIcon, WandSparklesIcon, RefreshIcon, SunIcon, CameraIcon, SwatchIcon, BuildingOfficeIcon, HomeModernIcon, StarIcon } from './components/Icons';
import { Spinner } from './components/Spinner';
import { useInterval } from './hooks/useInterval';
import { useEmbedMode } from './hooks/useEmbedMode';
import { loadingMessages, promptIdeas, sceneOptions } from './constants';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { MaintenanceModal } from './components/MaintenanceModal';
import { ImagePanel } from './components/ImagePanel';
import AnimatedBackground from './components/AnimatedBackground';
import logoTitle from './images/logotit.png';

const sceneIcons: { [key: string]: React.FC<{className?: string}> } = {
  Nature: SunIcon,
  Studio: CameraIcon,
  Gradient: SwatchIcon,
  Urban: BuildingOfficeIcon,
  Kitchen: HomeModernIcon,
  Luxury: StarIcon,
};

const isMaintenance = import.meta.env.VITE_EPIX_MAINTENANCE === 'true';

export default function App() {
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(true);
  const [sourceImage, setSourceImage] = useState<{ file: File; url: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [promptSuggestions, setPromptSuggestions] = useState<string[]>(promptIdeas);
  const [suggestionsLoading, setSuggestionsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  // Hook para detectar modo embed
  const { isEmbedded, embedConfig, sendToParent, requestFullscreen } = useEmbedMode();

  useInterval(() => {
    setLoadingMessage(prev => {
      const currentIndex = loadingMessages.indexOf(prev);
      const nextIndex = (currentIndex + 1) % loadingMessages.length;
      return loadingMessages[nextIndex];
    });
  }, status === 'loading' ? 2000 : null);

  const fetchSuggestions = useCallback(async () => {
    if (!sourceImage) return;

    setSuggestionsLoading(true);
    setPromptSuggestions([]);
    try {
        const base64Image = await fileToBase64(sourceImage.file);
        const newSuggestions = await generatePromptSuggestions(base64Image, sourceImage.file.type);
        if (newSuggestions.length > 0) {
            setPromptSuggestions(newSuggestions);
        } else {
            setPromptSuggestions(promptIdeas);
        }
    } catch (e) {
        console.error("Failed to fetch suggestions:", e);
        setPromptSuggestions(promptIdeas);
    } finally {
        setSuggestionsLoading(false);
    }
  }, [sourceImage]);

  useEffect(() => {
    if (sourceImage) {
        fetchSuggestions();
    } else {
        setPromptSuggestions(promptIdeas);
    }
  }, [sourceImage, fetchSuggestions]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSourceImage({ file, url: URL.createObjectURL(file) });
      setGeneratedImage(null);
      setError(null);
      setStatus('idle');
      promptInputRef.current?.focus();
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = useCallback(async () => {
    if (!sourceImage || !prompt) return;

    setStatus('loading');
    setError(null);

    // Notificar al parent si estamos en modo embed
    if (isEmbedded) {
      sendToParent('GENERATION_STARTED', { prompt });
    }

    try {
      const base64Image = await fileToBase64(sourceImage.file);
      const result = await generateImage(base64Image, sourceImage.file.type, prompt);

      if (result.error) {
        throw new Error(result.error);
      }
      
      if(result.image) {
        setGeneratedImage(`data:image/png;base64,${result.image}`);
        setStatus('success');
        
        // Notificar éxito al parent
        if (isEmbedded) {
          sendToParent('GENERATION_SUCCESS', { 
            prompt,
            hasImage: true 
          });
        }
      } else {
        const refusalReason = result.text || 'El modelo no devolvió una imagen. Por favor, intenta con una indicación diferente.';
        throw new Error(refusalReason);
      }
    } catch (e) {
      const err = e as Error;
      setError(err.message);
      setStatus('error');
      
      // Notificar error al parent
      if (isEmbedded) {
        sendToParent('GENERATION_ERROR', { 
          error: err.message,
          prompt 
        });
      }
    }
  }, [sourceImage, prompt, isEmbedded, sendToParent]);
  
  const handleRefine = useCallback(async () => {
    if (!generatedImage || !prompt) return;

    setStatus('loading');
    setError(null);

    try {
        const base64Image = generatedImage.split(',')[1];
        const result = await generateImage(base64Image, 'image/png', prompt);

        if (result.error) {
            throw new Error(result.error);
        }
        
        if (result.image) {
            setGeneratedImage(`data:image/png;base64,${result.image}`);
            setStatus('success');
        } else {
            const refusalReason = result.text || 'El modelo no devolvió una imagen. Por favor, intenta con una indicación diferente.';
            throw new Error(refusalReason);
        }
    } catch (e) {
        const err = e as Error;
        setError(err.message);
        setStatus('error');
    }
  }, [generatedImage, prompt]);

  const handleSceneClick = useCallback(async (scenePrompt: string) => {
    if (!sourceImage) return;

    setPrompt(scenePrompt);
    setStatus('loading');
    setError(null);

    try {
      const base64Image = await fileToBase64(sourceImage.file);
      const result = await generateImage(base64Image, sourceImage.file.type, scenePrompt);

      if (result.error) {
        throw new Error(result.error);
      }
      
      if(result.image) {
        setGeneratedImage(`data:image/png;base64,${result.image}`);
        setStatus('success');
      } else {
        const refusalReason = result.text || 'El modelo no devolvió una imagen. Por favor, intenta con una indicación diferente.';
        throw new Error(refusalReason);
      }
    } catch (e) {
      const err = e as Error;
      setError(err.message);
      setStatus('error');
    }
  }, [sourceImage]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'imagen-producto-generada.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetState = () => {
    setSourceImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setStatus('idle');
    setError(null);
    setPromptSuggestions(promptIdeas);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }
  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);

    if (value) {
        const filteredSuggestions = promptIdeas.filter(idea => 
            idea.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
               .includes(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setActiveSuggestionIndex(0);
    } else {
        setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions && suggestions.length > 0) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex(prevIndex => (prevIndex + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            setPrompt(suggestions[activeSuggestionIndex]);
            setShowSuggestions(false);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    }
  };

  const isLoading = status === 'loading';

  if (isMaintenance) {
    return (
      <>
        <AnimatedBackground />
        {maintenanceModalOpen ? (
          <MaintenanceModal onClose={() => setMaintenanceModalOpen(false)} />
        ) : (
          <div className="min-h-screen bg-cyber-dark text-cyber-text font-sans flex flex-col items-center justify-center p-4">
            <Logo className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
              E-pix en mantenimiento
            </h1>
            <p className="text-cyber-text-muted mb-6 text-center max-w-md">
              Estamos actualizando la app. Te avisaremos cuando esté disponible.
            </p>
            <button
              type="button"
              onClick={() => setMaintenanceModalOpen(true)}
              className="bg-neon-cyan text-black font-bold py-2 px-6 rounded-lg hover:shadow-glow-cyan transition-all"
            >
              Ver aviso
            </button>
          </div>
        )}
      </>
    );
  }

  // Clases dinámicas basadas en modo embed
  const containerClasses = isEmbedded 
    ? embedConfig.compactMode 
      ? "h-full bg-cyber-dark text-cyber-text font-sans overflow-hidden"
      : "min-h-full bg-cyber-dark text-cyber-text font-sans"
    : "min-h-screen bg-cyber-dark text-cyber-text font-sans";

  const mainClasses = isEmbedded
    ? embedConfig.compactMode
      ? "h-full px-2 py-2"
      : "container mx-auto px-4 py-4"
    : "container mx-auto px-4 py-8";

  const showHeader = !isEmbedded || !embedConfig.hideHeader;

  return (
    <>
      <AnimatedBackground />
      <div
        className={`${containerClasses} ${embedConfig.maxHeight ? 'custom-max-height' : ''}`}
        data-max-height={embedConfig.maxHeight || undefined}
        style={{ maxHeight: embedConfig.maxHeight || 'none' }}
      >
        <main className={mainClasses}>
        {showHeader && (
          <header className={`flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left ${isEmbedded ? 'mb-4' : 'mb-10'}`}>
            <Logo className={`${isEmbedded && embedConfig.compactMode ? 'w-12 h-12' : 'w-20 h-20'} flex-shrink-0`} />
            <div>
              <img
                src={logoTitle}
                alt="PicShop AI Studio"
                className={`${isEmbedded && embedConfig.compactMode ? 'h-8' : 'h-10 sm:h-12 md:h-14'} w-auto object-contain mx-auto sm:mx-0`}
              />
              {isEmbedded && (
                <button
                  onClick={requestFullscreen}
                  className="mt-2 text-xs text-cyber-text-muted hover:text-neon-cyan transition-colors"
                  title="Abrir en pantalla completa"
                >
                  ⛶ Pantalla completa
                </button>
              )}
            </div>
          </header>
        )}

        {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 shadow-lg shadow-red-500/10" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!sourceImage && (
            <div className="bg-cyber-bg border border-cyber-border rounded-lg p-8 mb-8 text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-cyan text-transparent bg-clip-text">
                    ¡Bienvenido a E-pix Studio!
                </h2>
                <p className="text-cyber-text-muted max-w-2xl mx-auto">
                    Da el primer paso para transformar las imágenes de tus productos. Sube una foto para empezar a crear escenas de estilo de vida impactantes, resaltar los beneficios del producto o realizar cualquier edición que puedas imaginar.
                </p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ImagePanel title="PRODUCTO ORIGINAL" imageUrl={sourceImage?.url || null}>
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-cyber-border rounded-lg text-center">
                    <UploadIcon className="w-12 h-12 text-cyber-text-muted mb-4" />
                    <h4 className="font-semibold mb-2">Sube la imagen de tu producto</h4>
                    <p className="text-sm text-cyber-text-muted mb-4">PNG, JPG o WEBP</p>
                    <input
                      type="file"
                      id="product-image-upload"
                      name="product-image"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp"
                      aria-label="Subir imagen de producto"
                      title="Subir imagen de producto"
                    />
                    <button
                      onClick={handleImageUploadClick}
                      className="bg-neon-cyan text-black font-bold py-2 px-5 rounded-lg transition-all duration-300 hover:shadow-glow-cyan-lg"
                    >
                      Buscar Archivo
                    </button>
                  </div>
                </ImagePanel>

                {/* Controles móviles: se muestran debajo de "PRODUCTO ORIGINAL" y antes de "IMAGEN GENERADA" */}
                <div className="block md:hidden bg-cyber-bg rounded-lg p-6 flex flex-col justify-between border border-cyber-border">
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-4 tracking-wide">
                      {generatedImage ? 'Refina Tu Imagen' : '1. Describe la Escena'}
                    </h3>
                    <div className="relative">
                      <textarea
                        ref={promptInputRef}
                        value={prompt}
                        onChange={handlePromptChange}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        placeholder={generatedImage ? "ej., haz el fondo más brillante" : "ej., en un mostrador de cocina..."}
                        disabled={isLoading || !sourceImage}
                        className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 pr-10 resize-none focus:border-neon-pink focus:ring-0 focus:shadow-glow-pink transition-all duration-300"
                        rows={3}
                        autoComplete="off"
                      />
                      <div className="absolute top-3 right-3 text-cyber-text-muted">{generatedImage ? <EditIcon /> : <SparklesIcon />}</div>
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-cyber-bg border border-cyber-border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`p-2 text-sm cursor-pointer text-cyber-text hover:bg-neon-pink hover:text-black ${index === activeSuggestionIndex ? 'bg-neon-pink text-black' : ''}`}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold text-cyber-text-muted flex items-center gap-2">
                          <WandSparklesIcon /> {sourceImage ? 'Ideas Sugeridas por IA' : 'Ideas de Prompts'}
                        </h4>
                        {sourceImage && (
                          <button
                            onClick={fetchSuggestions}
                            disabled={suggestionsLoading}
                            className="text-cyber-text-muted hover:text-neon-cyan transition-colors disabled:opacity-50 disabled:cursor-wait"
                            aria-label="Refrescar sugerencias"
                          >
                            <RefreshIcon className={`w-5 h-5 ${suggestionsLoading ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestionsLoading ? (
                          Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="bg-cyber-border h-6 w-32 rounded-md animate-pulse"></div>
                          ))
                        ) : (
                          promptSuggestions.map(idea => (
                            <button
                              key={idea}
                              onClick={() => setPrompt(idea)}
                              disabled={isLoading || !sourceImage}
                              className="text-xs bg-cyber-border px-2 py-1 rounded-md text-cyber-text hover:bg-neon-pink hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {idea}
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {!generatedImage && (
                      <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4 tracking-wide">2. O Elige una Escena Rápida</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {sceneOptions.map((scene) => {
                            const Icon = sceneIcons[scene.label];
                            return (
                              <button
                                key={scene.label}
                                onClick={() => handleSceneClick(scene.prompt)}
                                disabled={isLoading || !sourceImage}
                                className="flex flex-col items-center justify-center gap-2 text-center p-3 bg-cyber-border rounded-lg text-cyber-text-muted hover:text-neon-cyan hover:border-neon-cyan border-2 border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Icon className="w-6 h-6" />
                                <span className="text-xs font-semibold">{scene.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-6 flex flex-col gap-4">
                      <button
                        onClick={generatedImage ? handleRefine : handleGenerate}
                        disabled={isLoading || !sourceImage || !prompt.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-neon-pink text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-glow-pink-lg disabled:bg-cyber-border disabled:text-cyber-text-muted disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        {generatedImage ? <><EditIcon className="w-5 h-5" /> Refinar</> : <><SparklesIcon className="w-5 h-5" /> Generar</>}
                      </button>
                      <button
                        onClick={handleDownload}
                        disabled={!generatedImage || isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-neon-cyan text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-glow-cyan-lg disabled:bg-cyber-border disabled:text-cyber-text-muted disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        <DownloadIcon /> Descargar Imagen
                      </button>
                      <button
                        onClick={resetState}
                        disabled={!sourceImage}
                        className="w-full flex items-center justify-center gap-2 bg-cyber-border text-cyber-text-muted font-semibold py-3 px-4 rounded-lg hover:bg-red-500/20 hover:text-white transition-colors disabled:opacity-50"
                      >
                        <XCircleIcon /> Empezar de Nuevo
                      </button>
                    </div>
                  </div>
                </div>

                <ImagePanel
                    title="IMAGEN GENERADA"
                    imageUrl={generatedImage}
                    onClick={() => generatedImage && !isLoading && setIsModalOpen(true)}
                    className={generatedImage && !isLoading ? 'cursor-zoom-in' : ''}
                >
                    {isLoading && (
                        <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-md p-4 text-center">
                            <Spinner />
                            <p className="text-cyber-text font-medium transition-opacity duration-500">{loadingMessage}</p>
                        </div>
                    )}
                    {!generatedImage && !isLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-6">
                            <SparklesIcon className="w-12 h-12 text-cyber-text-muted mb-4" />
                            <h4 className="font-semibold text-cyber-text">Tu imagen generada por IA aparecerá aquí</h4>
                        </div>
                    )}
                </ImagePanel>
            </div>

            <div className="hidden md:flex md:flex-col md:justify-between bg-cyber-bg rounded-lg p-6 border border-cyber-border">
              <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4 tracking-wide">
                      {generatedImage ? 'Refina Tu Imagen' : '1. Describe la Escena'}
                  </h3>
                  <div className="relative">
                    <textarea
                      id="prompt-input-desktop"
                      name="prompt"
                      ref={promptInputRef}
                      value={prompt}
                      onChange={handlePromptChange}
                      onKeyDown={handleKeyDown}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                      placeholder={generatedImage ? "ej., haz el fondo más brillante" : "ej., en un mostrador de cocina..."}
                      disabled={isLoading || !sourceImage}
                      className="w-full bg-cyber-dark border border-cyber-border rounded-lg p-3 pr-10 resize-none focus:border-neon-pink focus:ring-0 focus:shadow-glow-pink transition-all duration-300"
                      rows={3}
                      autoComplete="off"
                    />
                     <div className="absolute top-3 right-3 text-cyber-text-muted">{generatedImage ? <EditIcon /> : <SparklesIcon />}</div>
                     {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-cyber-bg border border-cyber-border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={suggestion}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className={`p-2 text-sm cursor-pointer text-cyber-text hover:bg-neon-pink hover:text-black ${index === activeSuggestionIndex ? 'bg-neon-pink text-black' : ''}`}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-semibold text-cyber-text-muted flex items-center gap-2">
                            <WandSparklesIcon /> {sourceImage ? 'Ideas Sugeridas por IA' : 'Ideas de Prompts'}
                        </h4>
                        {sourceImage && (
                            <button 
                                onClick={fetchSuggestions} 
                                disabled={suggestionsLoading} 
                                className="text-cyber-text-muted hover:text-neon-cyan transition-colors disabled:opacity-50 disabled:cursor-wait"
                                aria-label="Refrescar sugerencias"
                            >
                                <RefreshIcon className={`w-5 h-5 ${suggestionsLoading ? 'animate-spin' : ''}`} />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {suggestionsLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="bg-cyber-border h-6 w-32 rounded-md animate-pulse"></div>
                            ))
                        ) : (
                            promptSuggestions.map(idea => (
                                <button 
                                    key={idea}
                                    onClick={() => setPrompt(idea)}
                                    disabled={isLoading || !sourceImage}
                                    className="text-xs bg-cyber-border px-2 py-1 rounded-md text-cyber-text hover:bg-neon-pink hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {idea}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {!generatedImage && (
                  <div className="mt-6">
                      <h3 className="text-xl font-bold mb-4 tracking-wide">2. O Elige una Escena Rápida</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sceneOptions.map((scene) => {
                          const Icon = sceneIcons[scene.label];
                          return (
                            <button
                              key={scene.label}
                              onClick={() => handleSceneClick(scene.prompt)}
                              disabled={isLoading || !sourceImage}
                              className="flex flex-col items-center justify-center gap-2 text-center p-3 bg-cyber-border rounded-lg text-cyber-text-muted hover:text-neon-cyan hover:border-neon-cyan border-2 border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Icon className="w-6 h-6" />
                              <span className="text-xs font-semibold">{scene.label}</span>
                            </button>
                          );
                        })}
                      </div>
                  </div>
                )}
                  
                  <div className="mt-auto pt-6 flex flex-col gap-4">
                    <button
                      onClick={generatedImage ? handleRefine : handleGenerate}
                      disabled={isLoading || !sourceImage || !prompt.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-neon-pink text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-glow-pink-lg disabled:bg-cyber-border disabled:text-cyber-text-muted disabled:cursor-not-allowed disabled:shadow-none"
                    >
                      {generatedImage ? <><EditIcon className="w-5 h-5" /> Refinar</> : <><SparklesIcon className="w-5 h-5" /> Generar</>}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!generatedImage || isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-neon-cyan text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-glow-cyan-lg disabled:bg-cyber-border disabled:text-cyber-text-muted disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <DownloadIcon /> Descargar Imagen
                    </button>
                    <button
                        onClick={resetState}
                        disabled={!sourceImage}
                        className="w-full flex items-center justify-center gap-2 bg-cyber-border text-cyber-text-muted font-semibold py-3 px-4 rounded-lg hover:bg-red-500/20 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <XCircleIcon /> Empezar de Nuevo
                    </button>
                  </div>
              </div>
            </div>
        </div>
      </main>

      {isModalOpen && generatedImage && (
        <ImagePreviewModal imageUrl={generatedImage} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
    </>
  );
}
