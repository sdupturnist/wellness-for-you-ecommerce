const date = new Date();

export let homeUrl = process.env.NEXT_PUBLIC_SITE_URL;

export let year = date.getFullYear();


//OFFER PERCENTAGE
export let OfferPercentage = ({ normalprice, saleprice }) => {
  let normalPrice = normalprice;
  let salePrice = saleprice;

  let discountPercentage = Math.round(
    ((normalPrice - salePrice) / normalPrice) * 100
  );

  return discountPercentage; // Or any message you want to return
};


//CURRENCY

export let currency = '₹'