import { Suspense } from "react";
import ResetPasswordForm from "../ResetPasswordForm";
import Loading from "../Loading";


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading fullscreen/>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
