(function () {
  "use strict";
  const demoListings = [
    { id: "demo-1", title: "Brand identity starter pack", category: "Design", description: "A thoughtful logo concept and a small visual kit for your next idea.", price_min: 8500, price_type: "fixed", location_label: "Jaffna · Online", is_online: true },
    { id: "demo-2", title: "Simple website setup", category: "Technology", description: "A clean, mobile-friendly landing page for a club, small business, or portfolio.", price_min: 18000, price_type: "fixed", location_label: "Sri Lanka · Online", is_online: true },
    { id: "demo-3", title: "Maths study session", category: "Learning", description: "A focused one-to-one revision session with time for questions and practice.", price_min: 1500, price_type: "hourly", location_label: "Jaffna · Online or in person", is_online: true },
    { id: "demo-4", title: "Tamil and English proofreading", category: "Writing", description: "Help polish a short document, caption, school project, or presentation.", price_min: 2500, price_type: "fixed", location_label: "Sri Lanka · Online", is_online: true },
    { id: "demo-5", title: "Event photo highlights", category: "Local services", description: "A compact photo session for a club event, small celebration, or community project.", price_min: 6000, price_type: "fixed", location_label: "Jaffna · Local", is_online: false },
    { id: "demo-6", title: "Social media content kit", category: "Design", description: "A coordinated set of post templates to give your page a consistent look.", price_min: 5000, price_type: "fixed", location_label: "Sri Lanka · Online", is_online: true }
  ];

  function getClient() {
    const config = window.VIBELANCERS_SUPABASE_CONFIG;
    if (!config || !config.url || !config.publishableKey || !window.supabase || typeof window.supabase.createClient !== "function") return null;
    try { return window.supabase.createClient(config.url, config.publishableKey); }
    catch (error) { console.warn("Vibelancers: Supabase client could not be initialized.", error); return null; }
  }

  function normalize(row) {
    return {
      id: String(row.id ?? ""),
      title: String(row.title ?? row.name ?? "Service"),
      category: String(row.category ?? "Other"),
      description: String(row.description ?? ""),
      price_min: Number(row.price_min ?? row.price ?? 0),
      price_type: String(row.price_type ?? row.pricing_type ?? "fixed"),
      location_label: String(row.location_label ?? row.location ?? "Sri Lanka"),
      is_online: Boolean(row.is_online),
      is_demo: false
    };
  }

  async function searchServices(options) {
    const query = String(options && options.query || "").trim();
    const category = String(options && options.category || "all");
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.rpc("search_service_listings", {
          p_query: query || null,
          p_category: category === "all" ? null : category,
          p_limit: 24,
          p_offset: 0
        });
        if (error) throw error;
        return { listings: (data || []).map(normalize), source: "supabase" };
      } catch (error) {
        console.warn("Vibelancers: live service search failed; showing demo examples instead.", error);
      }
    }
    const needle = query.toLowerCase();
    const listings = demoListings.filter(item => {
      const matchesQuery = !needle || [item.title, item.category, item.description, item.location_label].join(" ").toLowerCase().includes(needle);
      return matchesQuery && (category === "all" || item.category === category);
    }).map(item => ({ ...item, is_demo: true }));
    return { listings, source: "demo" };
  }

  window.VibelancersDiscovery = { searchServices };
})();
