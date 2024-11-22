import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import ProfileMenu from "@/app/Components/ProfileMenu";
import Reviews from "@/app/Components/Reviews";

export default function Payments() {

  const  rewards = [
    {
      review_author: `Esther Howard`,
      review_post_date: ` 22 Jul`,
      review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
      review_count: 4,
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
  ]

  //const myOrders = null

  return (
    <div className="bg-bggray">
     <section className="bg-bggray sm:py-10 pb-5 pt-0">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
            <AccountHeader back/>
            <div className="sm:mt-5 mt-3 sm:pt-2">
              <div className="card bg-white">
              {/* <Reviews  data={reviews} /> */}
              </div>
            </div>
              <ProfileMenu />
          </div>
        </div>
      </section>
    </div>
  );
}
