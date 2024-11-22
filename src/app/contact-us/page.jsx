import ContactForm from "../Components/Forms/ContactForm";
import Images from "../Components/Images";
import SocialIcons from "../Components/SocialIcons";

export default function ContactUs() {
  return (
    <div>
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <Images
            imageurl="/images/banner_6.jpg"
            quality="100"
            width="1700"
            height="600"
            alt="Wellness for you"
            classes="block w-full sm:h-[350px] h-[150px] sm:rounded-lg object-cover sm:my-5 sm:w-[98%] mx-auto"
            placeholder={true}
          />

          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 max-w-[999px] mx-auto grid sm:gap-7 gap-4">
              <h1 className="sm:text-3xl text-2xl font-bold sm:text-center text-start">
                Contact Us
              </h1>
              <div className="grid gap-8 lg:grid-cols-2 sm:mt-8">
                <div className="tf-content-left">
                  <div className="sm:mb-5 mb-4">
                    <p className="sm:mb-2 mb-1 font-bold">Address</p>
                    <p> Calicut, Kerala, India 673004</p>
                  </div>
                  <div className="sm:mb-5 mb-4">
                    <p className="sm:mb-2 mb-1 font-bold">Phone</p>
                    <p>+91 8089 319 333</p>
                  </div>
                  <div className="sm:mb-5 mb-4">
                    <p className="sm:mb-2 mb-1 font-bold">Email</p>
                    <p>sales@wellness4u.in</p>
                  </div>
                  <div className="mb-9">
                    <p className="sm:mb-2 mb-1 font-bold">Open Time</p>
                    <p className="mb-3">9am to 5pm, Mon - Fri</p>
                  </div>
                  <div>
                    <SocialIcons color={"#137E43"} size="24" />
                  </div>
                </div>
                <div className="tf-content-right">
                  <p className="mb-6">
                    If you’ve got great products you're making or looking to
                    work with us, then drop us a line.
                  </p>
                  <div>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
