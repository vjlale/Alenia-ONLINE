import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, Calendar, Clock, Tag, Linkedin, Twitter, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useRef } from 'react';
import SmartImage from '../components/common/SmartImage';
import ReadingProgress from '../components/common/ReadingProgress';
import ScrollReveal from '../components/common/ScrollReveal';
import { generateArticleSchema } from '../utils/structuredData';

// Componente para cargar los botones de compartir de forma diferida
function ShareButtons({ url, title, excerpt }) {
    const [ShareComponents, setShareComponents] = useState(null);

    useEffect(() => {
        import('react-share').then(components => {
            setShareComponents(components);
        });
    }, []);

    if (!ShareComponents) {
        return <div className="w-24 h-5 bg-slate-700 rounded animate-pulse"></div>; // Placeholder
    }

    const { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } = ShareComponents;

    return (
        <>
            <TwitterShareButton url={url} title={title}>
                <Twitter className="w-5 h-5 text-slate-500 hover:text-cyan-400 transition-colors" />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary={excerpt}>
                <Linkedin className="w-5 h-5 text-slate-500 hover:text-cyan-400 transition-colors" />
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={title}>
                <Share2 className="w-5 h-5 text-slate-500 hover:text-cyan-400 transition-colors" />
            </WhatsappShareButton>
        </>
    );
}

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);
    const postUrl = `https://alenia.online/blog/${slug}`;

    if (!post) {
        return <div className="text-center py-20 text-white">Post no encontrado.</div>;
    }

    const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

    return (
        <>
            <Helmet>
                <title>{`${post.title} | Blog de Alen.ia`}</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={postUrl} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image?.startsWith('http') ? post.image : `https://alenia.online${post.image}`} />
                <meta property="og:url" content={postUrl} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={post.title} />
                <meta property="twitter:description" content={post.excerpt} />
                <meta property="twitter:image" content={post.image?.startsWith('http') ? post.image : `https://alenia.online${post.image}`} />
                <script type="application/ld+json">
                  {JSON.stringify(generateArticleSchema(post))}
                </script>
            </Helmet>
            <ReadingProgress />
            <main className="min-h-screen bg-slate-900 py-20 relative">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link 
                            to="/blog" 
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 focus-ring"
                            aria-label="Volver a la lista de artículos del blog"
                        >
                            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                            Volver al Blog
                        </Link>
                    </motion.div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Share buttons flotantes */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-10"
                        >
                            <div className="glass-advanced rounded-2xl p-4 space-y-4 border border-alenia-primary/30">
                                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide block mb-2">Compartir</span>
                                <div className="flex flex-col gap-3">
                                    <motion.a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors focus-ring"
                                        aria-label="Compartir en Twitter"
                                    >
                                        <Twitter className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                                    </motion.a>
                                    <motion.a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors focus-ring"
                                        aria-label="Compartir en LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                                    </motion.a>
                                    <motion.button
                                        onClick={() => navigator.share?.({ title: post.title, url: postUrl })}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors focus-ring"
                                        aria-label="Compartir artículo"
                                    >
                                        <Share2 className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        <ScrollReveal direction="up" delay={0.2}>
                            <SmartImage 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-96 object-cover rounded-2xl mb-8 shadow-2xl shadow-cyan-500/20" 
                                width={1920}
                                height={1080}
                                priority={true}
                                imageSources={post.imageSources}
                            />
                            
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap">
                                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime} min de lectura</span>
                                    <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {post.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-400">Compartir:</span>
                                    <ShareButtons url={postUrl} title={post.title} excerpt={post.excerpt} />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" itemProp="headline">{post.title}</h1>
                            
                            <article className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-4" itemProp="articleBody">
                                <p className="lead text-xl text-slate-200" itemProp="description">{post.excerpt}</p>
                                {post.content ? (
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                ) : (
                                    <>
                                <p>Este es un espacio para el contenido completo del artículo. Por ahora, estamos usando el extracto como marcador de posición. Un contenido bien desarrollado aquí es crucial para el SEO y para aportar valor real a tus lectores.</p>
                                <p>{post.excerpt}</p>
                                    </>
                                )}
                            </article>
                        </ScrollReveal>

                        {/* Otros artículos con parallax */}
                        <ScrollReveal direction="up" delay={0.4}>
                            <div className="mt-20">
                                <h2 className="text-3xl font-bold text-white mb-8">
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                        Otros artículos que te pueden interesar
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {otherPosts.map((p, index) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                        >
                                            <Link to={`/blog/${p.slug}`} className="block glass-card-hover rounded-xl p-4 group card-hover-lift overflow-hidden">
                                                <SmartImage 
                                                    src={p.image} 
                                                    alt={p.title} 
                                                    className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-110 transition-transform duration-500"
                                                    width={640}
                                                    height={360}
                                                    imageSources={p.imageSources}
                                                />
                                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </main>
        </>
    );
}