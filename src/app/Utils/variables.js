const date = new Date();


//WOOCOMMERECE 
export let woocommerceKey = '?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03'

//JWT AUTH TOCKEN
export let jwtTocken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluLndlbGxuZXNzNHUuaW4iLCJpYXQiOjE3MzI1MDQ3ODIsIm5iZiI6MTczMjUwNDc4MiwiZXhwIjoxNzMzMTA5NTgyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.MQsEgPtgiaphgFnntRwCj_cbfpLPBZomEdhkrjMT-gE`


//.ENV 
export let homeUrl = process.env.NEXT_PUBLIC_SITE_URL;
export let apiUrl = process.env.NEXT_PUBLIC_API_URL;


//STRIPE CONFIG
// export let publicKey = `pk_test_51PBumuSFrqNOhHwTB7Rr9WcBG0wxlIC0xkYQIhkOxsf2p1PVip2VzdmEdlNAkqD00GbWkJHtOIp5LW8Pzby8FeLD002sTAqQB5`
// export let secretKey = 'sk_test_51PBumuSFrqNOhHwTjPOTWHb2gkKgkXHSrZjwS09Yf7EAJ6fo3qfmhmRhjHT5NJMgEsRmdGsJHI8CXHZyNs5lhI2s00hQLz3IER'


//RAZORPAY CONFIG
export let publicKey = `rzp_live_npbJa6vH2XzXnt`
export let secretKey = '9ixUFClcmehSffk9seqIBfrk'


//GENERAL CONFIG
export let siteName = 'wellness4u'
export let siteAuthor = 'wellness4u admin'
export let year = date.getFullYear();
export let copyright = siteName + ' © '+ year
export let siteLogo = process.env.NEXT_PUBLIC_LOGO_URL
export let siteLogoWhite = process.env.NEXT_PUBLIC_LOGO_WHITE_URL


//EMAIL CONFIG
export let hostName = "smtp.gmail.com" 
export let portNumber =  587
export let emailUsername = "jaseerali2012@gmail.com"
export let emailPassword = "avjbzfvwygdyretn"
export let  siteEmail = "jaseerali2012@gmail.com"
export let  siteFromEmail = "jaseerali2012@gmail.com"





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
export let paymentCurrency = 'INR'





export let convertStringToJSON = (offerString) => {
  // Split the offerString into parts, handling the line breaks, commas, and trimming unnecessary spaces
  let parts = offerString
    .replace(/\r\n/g, '\n')   // Normalize line breaks
    .split(',')               // Split by commas to get individual offers
    .map(part => part.trim()) // Trim each part to remove extra spaces
    .filter(part => part !== ''); // Remove empty strings from the array

  // Map each part to an object that contains both the offer description and the price
  let offerData = parts.map(part => {
    // Split by the colon to separate the offer description from the price
    let [description, price] = part.split(':').map(item => item.trim());

    // Check if there's a price, and return the object
    return {
      item: description,
      price: price || null // If no price is available, set it to null
    };
  });

  return offerData;
};





export let metaStaticData = {
  title: "Default Page Title",
  description: "Default page description.",
  author: "Default Author",
  keywords: "default, seo, keywords",
  robots: "index, follow",
  canonical: "https://default-canonical-url.com",
  og_locale: "en_US",
  og_type: "article",
  og_title: "Default OG Title",
  og_description: "Default OG Description",
  og_url: "https://default-og-url.com",
  og_site_name: "Default Site Name",
  article_modified_time: "",
  twitter_card: "summary_large_image",
  twitter_misc: {
    "Est. reading time": "1 minute",
  },
  twitter_site: "@defaulthandle",
  twitter_creator: "@defaulthandle",
  twitter_image: "/favicon.ico",
};




export let  formatDate = (dateStr) => { 
  const date = new Date(dateStr);

  // Array of month names to convert numeric month to name
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get the components of the date
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Return formatted date as "Month Day, Year"
  return `${month} ${day}, ${year}`;
}



export let  emailTemplate = () => { 
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Enquiry Notification</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
     <div style="margin: 0; padding: 0; font-family: 'Arial, sans-serif'; background-color: #fff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #fff;">
                <!-- Header -->
               

                <!-- Footer -->
                <tr>
                    <td style="background-color: #15181E; color: #fff; text-align: center; padding: 10px; font-size: 14px;">
                       
                    </td>
                </tr>
            </table>
        </div>
</body>
</html>`;
}