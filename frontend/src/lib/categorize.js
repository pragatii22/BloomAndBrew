// Products don't have a category column in the DB — derive a presentation
// category from the name/description so listing/filtering still works.
export const CATEGORIES = ["Bouquets", "Roses", "Tulips", "Lavender", "Lilies", "Birthday", "Anniversary", "Wedding"];

export const getCategory = (product = {}) => {
  const n = `${product.name || ""} ${product.description || ""}`.toLowerCase();
  if (n.includes("wedding")) return "Wedding";
  if (n.includes("anniversary")) return "Anniversary";
  if (n.includes("birthday")) return "Birthday";
  if (n.includes("rose")) return "Roses";
  if (n.includes("tulip")) return "Tulips";
  if (n.includes("lavender")) return "Lavender";
  if (n.includes("lily") || n.includes("lili")) return "Lilies";
  return "Bouquets";
};

// Deterministic star rating derived from product id — no rating column exists.
export const getRating = (id = 0) => {
  const ratings = [4.5, 4.7, 4.8, 4.9, 5.0, 4.6];
  return ratings[Number(id) % ratings.length];
};
