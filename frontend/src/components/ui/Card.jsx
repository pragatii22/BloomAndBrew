const Card = ({ children, className = "", hover = false, padding = "p-5", as: Tag = "div", ...props }) => (
  <Tag
    className={`card ${hover ? "card-hover" : ""} rounded-xl ${padding} ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default Card;
