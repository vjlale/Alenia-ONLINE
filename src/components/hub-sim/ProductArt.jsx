// Dibujos simples de los productos (SVG), usados en la tienda y en la expendedora.
// Cada uno ocupa una caja de 40 x 50 con origen arriba a la izquierda.

export function ProductShape({ id }) {
  switch (id) {
    case 'agua':
      return (
        <g>
          <rect x="16" y="2" width="8" height="5" rx="1.5" fill="#e0f2fe" />
          <path d="M15 7 h10 l3 7 v32 a3 3 0 0 1 -3 3 h-10 a3 3 0 0 1 -3 -3 v-32 z" fill="#7dd3fc" fillOpacity="0.85" />
          <rect x="12" y="22" width="16" height="11" fill="#0284c7" />
          <rect x="15" y="10" width="3" height="34" rx="1.5" fill="#ffffff" fillOpacity="0.45" />
        </g>
      )
    case 'gaseosa':
      return (
        <g>
          <rect x="9" y="8" width="22" height="40" rx="4" fill="#dc2626" />
          <ellipse cx="20" cy="8.5" rx="11" ry="3" fill="#e5e7eb" />
          <rect x="9" y="20" width="22" height="9" fill="#fef2f2" fillOpacity="0.9" />
          <path d="M12 24.5 q8 -5 16 0" stroke="#dc2626" strokeWidth="2" fill="none" />
          <rect x="12" y="11" width="3" height="34" rx="1.5" fill="#ffffff" fillOpacity="0.3" />
        </g>
      )
    case 'cafe':
      return (
        <g>
          <rect x="9" y="6" width="22" height="5" rx="2" fill="#e7e5e4" />
          <path d="M10 11 h20 l-2.5 36 a2 2 0 0 1 -2 2 h-11 a2 2 0 0 1 -2 -2 z" fill="#78350f" />
          <rect x="11" y="22" width="18" height="10" fill="#fde68a" />
          <circle cx="20" cy="27" r="3" fill="#92400e" />
        </g>
      )
    case 'snack':
      return (
        <g>
          <path
            d="M6 6 l3.5 -3 l3.5 3 l3.5 -3 l3.5 3 l3.5 -3 l3.5 3 l3.5 -3 l3.5 3 v38 l-3.5 3 l-3.5 -3 l-3.5 3 l-3.5 -3 l-3.5 3 l-3.5 -3 l-3.5 3 l-3.5 -3 z"
            fill="#f59e0b"
          />
          <ellipse cx="20" cy="26" rx="9" ry="7" fill="#fef3c7" />
          <ellipse cx="18" cy="25" rx="4" ry="3" fill="#fbbf24" />
          <rect x="9" y="10" width="22" height="5" rx="2" fill="#b45309" />
        </g>
      )
    default:
      return null
  }
}

export function ProductIcon({ id, className = 'w-10 h-12' }) {
  return (
    <svg viewBox="0 0 40 50" className={className} aria-hidden>
      <ProductShape id={id} />
    </svg>
  )
}
