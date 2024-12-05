'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../Context/authContext";
import Loading from "../Components/Loading";
import { homeUrl } from "./variables";





const withAuth = (WrappedComponent) => {
  return (props) => {
    const { auth, loadingAuth } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!loadingAuth && !auth) {
        router.push(`${homeUrl}/login`); // Redirect to login if user is not authenticated
      }
    }, [auth, loadingAuth, router]);

    if (loadingAuth) {
      return (
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loading spinner />
        </div>
      );
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
