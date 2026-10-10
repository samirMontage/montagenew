import { motion } from "framer-motion";
import { hero, site } from "../content.js";
import ChessPiece from "./ChessPiece.jsx";
import Parallax from "./Parallax.jsx";
import { TelegramIcon } from "./Logo.jsx";
import useMedia from "../hooks/useMedia.js";

const fade = (delay) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const CHIP_POS = [
  { top: "12%", left: "-6%", depth: 34, dur: 6.5, rot: -4 },
  { top: "44%", right: "-10%", depth: 46, dur: 7.5, rot: 3, delay: 1.2 },
  { bottom: "12%", left: "2%", depth: 28, dur: 6, rot: 2, delay: 0.6 },
];

export default function Hero() {
  const desktop = useMedia("(min-width: 1024px)");
  return (
    <section
      id="top"
      className="section relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24"
    >
      {/* ферзь на мобильных – за текстом, мягко размыт (размытие запечено в картинку);
          рендерим только нужную версию, чтобы телефон не качал лишнее */}
      {!desktop && (
        <ChessPiece
          piece="queen-soft"
          height={440}
          className="right-[-18%] top-[6%]"
          depth={10}
          scroll={40}
          opacity={0.42}
          shadow={false}
          priority
        />
      )}

      <div className="wrap grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-10">
        <div className="relative z-10">
          <motion.span
            className={`label ${site.available ? "live" : ""}`}
            {...fade(0)}
          >
            {hero.badge}
          </motion.span>

          <motion.h1 className="display mt-6" {...fade(0.08)}>
            {hero.title}
            <br />
            <em>{hero.titleAccent}</em>
          </motion.h1>

          <motion.p className="lead mt-7 max-w-[560px]" {...fade(0.16)}>
            {hero.subtitle}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap gap-3" {...fade(0.24)}>
            <a href={hero.primary.href} className="btn btn-dark">
              {hero.primary.label}
              <span aria-hidden>↓</span>
            </a>
            <a
              href={hero.secondary.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-glass"
            >
              <TelegramIcon className="w-4 h-4 text-accent" />
              {hero.secondary.label}
            </a>
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6"
            {...fade(0.32)}
          >
            {hero.stats.map((s) => (
              <li key={s.label} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* правая часть (только десктоп): ферзь + плавающие стеклянные плашки */}
        {desktop && (
          <motion.div
            className="relative h-[600px] lg:-mr-6"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-glow" />
            <ChessPiece
              piece="queen"
              height={580}
              className="left-1/2 top-1/2"
              style={{ marginLeft: -128, marginTop: -300 }}
              depth={22}
              scroll={70}
              duration={7.5}
              priority
            />
            {hero.chips.map((c, i) => {
              const p = CHIP_POS[i] || CHIP_POS[0];
              const { depth, dur, rot, delay = 0, ...pos } = p;
              return (
                <Parallax
                  key={c.text}
                  depth={depth}
                  scroll={20 + i * 12}
                  className="hero-chip glass"
                  style={{ ...pos, zIndex: 2 }}
                >
                  <div
                    className="float-chip"
                    style={{
                      "--dur": `${dur}s`,
                      "--delay": `${delay}s`,
                      "--rot": `${rot}deg`,
                    }}
                  >
                    <b>{c.text}</b>
                    <br />
                    <span>{c.sub}</span>
                  </div>
                </Parallax>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
