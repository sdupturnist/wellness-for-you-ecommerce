"use client";

export default function Skelton({ productCard, productleftRightCard, listAddress, list, catPage }) {
  return (
    <>


      {productleftRightCard && (
        <div className="flex w-full flex-col gap-4 mb-5 bg-white p-3 rounded-lg">
          <div className="flex items-center gap-4 justify-between">
            <div className="skeleton h-20 w-20 shrink-0 rounded-lg"></div>
            <div className="flex flex-col gap-4 w-full">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full max-w-[50%]"></div>
              
            </div>
          </div>
        </div>
      )}

      {productCard && (
        <div className="flex w-full flex-col gap-4 bg-white">
          <div className="skeleton h-48 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full max-w-[70%]"></div>
              <div className="skeleton h-4 w-full max-w-[80px]"></div>
        </div>
      )}


{listAddress && (
          <div className="flex w-full flex-col gap-4 mb-5 bg-white">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-4 w-full max-w-[50%]"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        </div>
      )}


{list && (
          <div className="flex w-full flex-col gap-4 mb-5 bg-white">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-4 w-full max-w-[50%]"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full max-w-[50%]"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        </div>
      )}


{catPage && (
          <div className="flex w-full flex-col gap-4">
     <div className="xl:grid-cols-4 products product-card-left-right-mobile grid grid-cols-2 sm:gap-4 gap-2 sm:px-0 px-[20px] sm:bg-transparent bg-white sm:py-0 py-[20px]">
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
  <div className="skeleton rounded-xl sm:h-[350px] h-[250px] w-full bg-gray-200"></div>
</div>

        </div>
      )}
    </>
  );
}
