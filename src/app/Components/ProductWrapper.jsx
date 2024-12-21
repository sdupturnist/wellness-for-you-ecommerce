"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import Alerts from "./Alerts";
import SectionHeader from "./SectionHeader";
import Skelton from "./Skelton";
import Loading from "./Loading";

export default function ProductWrapper({ searchParams, category }) {
  const currentPage = searchParams.page || 1;
  const itemsShowPerPage = 30;
  const cacheExpiryTime = 10 * 60 * 1000; // 10 minutes expiry

  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoriesJson, setCategoriesJson] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use ref to cache previous fetched data to avoid redundant API calls
  const prevCategory = useRef(category);
  const prevPage = useRef(currentPage);

  // Helper function to check if the cache is expired
  const isCacheExpired = (timestamp) => {
    return Date.now() - timestamp > cacheExpiryTime;
  };

  // Fetch categories once and cache them
  useEffect(() => {
    const cachedCategories = sessionStorage.getItem("categoriesJson");
    const cachedCategoriesTimestamp = sessionStorage.getItem("categoriesJsonTimestamp");

    if (cachedCategories && cachedCategoriesTimestamp && !isCacheExpired(Number(cachedCategoriesTimestamp))) {
      setCategoriesJson(JSON.parse(cachedCategories));
    } else {
      axios
        .get(`${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}`, {
          params: { orderby: "name", order: "desc" }
        })
        .then((response) => {
          const categoriesData = response.data;
          setCategoriesJson(categoriesData);
          sessionStorage.setItem("categoriesJson", JSON.stringify(categoriesData)); // Cache categories in sessionStorage
          sessionStorage.setItem("categoriesJsonTimestamp", Date.now().toString()); // Cache timestamp
        })
        .catch((err) => {
          setError("Error fetching categories");
        });
    }
  }, []); // Only runs once to cache categories

  // Prevent unnecessary API calls when category or page hasn't changed
  useEffect(() => {
    if (prevCategory.current === category && prevPage.current === currentPage && !loading) {
      return; // Skip fetching if no change in category or page and loading is false
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Check for cached product data for this category and page
        const cachedProducts = sessionStorage.getItem(`products-${category}-${currentPage}`);
        const cachedTotalProducts = sessionStorage.getItem(`total-products-${category}`);
        const cachedTopProducts = sessionStorage.getItem(`top-products-${category}`);

        const cachedProductsTimestamp = sessionStorage.getItem(`products-${category}-${currentPage}-timestamp`);
        const cachedTotalProductsTimestamp = sessionStorage.getItem(`total-products-${category}-timestamp`);
        const cachedTopProductsTimestamp = sessionStorage.getItem(`top-products-${category}-timestamp`);

        let useCache = true;

        if (
          !cachedProducts ||
          !cachedTotalProducts ||
          !cachedTopProducts ||
          isCacheExpired(Number(cachedProductsTimestamp)) ||
          isCacheExpired(Number(cachedTotalProductsTimestamp)) ||
          isCacheExpired(Number(cachedTopProductsTimestamp))
        ) {
          useCache = false;
        }

        if (useCache) {
          // Use cached data if available and valid
          setAllProducts(JSON.parse(cachedProducts));
          setTotalProducts(Number(cachedTotalProducts));
          setTopProducts(JSON.parse(cachedTopProducts));
          setLoading(false);
        } else {
          // Fetch fresh data if cache is expired or unavailable
          const [
            allProductsDataRes,
            allProductsCountRes,
            topProductsDataRes
          ] = await Promise.all([
            axios.get(`${apiUrl}wp-json/wc-custom/v1/products`, {
              params: {
                sort_by_acf: 'asc',
                category: category,
                search: '',
                min_price: 0,
                page: currentPage,
                per_page: itemsShowPerPage,
                reviews_count: 0
              }
            }),
            axios.get(`${apiUrl}wp-json/wc-custom/v1/products`, {
              params: {
                category: category,
                search: '',
                min_price: 0,
                page: 0,
                per_page: 100,
                reviews_count: 0
              }
            }),
            axios.get(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}`, {
              params: { orderby: 'id', order: 'desc' }
            })
          ]);

          // Extract data from responses
          const allProductsDataJson = allProductsDataRes.data;
          const allProductsCountJson = allProductsCountRes.data;
          const topProductsDataJson = topProductsDataRes.data;

          // Set states with the fetched data
          setAllProducts(allProductsDataJson?.products || []);
          setTotalProducts(allProductsCountJson?.products?.length || 0);
          setTopProducts(
            topProductsDataJson.filter(
              (product) => product.acf && product.acf.top === true
            )
          );

          // Cache data in sessionStorage
          sessionStorage.setItem(`products-${category}-${currentPage}`, JSON.stringify(allProductsDataJson?.products || []));
          sessionStorage.setItem(`total-products-${category}`, JSON.stringify(allProductsCountJson?.products?.length || 0));
          sessionStorage.setItem(`top-products-${category}`, JSON.stringify(topProductsDataJson.filter(product => product.acf && product.acf.top === true)));

          // Cache timestamps
          sessionStorage.setItem(`products-${category}-${currentPage}-timestamp`, Date.now().toString());
          sessionStorage.setItem(`total-products-${category}-timestamp`, Date.now().toString());
          sessionStorage.setItem(`top-products-${category}-timestamp`, Date.now().toString());

          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
    prevCategory.current = category;
    prevPage.current = currentPage;
  }, [category, currentPage, loading]);

  const totalPages = Math.ceil(totalProducts / itemsShowPerPage);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loading spinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter top products with top flag
  const filteredProductsTopProducts =
    topProducts && topProducts.filter((product) => product.acf && product.acf.top === true);

  return (
    <>
      {allProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:gap-5 gap-5">
          <div className="grid gap-3 sm:gap-0 w-full xl:order-2 order-first">
            {allProducts.length > 0 && (
              <div className="section-header-card">
                <SectionHeader
                  title="All products"
                  url="/"
                  filter
                  filterData={categoriesJson}
                  spacingSm
                />
                <ProductGrid items={allProducts} />
                <Pagination
                  currentPage={parseInt(currentPage, 10)}
                  totalPages={totalPages}
                  baseUrl={`${category}`}
                  itemsShowPerPage={itemsShowPerPage}
                />
              </div>
            )}
            {filteredProductsTopProducts.length > 0 && (
              <div className="section-header-card">
                <SectionHeader title="Best selling Product" spacingSm />
                <ProductGrid items={filteredProductsTopProducts} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Alerts
          large
          title="Sorry, No products Found"
          noPageUrl
          url={homeUrl}
          buttonLabel="Return to home"
        />
      )}
    </>
  );
}
