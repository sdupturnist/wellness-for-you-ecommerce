import Image from "next/image";
import { siteName } from "../Utils/variables";

export default function Images({
  imageurl,
  styles,
  quality,
  width,
  height,
  alt,
  classes,
  placeholder
}) {
  const blurUrl_ = 'data:image/webp;base64,UklGRhICAABXRUJQVlA4WAoAAAAgAAAABQAAAwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggJAAAANABAJ0BKgYABAAJAKwlAF2AHpMfuDUAAP6wuhuLZW9nb+eAAA';

  // // Check if the image URL is valid
  // const isValidUrl = (url) => {
  //   try {
  //     return Boolean(new URL(url));
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const validImageUrl = imageurl && isValidUrl(imageurl) ? imageurl : '/images/image-placeholder.webp';

  return (
    <>
      {
        <Image
        width={width}
    height={height}
    quality={quality}
    placeholder={placeholder == true ? 'blur' : 'empty'}
    blurDataURL={blurUrl_}
    src={imageurl || '/images/image-placeholder.webp'}
    className={classes}
    alt={alt || siteName}
    title={alt || siteName}
        />
      }
    </>
  );
}
