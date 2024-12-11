"use client";

import Link from "next/link";
import { homeUrl } from "../Utils/variables";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <div className="container py-2 sm:px-0">
      <div className="breadcrumbs text-xs">
        <ul className="flex space-x-2">
          <li>
            <Link href={homeUrl}>Home</Link>
          </li>

          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

            return (
              <li key={path}>
                {index === pathSegments.length - 1 ? (
                  <span>{segment.replace("-", " ")}</span>
                ) : (
                  <Link href={path}>{segment.replace("-", " ")}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
