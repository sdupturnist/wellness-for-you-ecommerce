import React, { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../Utils/variables";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [editData, setEditData] = useState(null);
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To capture any errors during the fetch

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
