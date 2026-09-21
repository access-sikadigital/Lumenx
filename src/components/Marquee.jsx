import { BRANDS } from "@/lib/site";

export default function Marquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="border-b border-blue/10 bg-white py-[clamp(2rem,3.5vw,3.5rem)]">
      <div className="shell mb-7">
        <div className="flex items-center gap-5">
          <span className="eyebrow shrink-0 text-ink-soft">Tier-1 hardware we install</span>
          <span className="h-px flex-1 bg-blue/10" />
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_42s_linear_infinite] items-center gap-[clamp(2.5rem,4vw,5rem)] pr-[clamp(2.5rem,4vw,5rem)]">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="numeral whitespace-nowrap text-[clamp(1.5rem,2.4vw,3rem)] text-blue/22 transition-colors hover:text-blue/50"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
