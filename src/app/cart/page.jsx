import Breadcrumb from "../Components/Breadcrumb";
import CartView from "../Components/CartView";


export default function Cart() {


  // const cookieStore = await cookies();
  // const myCookie = cookieStore.get('myCookie') || 'No cookie found';
  

  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="sm:bg-white bg-bggray sm:py-10 py-0">
        <div className="container !px-0 sm:px-5">
          <CartView />
        </div>
      </section>
    </div>
  );
}
