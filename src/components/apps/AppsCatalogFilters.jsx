import { useMemo } from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';

const sortOptions = [
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
  { value: 'tipo', label: 'Tipo (Cliente/Producto)' }
];

export default function AppsCatalogFilters({
  searchTerm,
  onSearchChange,
  selectedTipos,
  onToggleTipo,
  selectedPlataformas,
  onTogglePlataforma,
  selectedTecnologias,
  onToggleTecnologia,
  availableTipos,
  availablePlataformas,
  availableTecnologias,
  sortBy,
  onSortChange,
  onReset
}) {
  const tecnologiasOrdenadas = useMemo(
    () => [...availableTecnologias].sort((a, b) => a.localeCompare(b, 'es')),
    [availableTecnologias]
  );

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-md shadow-lg shadow-black/20">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Filter className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-widest">Filtros inteligentes</span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Limpiar filtros
          </button>
        </div>

        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-5 w-5 text-white/40" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre, descripción o tecnología..."
            className="w-full rounded-2xl border border-white/10 bg-black/40 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:border-alenia-primary/60 focus:outline-none focus:ring-2 focus:ring-alenia-primary/40"
          />
        </div>
      </header>

      <div className="flex flex-col gap-6">
        <FilterGroup
          title="Tipo de desarrollo"
          options={availableTipos}
          selected={selectedTipos}
          onToggle={onToggleTipo}
          dataAttribute="tipo"
        />

        <FilterGroup
          title="Plataformas"
          options={availablePlataformas}
          selected={selectedPlataformas}
          onToggle={onTogglePlataforma}
          dataAttribute="plataforma"
        />

        <FilterGroup
          title="Tecnologías destacadas"
          options={tecnologiasOrdenadas}
          selected={selectedTecnologias}
          onToggle={onToggleTecnologia}
          dataAttribute="tecnologia"
          maxVisible={12}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
        <ArrowUpDown className="h-5 w-5 text-white/50" />
        <span className="text-sm text-white/70">Ordenar catálogo por:</span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSortChange(option.value)}
              className={`rounded-full px-3 py-1 text-sm transition-all ${
                sortBy === option.value
                  ? 'bg-alenia-primary/20 text-alenia-primary border border-alenia-primary/40'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, options, selected, onToggle, dataAttribute, maxVisible }) {
  const visibleOptions = typeof maxVisible === 'number' ? options.slice(0, maxVisible) : options;
  const hasExtra = typeof maxVisible === 'number' && options.length > maxVisible;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {visibleOptions.map((option) => {
          const isActive = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              data-filter={dataAttribute}
              onClick={() => onToggle(option)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-alenia-primary/20 text-alenia-primary border border-alenia-primary/40 shadow-[0_0_14px_rgba(0,255,136,0.25)]'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
              }`}
            >
              {option}
            </button>
          );
        })}

        {hasExtra && (
          <span className="rounded-full border border-dashed border-white/15 px-3 py-1 text-xs text-white/40">
            +{options.length - visibleOptions.length} más
          </span>
        )}
      </div>
    </div>
  );
}

