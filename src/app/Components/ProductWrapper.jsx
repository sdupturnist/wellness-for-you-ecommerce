"use client";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import Alerts from "./Alerts";
import SectionHeader from "./SectionHeader";
import Skelton from "./Skelton";

export default function ProductWrapper({ searchParams, category }) {
  const currentPage = searchParams.page || 1;
  const itemsShowPerPage = 30;

  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoriesJson, setCategoriesJson] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all products data
        const allProductsData = await fetch(
          `${apiUrl}wp-json/wc-custom/v1/products?sort_by_acf=asc&category=${category}&search=&min_price=0&page=${currentPage}&per_page=${itemsShowPerPage}&reviews_count=0`
        );
        const allProductsDataJson = await allProductsData.json();

        // Fetch total product count for pagination
        const allProductsDataCount = await fetch(
          `${apiUrl}wp-json/wc-custom/v1/products?category=${category}&search=&min_price=0&page=0&per_page=100&reviews_count=0`
        );
        const allProductsCountJson = await allProductsDataCount.json();

        // Fetch categories for filters
        const categoriesData = await fetch(
          `${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}&orderby=name&order=desc`
        );
        const categoriesJson = await categoriesData.json();

        // Fetch top products
        const topProductsData = await fetch(
          `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&orderby=id&order=desc`
        );
        const topProductsDataJson = await topProductsData.json();

        // Set states with fetched data
        setAllProducts(allProductsDataJson?.products || []);
        setTotalProducts(allProductsCountJson?.products?.length || 0);
        setCategoriesJson(categoriesJson);
        setTopProducts(
          topProductsDataJson.filter(
            (product) => product.acf && product.acf.top === true
          )
        );
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsShowPerPage);

  if (loading) {
    return <Skelton catPage/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredProductsTopProducts =
    topProducts &&
    topProducts.filter((product) => product.acf && product.acf.top === true);

  return (
    <>
      {allProducts.length > 0 ? (
        <div className={`grid grid-cols-1 sm:gap-5 gap-5`}>
          <div className="grid gap-3 sm:gap-0 w-full xl:order-2 order-first ">
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
