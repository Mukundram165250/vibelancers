# Vibelancers

**Good work starts with the right vibe.**

Vibelancers is a Sri Lankan talent and services marketplace concept: discover independent talent, find local or online services, and turn project ideas into collaborations.

## Current status

This repository starts with a responsive static homepage and service-discovery prototype. It is a foundation, not a production marketplace.

- Responsive landing page with a green, editorial visual identity
- Search by keyword and category
- Fictional sample listings, visibly labelled as demo content
- Optional Supabase RPC adapter for `search_service_listings`
- Product roadmap and manual browser checklist

**Important:** sample listings are fictional. The prototype does not support sign-in, real bookings, messaging, contracts, or payments yet.

## Run locally

The website uses plain HTML, CSS, and JavaScript. From the repository folder, start any static file server and open `index.html`. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

You can also open `index.html` directly, although a local server is a better test of real deployment behaviour.

## Optional Supabase connection

1. Copy `js/supabase/supabase-config.example.js` to `js/supabase/supabase-config.js`.
2. Add your Supabase project URL and **publishable/anon key only**.
3. Ensure the Supabase JS client library is loaded before `service-discovery.js` when wiring up the live integration.
4. Verify the `search_service_listings` RPC parameters and returned fields against your current database schema.

The real config file is ignored by Git. **Never put a Supabase `service_role` key in frontend code.** If configuration is absent or the RPC fails, the UI falls back to clearly labelled demo examples.

## Project map

- `index.html` — page structure
- `css/styles.css` — responsive visual system
- `js/app.js` — UI and search interactions
- `js/supabase/service-discovery.js` — demo/live data adapter
- `js/supabase/supabase-config.example.js` — safe configuration template
- `docs/roadmap.md` — phases, product decisions, and safety gates
- `tests/browser-checklist.md` — manual verification steps

## Next steps

1. Verify the static site at mobile and desktop sizes.
2. Confirm the Supabase search RPC contract and test RLS.
3. Add authentication and dual customer/freelancer profiles.
4. Build service requests, offers, contracts, messaging, and trust tools.
5. Integrate payments only after choosing a supported provider and testing secure payment, refund, dispute, and payout flows.

See [the roadmap](docs/roadmap.md) for more detail.

## Principles

- Built for Sri Lankan talent; prices are currently scoped to LKR.
- Keep sample content clearly distinct from real listings.
- Secure the database with row-level security and server-side validation.
- AI should assist people, not silently make consequential account or payment decisions.
