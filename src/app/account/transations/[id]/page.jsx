"use client";
import { Preview, print } from "react-html2pdf";
import Invoice from "@/app/Components/Invoice";
import { useEffect } from "react";
import { apiUrl, siteName, woocommerceKey } from "@/app/Utils/variables";
import { useParams } from "next/navigation";



export default function ViewInvoice({data}) {

    const id = useParams()
    
const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  console.log(id)

useEffect(() => {
    // Only run once on mount
    fetch(
      `${apiUrl}wp-json/wc/v3/orders${woocommerceKey}&customer=${userInfo?.id}&per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setTransations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);


  console.log(data)
  
  return (
    <div className="card-rounded-none-small bg-white">
      <div className="border border-border rounded-lg overflow-hidden">
        <Preview id={"jsx-template"}>
          <Invoice />
        </Preview>
      </div>
      <button
        onClick={(e) => print(`${siteName}_invoice_${id?.id}`, "jsx-template")}
        className="btn btn-light btn-large mt-5">
        Download invoice
      </button>
    </div>
  );
}
