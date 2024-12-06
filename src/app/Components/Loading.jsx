"use client";

export default function Loading({
  dot,
  spinner,
  classes,
  fullscreen,
  message,
}) {
  return (
    <>
      {dot && (
        <span className={`${classes} loading loading-dots text-primary`}></span>
      )}

      {spinner && (
        <span
          className={`${classes} loading loading-spinner text-primary`}></span>
      )}

      {fullscreen && (
        <div className="backdrop-blur-lg bg-white fixed inset-1 z-50 flex items-center justify-center">
          <div className="text-center grid gap-5 items-center justify-center">
            <span
              className={`${classes} loading loading-spinner text-primary mx-auto`}></span>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}
