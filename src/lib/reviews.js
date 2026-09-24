// Reviews page content.
//
// ⚠ THE TESTIMONIALS THEMSELVES ARE STILL PLACEHOLDERS.
// `REVIEWS` in site.js is a set of written-for-layout quotes with invented
// names. They must be replaced with real, verifiable Google reviews before
// this page goes live — a fabricated testimonial is a false representation
// under Australian Consumer Law, and it is exactly the kind of claim the CEC
// and NETCC codes Lumenx has signed are written to catch.
//
// The page is built so that swapping the data is the only step needed:
// replace the REVIEWS array, fill in GOOGLE_REVIEWS, and it is ready.
//
// Note: your current live site's testimonials are also worth auditing. Three
// of the six ("Emily R.", "David M.", "Sophia L.") follow a template pattern,
// and the review avatars are hot-linked from another company's website.

export const REVIEWS_PAGE = {
  seoTitle: "Lumenx Reviews | What Our Customers Say",
  seoDescription:
    "Read what Victorian and NSW households say about their Lumenx solar, battery and hot water installations.",
  eyebrow: "Reviews",
  h1: "The part of a solar quote you cannot put in writing.",
  lead: "Anyone can promise a tidy install and a call back. These are the people who can tell you whether we did it.",
  hero: {
    // TODO: swap to /images/page-reviews.webp when that image is sourced.
    image: "/images/svc-residential.webp",
    alt: "A family looking up at the solar panels on their roof",
  },
  chips: ["Verified Google reviews", "Victoria & New South Wales", "16-year workmanship warranty"],

  intro: {
    heading: "Why we do not curate this page",
    body: [
      "Most solar companies show you five reviews and hide the rest. We would rather point you at the source, because a rating you can click through and verify is worth more than a wall of quotes you have to take on trust.",
      "If something has gone wrong on a job, we would rather you read about how we handled it than never hear about it at all. That is the actual signal in a review page, and it is the reason we link straight to the profile rather than asking you to believe a screenshot.",
    ],
    points: [
      "Every review links back to its source profile",
      "Nothing is filtered by star rating",
      "We respond to criticism publicly, not by asking for the review to be removed",
      "New reviews are requested after switch-on, never in exchange for anything",
    ],
    image: "/images/real-install-3.webp",
    imageAlt: "Solar panels installed by Lumenx on a rooftop at dusk",
  },

  faqs: [
    {
      q: "Are these reviews verified?",
      a: "They come from our Google Business Profile, which you can open and read in full. Google verifies that a reviewer has an account; we cannot edit, reorder or delete what people write there, which is exactly why it is the source we point you at.",
    },
    {
      q: "Do you offer anything in exchange for a review?",
      a: "No. Incentivised reviews breach Google's policies and mislead the next customer. We ask once, after your system is switched on and you have seen it working, and that is the end of it.",
    },
    {
      q: "What happens if something goes wrong?",
      a: "Call us. Most issues are resolved quickly, and the 16-year workmanship warranty covers the installation itself. If you are not satisfied with how we handle it, the NETCC code we are signed to includes a formal complaints process you can escalate through.",
    },
    {
      q: "Can I speak to a past customer?",
      a: "Ask and we will arrange it, with their permission. For commercial jobs in particular we would rather you spoke to someone with a comparable system than read a one-line quote.",
    },
  ],
};
