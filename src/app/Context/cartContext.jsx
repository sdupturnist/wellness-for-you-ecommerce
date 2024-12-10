import { createContext, useContext, useEffect, useState } from "react";
import { decryptData, encryptData } from "../Utils/variables";

const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponData, setCouponData] = useState([]);
  const [guestUser, setGuestUser] = useState(false);
  const [guestUserData, setGuestUserData] = useState(null);
  const [guestUserDataValidation, setGuestUserDataValidation] = useState(false);
  const [cartListedItems, setCartListedItems] = useState([]);

  
  // Load cartItems from localStorage when the component mounts (or updates cartItems)
  useEffect(() => {
    // Only run in the browser (client-side)
    if (typeof window !== "undefined") {
    //  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedCartItems = localStorage.getItem("cart") && decryptData(localStorage.getItem("cart"))  || [];
      setCartItems(storedCartItems);

      const subTotal = storedCartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);





      const productIds = storedCartItems.map(product => product.product_id).join(',');
     
      

          fetch(`https://admin.wellness4u.in/wp-json/wc/v3/products?include=${productIds}&consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03`)
            .then((res) => res.json())
            .then((data) => {
              setCartListedItems(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
    

    
    
    const filteredData = cartListedItems
      .map(product => {
    
        const cartItem = cartItems.find(item => item.product_id === product.id);
        if (cartItem) {
       
          const price = parseFloat(product.price);

       
    
          return {
            ...product,
            totalPrice: price * cartItem.quantity, // price from productData
            quantity: cartItem.quantity
          };
        }
        return null;
      })
      .filter(item => item !== null); // Remove any null values
    
    
    const subtotal = filteredData.reduce((total, item) => total + item.totalPrice, 0);
    
   // console.log("Filtered Product Data:", filteredData);
    //console.log("Subtotal:", subtotal);
   
  
 setCartSubTotal(subtotal);

    }
  }, [cartListedItems]); 





  useEffect(() => {
   
    if (typeof window !== "undefined" && cartItems.length > 0) {
      localStorage.setItem("cart", encryptData(cartItems));
      ///localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage whenever cartItems changes
    }
  }, [cartItems]); 


  //console.log(cartItems)



  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartItems,
        setCartItems,
        cartSubTotal,
        setCartSubTotal,
        couponCode,
        setCouponCode,
        discount,
        setDiscount,
        addToCart,
        removeFromCart,
        cartTotal,
        setCartTotal,
        couponData,
        setCouponData,
        guestUser, 
        setGuestUser,
        guestUserData,
         setGuestUserData,
         guestUserDataValidation, 
         setGuestUserDataValidation,
         cartListedItems, 
         setCartListedItems
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
