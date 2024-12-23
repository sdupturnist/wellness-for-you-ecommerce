'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../Context/authContext";
import Loading from "../Components/Loading";
import { homeUrl } from "./variables";
import { useCartContext } from "../Context/cartContext";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { auth, loadingAuth } = useAuthContext();
    const { guestUser } = useCartContext();
    const router = useRouter();

   

    useEffect(() => {
      // Only redirect to login if not a guest user and authentication is not available
      if (!guestUser && !loadingAuth && !auth) {
        router.push(`${homeUrl}/login`);
        return; // Simply exit the useEffect without returning anything
      }
    }, [auth, loadingAuth, guestUser, router]);

    
    if (loadingAuth) {
      return (
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loading spinner />
        </div>
      );
    }

    // Render the wrapped component if authenticated or a guest
    return <WrappedComponent {...props} />;
  };

  // Set the displayName for the HOC
  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
