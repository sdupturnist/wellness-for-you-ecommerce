"use client";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import { useRouter } from "next/navigation";  // Import from next/navigation

export default function Search() {
  const [items, setItems] = useState([]);
  const [selectResult, setSelectResult] = useState("");
  
  const router = useRouter();  // Initialize the useRouter hook from next/navigation
  
  useEffect(() => {
    fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOnSearch = (string, results) => {
 
  };

  const handleOnSelect = (item) => {
    const url = `${homeUrl}/${item?.categories[0]?.slug}/${item.slug}`; 
    router.push(url); 
    setSelectResult(item); 
  };

  const formatResult = (item) => {
    return (
      <>
        <span
          className="result-item"
          style={{ display: "block", textAlign: "left" }}
        >
          {item.name}
        </span>
      </>
    );
  };

  return (
    <div className="search w-full">
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        placeholder="Search for products..."  // Placeholder text here
      />
    </div>
  );
}
