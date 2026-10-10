import { works, reels } from '../content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import VideoCard from './VideoCard.jsx'

export default function Works({ onOpen }) {
  return (
    <section id="works" className="section">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHead label={works.label} title={works.title} accent={works.titleAccent} />
          <Reveal delay={0.1}>
            <p className="muted text-sm font-semibold">{works.hint}</p>
          </Reveal>
        </div>

        <div className="reels-grid mt-10">
          {reels.map((item, i) => (
            <VideoCard key={item.src} item={item} index={i} onOpen={() => onOpen(reels, i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
