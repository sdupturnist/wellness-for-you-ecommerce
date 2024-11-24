"use client";

import { useEffect, useState } from "react";
import { useCartContext } from "../Context/cartContext";
import AddToCart from "./AddToCart";
//import AddToCartWithQty from "./AddToCartWithQty.jsx______"
import ProductCard from "./ProductCard";
import Alerts from "./Alerts";

export default function CartListItem() {
   const { cartItems, setCartItems } = useCartContext();
   

  // const cartItems = [
  //   {
  //     product_photo: "/images/product.jpg",
  //     product_title: "Vitaminberry Just For Gut",
  //     review_count: 3,
  //     normal_price: 1040,
  //     sale_price: 989,
  //     offer: 20,
  //     reviews: [
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 1,
  //       },
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 2,
  //       },
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 5,
  //       },
  //     ],
  //   },
  //   {
  //     product_photo: "/images/product.jpg",
  //     product_title: "Vitaminberry Just For Gut",
  //     review_count: 3,
  //     normal_price: 1040,
  //     sale_price: 989,
  //     offer: 20,
  //     reviews: [
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 1,
  //       },
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 2,
  //       },
  //       {
  //         review_author: `Esther Howard`,
  //         review_post_date: ` 22 Jul`,
  //         review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
  //         review_count: 5,
  //       },
  //     ],
  //   },
  // ];

  const filteredProducts = cartItems?.filter(
    (product) => cartItems && cartItems.some((item) => item.id === product.id)
  );

  useEffect(() => {
    const storedData = localStorage.getItem("cartData");
    if (storedData) {
      setCartData(JSON.parse(storedData));
    }
  }, []);

  // Calculate the total amount
  const totalAmount = cartItems?.reduce((total, item) => {
    return total + item?.quantity * item?.price;
  }, 0);

  // State for order
  const [currentOrder, setCurrentOrder] = useState([]);

  // Update order when totalAmount changes
  useEffect(() => {
    const updatedOrder = [...filteredProducts, { totalAmount }];
    setCurrentOrder(updatedOrder);
  }, [totalAmount]);

 // console.log(cartItems);



 // Load items from localStorage on component mount
 useEffect(() => {
   const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
   setCartItems(storedItems);
 }, []);


 const removeFromCartConfirm = (id) => {
   const updatedCartItems = cartItems.filter((item) => item.id !== id);
   setCartItems(updatedCartItems);
   localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
 };




  return (
    <ul className="added-cart-list mb-5">
      {cartItems.length > 0 ?
        cartItems.map((item, index) => (
          <li key={index}>
            <div className="flex items-center justify-start w-full sm:gap-0 gap-3">
              <ProductCard data={item} column inCartPage />
              <div>
                <AddToCart inCartPage />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="join">
                <button className="join-item option-btn">
                  Move to wishlist
                </button>
                <button 
                className="join-item option-btn"
                onClick={(e) => removeFromCartConfirm(item.id)}
                >Remove</button>
              </div>
            </div>
          </li>
        ))
      :
      <Alerts 
      title="Not have any items in your "
      large
      />
      }
    </ul>
  );
}
