
import {
  PencilIcon,
  HeartIcon,
  ArchiveBoxIcon,
  TruckIcon,
  MapIcon,
  CreditCardIcon,
  StarIcon,
  GiftIcon,
  KeyIcon,
  UserIcon,
  CogIcon,
  CalendarIcon,
  ArrowUturnUpIcon,
} from "@heroicons/react/24/solid";




const date = new Date();


//SECRET USER TOCKEN
export let userTocken = `9AzTrOe80vVVRgu80WPjO5itzqXJzWFVLhfxZjm6ujiCUsQvIQr1kmxT7PFj8QTkuO7QQ0H3CsbHsx3lImBghkdt0gIbA3VSjcKL4G4CEzwCYF`


//WOOCOMMERECE 
export let woocommerceKey = '?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03'
export let freeShipping = true
export let returnDays = 7


//JWT AUTH TOCKEN
export let jwtTocken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FkbWluLndlbGxuZXNzNHUuaW4iLCJpYXQiOjE3MzI5NjgxNjUsIm5iZiI6MTczMjk2ODE2NSwiZXhwIjoxNzMzNTcyOTY1LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.bWJoTwTwXd5bLDWKAEIL7mRk95knBzZfipgSCHbt4z0`




//.ENV 
export let homeUrl = process.env.NEXT_PUBLIC_SITE_URL;
export let apiUrl = process.env.NEXT_PUBLIC_API_URL;




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


//ADMIN MENU
export let accountMenus = [
  {
    label: 'Orders',
    url: 'account/orders',
    icon: <ArchiveBoxIcon className="sm:size-4 size-[18px] text-primary" />,
  },
  {
    label: 'Transactions',
    url: 'account/transations',
    icon: <CalendarIcon className="sm:size-4 size-[18px] text-primary" />,
  },
  {
    label: 'Wishlist',
    url: 'account/wishlist',
    icon: <HeartIcon className="sm:size-4 size-[18px] text-primary" />,
  },
  {
    label: 'Address',
    url: 'account/address',
    icon: <MapIcon className="sm:size-4 size-[18px] text-primary" />,
  },
  // {
  //   label: 'Payments',
  //   url: 'account/payments',
  //   icon: <CreditCardIcon className="sm:size-4 size-[18px] text-primary" />,
  // },
  // {
  //   label: 'Returns',
  //   url: 'account/returns',
  //   icon: <TruckIcon className="sm:size-4 size-[18px] text-primary" />,
  // },
  {
    label: 'Reviews',
    url: 'account/reviews',
    icon: <StarIcon className="sm:size-4 size-[18px] text-primary" />,
  },
  // {
  //   label: 'Reward Points',
  //   url: 'account/rewards',
  //   icon: <GiftIcon className="sm:size-4 size-[18px] text-primary" />,
  // },
  // {
  //   label: 'Edit profile',
  //   url: 'account/edit-profile',
  //   icon: <UserIcon className="sm:size-4 size-[18px] text-primary" />,
  // },
  {
    label: 'Change password',
    url: 'account/change-password',
    icon: <KeyIcon className="sm:size-4 size-[18px] text-primary" />,
  },
 
];



//EMAIL CONFIG
export let hostName = "smtp.gmail.com" 
export let portNumber =  587
export let emailUsername = "jaseerali2012@gmail.com"
export let emailPassword = "avjbzfvwygdyretn"
export let  siteEmail = "jaseerali2012@gmail.com"
export let  siteFromEmail = "jaseerali2012@gmail.com"



//DEFAULT META TAGS

export let  metaTitle = "Wellness4U: Wellgin Ginseng Coffee, Supplements & Medical Equipment | Pan-India"
export let  metaDescription = "Shop Wellgin Ginseng Coffee, premium health supplements, and medical care equipment at Wellness4U. Top online store offers multivitamins and more for all ages. Fast, reliable delivery across India.	"
export let metaAuthor = "Admin"
export let  metaKeywords = "Food Supplements, Multivitamin, Multivitamin for joint care, Vitamin for Knee and Joint Care, Probiotic for Gut health, kids Protein. Vitamin store in Kerala, Vitamin Store in Calicut, Vitamin Store in Thrissur, Vitamin Supplier in Kochi, Vitamin Supplier in South India, Vitamin Supplier in Malappuram, Vitamin Supplier in Palakkad, Vitamin Supplier in Pathanamthitta. Vitamin Store in Kannur, Vitamin Store in Kottayam.	"
export let  metaViewport = "width=device-width, initial-scale=1"
export let  metaRobots = "index, follow"
export let  metaOgTitle = "Wellness4U: Wellgin Ginseng Coffee, Supplements & Medical Equipment | Pan-India"
export let  metaOgDescription =  "Shop Wellgin Ginseng Coffee, premium health supplements, and medical care equipment at Wellness4U. Top online store offers multivitamins and more for all ages. Fast, reliable delivery across India."
export let  metaOgImage = siteLogo
export let  metaOgUrl = homeUrl
export let  metaOgSiteName = siteName
export let  metaTwitterCard = "summary_large_image"
export let  metaTwitterSite = ""
export let  metaTwitterCreator = ""
export let  metaTwitterImage = siteLogo





// OFFER PERCENTAGE
export let OfferPercentage = ({ normalprice, saleprice }) => {
  let normalPrice = normalprice;
  let salePrice = saleprice;

  // Check if the prices are the same
  if (normalPrice === salePrice) {
    return null;  // Return null to hide when there's no discount
  }

  // Calculate the discount percentage
  let discountPercentage = Math.round(
    ((normalPrice - salePrice) / normalPrice) * 100
  );

  return <span className="product-offer font-semibold ml-2">{discountPercentage} % OFF</span>;  // Return the discount percentage
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




export let truncateText = (text, length) => {
  if (!text) return '';
 
  return text.length > length ? text.slice(0, length - 3) + '...' : text;
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
            <table role="presentation" width="100%" cellspacing="0" cellPadding="0" style="border-collapse: collapse; background-color: #fff;">
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




