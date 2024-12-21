import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Utils/variables";
import { userId } from "../Utils/UserInfo";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [editData, setEditData] = useState(null);
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To capture any errors during the fetch
  const [activeWishlist, setActiveWishlist] = useState([]);
  const [hideCartItem, setHideCartItem] = useState({});

  useEffect(() => {
    // Check if userId is defined, else handle accordingly
    if (!userId) {
      // Handle scenario where user is not logged in (e.g., show login prompt)
      console.warn("User is not logged in. Fetching wishlist for guest.");
      // Optionally, you could show a login prompt or redirect here
      return; // Exit early or handle it differently
    }
  
    // Proceed with the fetch request if userId is valid
    fetch(`${apiUrl}wp-json/wishlist/v1/items?user_id=${userId}`, {
      method: "GET",
      credentials: "same-origin", // Include cookies with the request if necessary
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch wishlist data");
        }
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("wishlist_data", JSON.stringify(data)); // Save data in sessionStorage
        setActiveWishlist(data); // Set state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // You could also display an error message to the user here
        setLoading(false);
      });
  }, [userId]); // Re-run the effect when userId changes
  

  useEffect(() => {
    // Check if contact info is available in sessionStorage
    const cachedContactData = sessionStorage.getItem("contactData");
  
    if (cachedContactData) {
      // If cached data exists, use it and avoid making the API call
      setContactData(JSON.parse(cachedContactData));
      setLoading(false);
    } else {
      // If no cached data, fetch it from the API
      fetch(`${apiUrl}wp-json/wp/v2/contact-info`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          // Store fetched data in sessionStorage
          sessionStorage.setItem("contactData", JSON.stringify(data[0]));
  
          // Set the fetched data in the state
          setContactData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error);
          setLoading(false);
        });
    }
  }, []);
  

  return (
    <SiteContext.Provider
      value={{
        editData,
        setEditData,
        contactData,
        setContactData,
        activeWishlist,
        setActiveWishlist,
        hideCartItem,
        setHideCartItem,
        loading,
        error, // Pass loading and error to context
      }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
