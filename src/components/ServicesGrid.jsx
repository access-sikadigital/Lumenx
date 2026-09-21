import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/site";

/**
 * Services as a readable grid.
 *
 * Replaces a pinned horizontal carousel: that version sliced cards at both
 * viewport edges (reading as broken rather than deliberate) and hid every
 * description behind hover, so the one thing a visitor needs (what Lumenx
 * actually does) was invisible. Light background also breaks up the run of
 * navy sections above and below.
 */

const ACCENT = {
  yellow: "bg-yellow",
  ember: "bg-ember",
  blue: "bg-blue",
  green: "bg-green",
};

export default function ServicesGrid() {
  return (
    <section
      id="services"
      className="bg-white"
      style={{ paddingTop: "clamp(4.5rem, 11vh, 9rem)", paddingBottom: "clamp(4.5rem, 11vh, 9rem)" }}
    >
      <div className="shell">
        {/* header */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5 text-ember">What we do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h2 max-w-[15ch] text-blue">
              Everything you need to <span className="text-solar">run on the sun.</span>
            </h2>
          </Reveal>
        </div>

        {/* grid */}
        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-[clamp(1.25rem,1.8vw,2rem)] sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.07}>
              <Link
                href={s.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-blue/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue/20 hover:shadow-[0_28px_60px_-32px_rgba(11,20,59,0.45)]"
              >
                {/* media */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/55 to-transparent" />
                  <span className="numeral absolute right-5 top-4 text-[clamp(2rem,2.4vw,2.8rem)] leading-none text-white/35">
                    {s.n}
                  </span>
                  <span className="absolute bottom-4 left-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue/75 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                    <img src={s.icon} alt="" className="h-6 w-6 [filter:brightness(0)_invert(1)]" />
                  </span>
                </div>

                {/* body: description always visible */}
                <div className="flex flex-1 flex-col p-[clamp(1.5rem,1.7vw,2rem)]">
                  <h3 className="t-h3 text-blue">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">{s.line}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember">
                    Explore
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {/* accent line on hover */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full ${ACCENT[s.tone] || "bg-ember"}`}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
