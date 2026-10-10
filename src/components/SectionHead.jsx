import Reveal from './Reveal.jsx'

export default function SectionHead({ label, title, accent, center = false, live = false, breakLine = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} ${className}`}>
      <Reveal>
        <span className={`label ${live ? 'live' : ''}`}>{label}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="h2 mt-4">
          {title}
          {breakLine ? <br /> : ' '}
          <em>{accent}</em>
        </h2>
      </Reveal>
    </div>
  )
}
