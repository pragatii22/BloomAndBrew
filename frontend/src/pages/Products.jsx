import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/store/ProductCard";
import ProductFilters from "../components/store/ProductFilters";
import Loader from "../components/ui/Loader";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { getProducts } from "../service/api";
import { getCategory } from "../lib/categorize";

const DEFAULT_PRICE_LIMIT = 10000;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("default");
  const [priceLimit, setPriceLimit] = useState(DEFAULT_PRICE_LIMIT);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // The URL search param is the single source of truth for the query —
  // no local state to keep in sync with it.
  const query = searchParams.get("search") || "";

  useEffect(() => {
    getProducts()
      .then((r) => setProducts(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const maxPrice = useMemo(
    () => Math.max(DEFAULT_PRICE_LIMIT, ...products.map((p) => Number(p.price) || 0)),
    [products]
  );

  const filtered = useMemo(() => {
    let list = products;

    if (active !== "All") list = list.filter((p) => getCategory(p) === active);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          getCategory(p).toLowerCase().includes(q)
      );
    }

    list = list.filter((p) => Number(p.price) <= priceLimit);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, active, query, sort, priceLimit]);

  const clearFilters = () => {
    setActive("All");
    setSort("default");
    setPriceLimit(maxPrice);
    setSearchParams({});
  };

  const hasFilters = active !== "All" || query || sort !== "default" || priceLimit < maxPrice;

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <ProductFilters
            active={active}
            onCategoryChange={setActive}
            maxPrice={maxPrice}
            priceLimit={priceLimit}
            onPriceChange={setPriceLimit}
          />
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-navy/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-heading">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X size={18} /></button>
              </div>
              <ProductFilters
                active={active}
                onCategoryChange={(c) => { setActive(c); setFiltersOpen(false); }}
                maxPrice={maxPrice}
                priceLimit={priceLimit}
                onPriceChange={setPriceLimit}
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-heading">All Bouquets</h1>
          </div>
          <p className="text-sm text-muted mb-5">
            {loading ? "Loading…" : `${filtered.length} arrangement${filtered.length !== 1 ? "s" : ""} available`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search roses, bouquets, occasions…"
                value={query}
                onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})}
                className="w-full pl-10 pr-4 py-2.5 rounded-md border border-border bg-white text-sm text-heading outline-none focus:border-primary-dark focus:ring-2 focus:ring-primary/30 transition-colors"
              />
            </div>

            <Select value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-52">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
            </Select>

            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 justify-center px-4 py-2.5 rounded-md border border-border text-sm font-semibold text-body"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                <X size={13} /> Clear
              </Button>
            )}
          </div>

          {loading ? (
            <Loader text="Loading flowers…" />
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 space-y-2">
              <h2 className="text-lg font-bold text-heading">No flowers found</h2>
              <p className="text-muted text-sm">Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="mt-2 text-primary-dark font-semibold text-sm hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
