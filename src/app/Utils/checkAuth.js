"use client";

import { useEffect, useState } from "react";
import ModalPopup from "../Components/ModalPopup";
import { homeUrl } from "./variables";
import Swal from "sweetalert2";

export const isLoggined = (auth, router, url, heading, desc) => {
  if (auth) {
    router.push(`${homeUrl}/${url}`);
  } else {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-light",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: heading,
        text: desc,
        icon: false,
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.push(`${homeUrl}/login`);
        }
      });
  }
};
