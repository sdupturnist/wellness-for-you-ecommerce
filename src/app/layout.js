import { Inter } from "next/font/google";
import "../../public/styles/theme.min.css";
import Header from "./Components/Header";
import BottomNav from "./Components/BottomNav";
import Footer from "./Components/Footer";
import ClientProvider from "./ClientProvider";
import Script from "next/script";
import {
  metaAuthor,
  metaDescription,
  metaKeywords,
  metaOgDescription,
  metaOgImage,
  metaOgSiteName,
  metaOgUrl,
  metaTitle,
  metaTwitterCard,
  metaTwitterCreator,
  metaTwitterImage,
  metaTwitterSite,
  metaViewport,
} from "./Utils/variables";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: metaTitle,
//   description: metaDescription,
//   author: metaAuthor,
//   keywords: metaKeywords,
//   viewport: metaViewport,
//   robots: metaViewport,
//   ogTitle: metaTitle,
//   ogDescription: metaOgDescription,
//   ogImage: metaOgImage,
//   ogUrl: metaOgUrl,
//   ogSiteName: metaOgSiteName,
//   twitterCard: metaTwitterCard,
//   twitterSite: metaTwitterSite,
//   twitterCreator: metaTwitterCreator,
//   twitterImage: metaTwitterImage,
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <body className={inter.className}>
        <ClientProvider>
          <Header />
          <div className="overflow-hidden">{children}</div>
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-4 z-10">
            <BottomNav />
          </div>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
