import React from "react";
import { Link } from "react-router-dom";
import "./PropertyList.css";

export default function PropertyList({ data }) {
  return (
    <div className="pList">
      {data.map((item) => (
        <Link
          to={`/hotels/${item.id}`}
          className="pListItem"
          key={item.id}
          {...item}
        >
          <img src={item.picture_url.url} className="pListImg" />
          <div className="pListTitles">
            <h1>{item.smart_location}</h1>
            <h2>{item.price} $</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
