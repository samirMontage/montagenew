export function PawnIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="pawn-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pawn-g)"
        d="M32 6a8 8 0 0 0-4.7 14.5 11 11 0 0 0-3.8 10.7h1.1c-.8 4.6-3.3 8.6-7.2 11.5V46h29.2v-3.3c-3.9-2.9-6.4-6.9-7.2-11.5h1.1a11 11 0 0 0-3.8-10.7A8 8 0 0 0 32 6zM15 48.5h34V54H15z"
      />
    </svg>
  )
}

export function TelegramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21.9 4.6 18.8 19.3c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-7.9c.4-.3-.1-.5-.6-.2L6.6 13.2 1.9 11.7c-1-.3-1-1 .2-1.5L20.5 3.1c.9-.3 1.6.2 1.4 1.5z" />
    </svg>
  )
}

export function PlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.5-6.5a1 1 0 0 0 0-1.8L9.5 4.6A1 1 0 0 0 8 5.5z" />
    </svg>
  )
}
