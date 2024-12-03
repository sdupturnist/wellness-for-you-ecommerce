'use client'

import { useEffect, useState } from "react";
import { apiUrl, woocommerceKey } from "../Utils/variables";
import MyOrder from "./MyOrder";
import Alerts from "./Alerts";
import Loading from "./Loading";

export default function AllOrders() {
  const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run once on mount
    
    fetch(`${apiUrl}wp-json/wc/v3/orders${woocommerceKey}&customer=${userInfo?.id}&per_page=100`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);  // Empty dependency array to run the effect once


  return (
    <div>
      {loading ? (
        <div className="text-center min-h-[70vh] flex items-center justify-center">
          <Loading spinner/>
        </div>
      ) : (
        <ul className="general-list">
          {!orders?.length > 0 && <Alerts large title="You have no orders" />}
          {orders &&
            orders.map((item, index) => (
              <MyOrder data={item} key={index} userInfo={userInfo} />
            ))}
        </ul>
      )}
    </div>
  );
}
