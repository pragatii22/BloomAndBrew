import { getImageUrl } from "../../service/api";
import fallbackFlower from "../../assets/images/bouquet.png";

const ProductImage = ({ image, alt, className = "" }) => (
  <img
    src={getImageUrl(image)}
    alt={alt}
    className={className}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackFlower;
    }}
  />
);

export default ProductImage;
