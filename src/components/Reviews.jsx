import GoogleRating from "@/components/GoogleRating";
import { REVIEWS } from "@/lib/site";

function Stars() {
  return (
    <div className="flex gap-0.5 text-yellow" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ r }) {
  return (
    <figure className="flex h-full w-[clamp(255px,26vw,420px)] shrink-0 flex-col justify-between rounded-[20px] border border-blue/10 bg-white p-[clamp(1.35rem,1.8vw,2.25rem)]">
      <Stars />
      <blockquote className="mt-5 text-[clamp(0.98rem,0.95vw,1.15rem)] leading-relaxed text-blue/90">
        “{r.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-blue/10 pt-5">
        <p className="font-semibold text-blue">{r.name}</p>
        <p className="text-sm text-ink-soft">{r.place}</p>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  // Single row. Duplicated once so the marquee loops seamlessly at -50%.
  const row = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="overflow-hidden bg-cloud py-[clamp(5rem,12vh,10rem)]">
      <div className="shell mb-[clamp(2.5rem,5vw,4.5rem)] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow mb-5 text-ember">Proof</p>
          <h2 className="t-h1 max-w-[15ch] text-blue">Loved by Australian homes and businesses.</h2>
        </div>
        <GoogleRating variant="light" />
      </div>

      <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-5 animate-[marquee_56s_linear_infinite]">
          {row.map((r, i) => <Card key={i} r={r} />)}
        </div>
      </div>
    </section>
  );
}
