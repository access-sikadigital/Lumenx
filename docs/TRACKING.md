# Conversion tracking

## What is in place

The site pushes conversion events to `window.dataLayer`. Nothing is attached
to that layer yet, so right now the events are produced and nobody is
listening. That is deliberate — see the warning below before attaching a tag.

Events fired, from `src/lib/track.js`:

| Event | When | Useful properties |
|---|---|---|
| `quote_start` | First service tile selected on the quote form | `service`, `state` |
| `quote_submit` | Server accepted the enquiry | `services`, `property`, `state`, `wantsFinance`, `helpMeChoose`, `hasAttachment` |
| `quote_error` | Submission rejected | `reason` |
| `service_cta_click` | Quote button on a service page | `service`, `state` |
| `finance_click` | "How 0% finance works" | `from`, `service`, `state` |
| `phone_click` | Any `tel:` or `mailto:` link, site-wide | `context` |
| `state_change` | VIC/NSW selector used | `to` |
| `package_choose` | A package card chosen | `tier`, `tab` |

`quote_start` fires on the first real interaction, not on page view. A view is
not a start, and counting it as one inflates every rate downstream.

Phone and email clicks are caught by one delegated listener
(`components/TrackingBridge.jsx`) rather than an `onClick` on each of the
dozen-odd places the number appears. The one somebody forgets to wire up is
always the one that silently stops counting.

## What is deliberately NOT in place

No GA4, no GTM container, no Meta pixel, no Google Ads tag.

**Attaching one is not just a technical change.** The privacy policy
(`src/lib/legal.js`) currently states:

> This website does not set advertising or analytics cookies, and it does not
> run third-party tracking pixels. There is no cookie banner because there is
> nothing to consent to.

The moment a tag goes on, that paragraph is false. So a tracking release has
to ship three things together:

1. The tag itself.
2. The rewritten privacy policy section.
3. A consent banner, with analytics and advertising tags held until consent is
   given.

Doing 1 without 2 and 3 publishes a false privacy statement, which is a worse
problem than having no analytics.

## How to attach GTM when that decision is made

1. Get the container ID from Lumenx.
2. Add the GTM snippet in `src/app/layout.jsx`, gated on consent.
3. In GTM, create a Custom Event trigger per event name above.
4. Map `quote_submit` to the Google Ads and Meta conversion actions.
5. Update the privacy policy and add the banner **in the same release**.

No component needs to change. That is the point of the data layer.

## Privacy rule

`track.js` scrubs every event before it is pushed. Name, email, phone,
address, ABN, notes and attachments are dropped by name, and any object-shaped
value is dropped wholesale. Events carry what was clicked and which service or
state it concerned, never who clicked it.

Do not "temporarily" push an email address to make attribution easier. That is
how a tracking setup becomes a privacy incident.
