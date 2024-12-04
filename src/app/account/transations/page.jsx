"use client";

import Alerts from "@/app/Components/Alerts";
import Loading from "@/app/Components/Loading";
import TableView from "@/app/Components/TableView";
import { useAuthContext } from "@/app/Context/authContext";
import { apiUrl, woocommerceKey } from "@/app/Utils/variables";
import { useEffect, useState } from "react";

export default function Transations() {
  const [transations, setTransations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData?.id) {
    
      fetch(
        `${apiUrl}wp-json/wc/v3/orders${woocommerceKey}&customer=${userData?.id}&per_page=100`
      )
        .then((res) => res.json())
        .then((data) => {
        
          setTransations(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          setTransations([]); 
        });
    }
  }, [userData?.id]); 

  return (
    <>
      <div className="bg-bggray">
        <section className="pb-0 sm:pt-0 pt-3">
          <div className="sm:bg-transparent max-w-[999px] mx-auto">
            <div>
              {loading ? (
                <div className="text-center min-h-[70vh] flex items-center justify-center">
                  <Loading spinner />
                </div>
              ) : (
                <ul className="general-list">
                  {!transations?.length ? (
                    <Alerts noPageUrl large title="You have no transations" />
                  ) : (
                    transations.map((item, index) => (
                      <TableView
                        data={[item]}
                        key={index}
                        labels={[
                          { label: "Transaction ID" },
                          { label: "Payment Method" },
                          { label: "Payment Status" },
                          { label: "Refund" },
                          { label: "Invoice" },
                        ]}
                      />
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
