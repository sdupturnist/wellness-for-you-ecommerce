import Breadcrumb from "../Components/Breadcrumb";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";
import ProductSlider from "../Components/ProductSlider";
import SectionHeader from "../Components/SectionHeader";

export default function Item() {
  return (
    <div className="bg-bggray">
      <Breadcrumb />

      <section className="sm:bg-white bg-bggray sm:py-6 py-0">
        <div className="container !px-0 sm:px-5">
          <div className="grid grid-cols-1 sm:gap-8 gap-5 lg:grid-cols-[25%_75%]">
            <div className="w-full lg:pr-7 order-last lg:order-1">
              <div className="sm:mb-8 bg-white sm:p-0 py-5 px-4">
                <SectionHeader title="Top rated products" />
                <div className="products">
                  {allProducts &&
                    topProducts.map((item, index) => (
                      <ProductCard key={index} data={item} column />
                    ))}
                </div>
              </div>
            </div>
            <div className="block w-full lg:order-2 order-first ">
              <div className="sm:mb-8 bg-white sm:p-0 py-5 px-4">
                <SectionHeader title="Featured products" url="/" spacingSm />
                <div className="products">
                  {featuredProductData && (
                    <ProductSlider count="4" data={featuredProductData} />
                  )}
                </div>
              </div>
              <div className="sm:mt-0 mt-5 bg-white sm:p-0 py-5 px-4">
                <SectionHeader title="All products" url="/" filter spacingSm/>
                <div className="products grid sm:grid-cols-4 sm:gap-4">
                  {allProducts &&
                    allProducts.map((item, index) => (
                      <ProductCard key={index} data={item} mobileList />
                    ))}
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProductData = [
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

const allProducts = [
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

const topProducts = [
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
        review_count: 5,
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
