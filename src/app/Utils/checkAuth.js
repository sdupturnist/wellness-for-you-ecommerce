'use client'

import { useAuthContext } from "../Context/authContext";
import { homeUrl } from "./variables";
import { useRouter } from "next/navigation";




const { auth } = useAuthContext(); // Destructure auth from useAuthContext

  const router = useRouter(); // Initialize the router



export let IsLoggined = ({url}) => {
    if (auth) {
      router.push(url);
    } else {
      router.push(`${homeUrl}login`);
    }
  };