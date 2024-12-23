"use client";
import { useEffect, useState, useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import { useRouter } from "next/navigation"; // Import from next/navigation

export default function Search() {
  const [items, setItems] = useState([]);
  const [selectResult, setSelectResult] = useState("");
  const [startSearch, setStartSearch] = useState(false);

  const router = useRouter(); // Initialize the useRouter hook from next/navigation
  const searchBoxRef = useRef(null); // Reference to the search box container

  useEffect(() => {
    // Fetch product data
    fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Close search when click outside of the input box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setStartSearch(false); // Set startSearch to false when clicking outside
      }
    };

    // Attach event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnSearch = (string, results) => {
    setStartSearch(true);
  };

  const handleOnSelect = (item) => {
    const url = `${homeUrl}/${item?.categories[0]?.slug}/${item.slug}`;
    router.push(url);
    setSelectResult(item);
  };

  const handleOnFocus = () => {
    setStartSearch(true); // Set search to true when input is focused
  };

  const handleOnBlur = () => {
    // Handle blur if necessary, but the main click outside logic is handled by useEffect
  };

  const formatResult = (item) => {
    return (
      <span className="result-item" style={{ display: "block", textAlign: "left" }}>
        {item.name}
      </span>
    );
  };

  return (
    <div
      ref={searchBoxRef} // Attach ref to the search box container
      className={`${startSearch ? 'sm:relative fixed clicked-search top-0 left-0 right-0 m-0 !p-0' : ''} search w-full`}
    >
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        placeholder="Search for products..."
        onFocus={handleOnFocus}
        onBlur={handleOnBlur} // Handle onBlur if necessary
      />
    </div>
  );
}
