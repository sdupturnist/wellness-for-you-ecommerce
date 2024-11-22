


"use client";
import { useState, useEffect } from "react";
import Alerts from "./Alerts";
import Images from "./Images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currency } from "../Utils/variables";
import AmountList from "./AmountList";

export default function TableView({data, labels}) {

    const pathname = usePathname();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (data) {
        setLoading(false);
      }
    }, [data]);

    return (
        <>
          {loading ? (
            // Skeleton Loader
            <div className="skeleton h-32 w-full mb-5"></div>
          ) : (
            <li className="card-rounded-none-small bg-white">
              <div className="w-full">
              <AmountList data={data && data} labels={labels && labels} tableView/>
              </div>
            </li>
          )}
        </>
      );
}
