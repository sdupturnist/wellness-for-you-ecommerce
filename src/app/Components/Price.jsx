import { currency, OfferPercentage } from "../Utils/variables";

export default function Price({ regular, sale }) {
  return (
    <div>
      <span className="product-price">
        {currency}
        {sale}
      </span>
      {sale !== regular && (
        <span className="product-price-regular ml-2">
          {currency}
          {regular}
        </span>
      )}
  <span className="pl-2">
     <OfferPercentage normalprice={regular} saleprice={sale} />
     </span>
    </div>
  );
}
