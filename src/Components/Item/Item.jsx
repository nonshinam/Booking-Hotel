import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Item({
  id,
  picture_url,
  name,
  price,
  property_type,
  bathrooms,
  bedrooms,
  beds,
  smart_location,
  neighbourhood,
  date,
  options,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="item">
        <img className="item-img-list" src={picture_url.url} />
        <div className="item-right">
          <div className="item-line1">
            <h1>{name}</h1>
            <h2>Excellent</h2>
            <h3>8.9</h3>
          </div>
          <h3 className="free">Free airport taxi</h3>
          <div className="item-line1 my-3">
            <div>
              <h2>{property_type}</h2>
              <h2 className=" text-gray-600">
                {bathrooms} bathrooms . {bedrooms} bedrooms . {beds} beds
              </h2>
            </div>
            <h2 className="price">{price}$</h2>
          </div>
          <div className="item-line1">
            <h2 className="flex">
              <FaLocationDot className=" text-lg" />
              {smart_location} {neighbourhood}
            </h2>
            <button
              onClick={() => {
                localStorage.setItem(
                  "myData",
                  JSON.stringify({ date, options })
                );
                navigate(`/hotels/${id}`);
              }}
              className="button"
            >
              see availability
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
