"use client";
import { Preview, print } from "react-html2pdf";
import Invoice from "@/app/Components/Invoice";
import { useEffect, useId, useState } from "react";
import { apiUrl, siteName, woocommerceKey } from "@/app/Utils/variables";
import { useParams } from "next/navigation";
import Loading from "@/app/Components/Loading";

export default function ViewInvoice({ data }) {
  const id = useParams();


const [invoice, setInvoice] = useState([])
const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Only run once on mount
    fetch(
      `${apiUrl}wp-json/wc/v3/orders/${id?.id}${woocommerceKey}&customer=${useId}&per_page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setInvoice(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("jsx-template");
  
      if (element) {
        const parent = element.parentElement;
  
        if (parent) {
          parent.style.width = "0px";  // Ensure the width is explicitly set to 0px
          parent.style.overflow = "hidden";
        }
      }
    }, 3000);  // Delay for 3 seconds (3000ms)
  
    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  



  return (
   <>
   {loading ? (
                <div className="text-center min-h-[70vh] flex items-center justify-center">
                  <Loading spinner />
                </div>
              ) : (
    <div className="card-rounded-none-small bg-white">
      <div className="border border-border rounded-lg overflow-hidden">
        <Preview id={"jsx-template"}>
          <Invoice data={invoice}/>
        </Preview>
      </div>
      <button
        onClick={(e) => print(`${siteName}_invoice_${id?.id}`, "jsx-template")}
        className="btn btn-light btn-large mt-5">
        Download invoice
      </button>
    </div>
              )
            }
   </>
  );
}
