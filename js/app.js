(function () {
  "use strict";
  const grid = document.getElementById("service-grid");
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const category = document.getElementById("category-filter");
  const count = document.getElementById("results-count");
  if (!grid || !form || !input || !category || !count || !window.VibelancersDiscovery) return;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function formatPrice(value) {
    return "LKR " + new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(Number(value) || 0);
  }
  function render(listings, source) {
    count.textContent = listings.length + (listings.length === 1 ? " service" : " services") + (source === "demo" ? " in this sample" : " found");
    document.querySelector(".demo-note").innerHTML = source === "demo" ? '<span class="demo-dot"></span> Demo preview' : '<span class="online-dot"></span> Live listings';
    if (!listings.length) {
      grid.innerHTML = '<div class="empty-state"><h3>No services found just yet.</h3><p>Try another keyword or clear the category filter.</p><button class="button button-dark" type="button" id="clear-filters">Clear filters <span>↺</span></button></div>';
      document.getElementById("clear-filters").addEventListener("click", () => { input.value = ""; category.value = "all"; search(); });
      return;
    }
    grid.innerHTML = listings.map(item => {
      const demo = item.is_demo || source === "demo";
      const priceType = String(item.price_type).toLowerCase() === "hourly" ? "/ hour" : "starting";
      return '<article class="service-card"><div class="service-card-top"><span class="category-pill">' + escapeHtml(item.category) + '</span>' + (demo ? '<span class="sample-pill">SAMPLE</span>' : "") + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p><div class="service-card-bottom"><span class="service-location">' + escapeHtml(item.location_label) + '</span><span class="service-price">' + formatPrice(item.price_min) + '<br><small>' + priceType + '</small></span></div></article>';
    }).join("");
  }
  async function search() {
    grid.innerHTML = '<div class="loading-card">Finding good vibes…</div>';
    try {
      const result = await window.VibelancersDiscovery.searchServices({ query: input.value, category: category.value });
      render(result.listings, result.source);
    } catch (error) {
      console.error("Vibelancers discovery error:", error);
      grid.innerHTML = '<div class="empty-state"><h3>That didn’t work.</h3><p>Please refresh the page and try again.</p></div>';
      count.textContent = "Services unavailable";
    }
  }
  form.addEventListener("submit", event => { event.preventDefault(); search(); });
  category.addEventListener("change", search);
  let debounce;
  input.addEventListener("input", () => { window.clearTimeout(debounce); debounce = window.setTimeout(search, 180); });
  search();
})();
