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
    // Fetching contact info
    fetch(`${apiUrl}wp-json/wishlist/v1/items?user_id=${userId}`, {
      method: "GET",
      credentials: "same-origin", // Include cookies with the request if necessary
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("wishlist_data", JSON.stringify(data));

        // Set the state and loading
        setActiveWishlist(data); // or use 'data' if it's from the API response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetching contact info
    fetch(`${apiUrl}wp-json/wp/v2/contact-info`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Fetched contact data:", data[0]); // Inspect the data received
        setContactData(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
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
