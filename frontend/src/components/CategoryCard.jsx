const CategoryCard = ({ title, text, icon }) => {
  return (
    <div className="rounded-[24px] border border-pink-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
};

export default CategoryCard;
