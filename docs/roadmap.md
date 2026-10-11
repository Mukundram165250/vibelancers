# Vibelancers roadmap

Vibelancers is a Sri Lankan talent and services marketplace. The first milestone is a small, responsive web experience that can grow into a web app and Flutter mobile app.

## Current milestone — web discovery foundation

- [x] Responsive static homepage and service discovery UI
- [x] Search by keyword and category
- [x] Clearly labelled fictional sample listings for preview
- [x] Supabase browser configuration example (no secrets)
- [x] RPC adapter for `search_service_listings`
- [ ] Confirm live RPC response fields against the current Supabase project
- [ ] Run the browser checklist on desktop and mobile
- [ ] Add automated tests and a deployment workflow

## Product phases

### Phase 1 — discover
Build the public landing page, search, categories, service cards, and a stable no-data state. Demo content must always be identified as sample content.

### Phase 2 — profiles and skills
Support one account with both customer and freelancer capabilities. Keep roles in `profile_roles`; support approved skill tags and profile details. Add account, privacy, and row-level security checks before exposing personal data.

### Phase 3 — service requests and offers
Let customers describe a job or request a service. Freelancers can send offers with scope, pricing mode, schedule, and expiry. Availability is an explicit freelancer-controlled state; stale availability should be treated as unavailable. Booking time and work-completion deadline are separate fields.

### Phase 4 — contracts, messages, and trust
Add participant-only messaging, notifications, accepted offers/contracts, completion and revision flow, reviews after completed work, reports, verification, appeals, and audited admin decisions.

### Phase 5 — payments (not integrated)
No real payments or payouts are implemented in this repository. The proposed business model is a customer payment for the agreed amount, a target freelancer payout of 95%, and a 5% Vibelancers platform fee, with payment-processing fees borne by the platform. Do not launch money movement until a provider is selected, legal and provider requirements are checked, sandbox flows are tested, webhook signatures are verified, and payout/reversal/dispute paths are secured. Payout should require customer approval or an authorized admin completion decision. Never claim funds are protected or escrowed unless the selected provider and legal structure genuinely support that claim.

## AI and longer-term ideas

- Job-to-freelancer matching
- Scam and trust signals with human review and an appeal path
- Portfolio and CV drafting assistant
- Skill verification challenges
- Communication assistant and contract-drafting support
- First-gig mode for new freelancers
- Portable reputation passport and growth dashboard
- Interview coach and project showcases
- Freelancer teams and community challenges

AI outputs should assist users, not silently make high-impact account or payment decisions. Explain important decisions and offer a route to appeal.

## Technical guardrails

- Never expose a Supabase `service_role` key in browser or mobile client code.
- Keep the actual browser configuration file ignored by Git; only the public project URL and publishable/anon key belong there.
- Enable and verify RLS on every exposed table; test with anonymous, customer, freelancer, and admin identities.
- Keep demo listings in the frontend only. Do not insert fictional profiles or services into the production database.
- Validate all user-provided text and pricing on the server; do not trust the UI to enforce authorization.
- Document setup, tests, schema/RPC contracts, and known limitations.
