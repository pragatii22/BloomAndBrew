import { Link } from "react-router-dom";

const CategoryCard = ({ image, name, search }) => (
  <Link to={`/products?search=${encodeURIComponent(search)}`} className="flex flex-col items-center gap-2.5 group shrink-0">
    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border bg-soft-pink shadow-sm group-hover:shadow-md transition-shadow">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <span className="text-xs font-semibold text-heading group-hover:text-primary-dark transition-colors">{name}</span>
  </Link>
);

export default CategoryCard;
