# Browser verification checklist

Run this checklist after opening `index.html` through a local static server or deployed preview.

## User interface

- [ ] Layout works at 320px, 375px, 768px, 1024px, and wide desktop widths.
- [ ] Header links scroll to the matching sections.
- [ ] Search by a title word returns matching sample cards.
- [ ] Search by a category or location word filters sample cards.
- [ ] Category selection filters results; changing it updates the count.
- [ ] A query with no matches shows the empty state.
- [ ] “Clear filters” resets both keyword and category.
- [ ] Every fictional card is visibly marked SAMPLE and the page disclaimer is present.
- [ ] Inputs have accessible labels and the search can be submitted by keyboard.
- [ ] Reduced-motion preference is respected.

## Browser health

- [ ] No uncaught JavaScript errors in the console.
- [ ] Check layout and network failures with external fonts blocked.
- [ ] Confirm there are no API secrets in committed files or built assets.

## Supabase integration (only after adding local ignored config)

- [ ] Set the project URL and publishable/anon key in `js/supabase/supabase-config.js`.
- [ ] Confirm the browser client uses only the public key, never `service_role`.
- [ ] Verify `search_service_listings` accepts `p_query`, `p_category`, `p_limit`, and `p_offset`.
- [ ] Confirm returned field names match the adapter: title, category, description, price_min (or price), price_type, location_label (or location), is_online.
- [ ] Test as anonymous and authenticated users with the database's RLS policies.
- [ ] Confirm an RPC failure falls back to visibly labelled demo content and never presents it as real provider data.
- [ ] Confirm no sample listing was inserted into the database.
