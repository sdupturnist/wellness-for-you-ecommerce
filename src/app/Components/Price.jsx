import { currency, OfferPercentage } from "../Utils/variables";

export default function Price({ regular, sale }) {
  return (
    <div>
      <span className="product-price">
        {currency}
        {sale}
      </span>
      {sale !== regular && (
        <span className="product-price-regular mx-[6px]">
          {currency}
          {regular}
        </span>
      )}
  <span>
     <OfferPercentage normalprice={regular} saleprice={sale} />
     </span>
    </div>
  );
}
