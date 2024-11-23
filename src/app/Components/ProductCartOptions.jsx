"use client";

export default function ProductCartOptions({ data }) {
  return (
    <>
      <div className="product-cart-options">
        <small>Select</small>
        <ul className="select-options">
          {data &&
            data.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                   className="checkbox checkbox-sm checkbox-success"
                />
                <label>{item?.title}</label>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
