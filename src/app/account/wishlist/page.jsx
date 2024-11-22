import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import ProfileMenu from "@/app/Components/ProfileMenu";
import ProductCard from "@/app/Components/ProductCard";
import Alerts from "@/app/Components/Alerts";



export default function WishList() {

  
const wishListItems = [
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
    reviews: [
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 1,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 2,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 5,
      },
    ],
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
    reviews: [
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 1,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 2,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 5,
      },
    ],
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
    reviews: [
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 1,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 2,
      },
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 5,
      },
    ],
  },

  
];


  return (
    <div className="bg-bggray">
    <section className="bg-bggray sm:py-10 pb-5 pt-0">
       <div className="container !px-0 sm:px-5">
         <div className="max-w-[999px] mx-auto">
           <AccountHeader back/>
           <div className="sm:mt-5 mt-3 sm:pt-2">
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-5 gap-1">
                 {!wishListItems && <Alerts large title="You have not any" />}
                 {wishListItems &&
                   wishListItems.map((item, index) => (
                    <div key={index} className="card-rounded-none-small !p-0 overflow-hidden">
                      <ProductCard key={index} data={item} mobileList wishlist/>
                    </div>
                   ))}
               </div>
           </div>
             <ProfileMenu />
         </div>
       </div>
     </section>
   </div>
  );
}


