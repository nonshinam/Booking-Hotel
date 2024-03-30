import React from "react";
import { Link } from "react-router-dom";
import "./Featured.css";

export default function Featured({ data }) {
  return (
    <div className="featured ">
      {data.slice(1, 5).map((item) => (
        <Link
          to={`/hotels/${item.id}`}
          className="featuredItem mt-4"
          key={item.id}
          {...item}
        >
          <img src={item.picture_url.url} className="featuredImg" />
          <div className="featuredTitles">
            <h1>{item.smart_location}</h1>
            <h2>{item.price} $</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
