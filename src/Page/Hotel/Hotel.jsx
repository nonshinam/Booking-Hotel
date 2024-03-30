import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderList from "../../Components/Header/HeaderList";
import Navbar from "../../Components/Navbar/Navbar";
import "./Hotel.css";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";

import { FaLocationDot } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { LiaBedSolid } from "react-icons/lia";
import { IoBed } from "react-icons/io5";

export default function Hotel() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const myData = JSON.parse(localStorage.getItem("myData"));
  useEffect(() => {
    async function getLocationList() {
      const res = await fetch(`http://localhost:5000/hotels/${id}`);
      const data = await res.json();
      setItem(data);
    }
    getLocationList();
  }, []);
  const [date, setDate] = useState({
    startDate: myData.date.startDate,
    endDate: myData.date.endDate,
    key: myData.date.key,
  });
  const [day, setDay] = useState(1);
  useEffect(() => {
    const start = new Date(format(date.startDate, "yyy-MM-dd"));
    const end = new Date(format(date.endDate, "yyy-MM-dd"));
    const value = Math.abs(end - start);
    const days = Math.ceil(value / (1000 * 60 * 60 * 24));
    if (days != 0) {
      setDay(days);
    }
  }, [date]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: myData.options.adult,
    children: myData.options.children,
    room: myData.options.room,
  });

  const handleSelect = (range) => {
    setDate(range.selection);
  };

  return (
    <>
      {item && (
        <>
          <Navbar />
          <div className="header-list">
            <HeaderList />
          </div>
          <div className="hotelContainer">
            <div className="hotel-price">
              <div>
                <h3
                  className="input-hotel"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {`${format(date.startDate, "dd/MM/yyy")}  to 
            ${format(date.endDate, "dd/MM/yyy")}`}
                </h3>
                <h3 className="day">{day} night</h3>
                {openDate && (
                  <DateRangePicker
                    editableDateInputs={true}
                    ranges={[date]}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    className="date-box-list"
                    onChange={handleSelect}
                  />
                )}
                <h3
                  className="input-hotel"
                  onClick={() => setOpenOptions(!openOptions)}
                >{`${options.adult} adults . ${options.children} children . ${options.room} room`}</h3>
                {openOptions && (
                  <div className="options options-hotel">
                    <OptionItem
                      name="adult"
                      options={options}
                      setOptions={setOptions}
                      minLimit={1}
                    />
                    <OptionItem
                      name="children"
                      options={options}
                      setOptions={setOptions}
                      minLimit={1}
                    />
                    <OptionItem
                      name="room"
                      options={options}
                      setOptions={setOptions}
                      minLimit={1}
                    />
                  </div>
                )}
                <h6 className="mx-auto text-gray-500 text-sm mt-1">
                  cancellation policy : {item.cancellation_policy}
                </h6>
                <div className="price-reserve">
                  <h1>
                    {item.price * day * options.room}${" "}
                    <span className="text-sm text-gray-500">({day} night)</span>
                  </h1>
                  <button>reserve</button>
                </div>
              </div>
            </div>
            <div className="hotel-ditail">
              <img src={item.picture_url.url} />
              <div className="name-hotel">
                <h1>{item.name}</h1>
                <div className="flex text-gray-600 text-sm">
                  <FaLocationDot className=" text-lg" />
                  <h2 className="mx-1">{item.street}</h2>
                </div>
              </div>
              <p className="amenities-text">Amenities</p>
              <div className="amenities-hotel ">
                <div className=" text-gray-600 grid grid-cols-3 gap-3 my-3">
                  <span>
                    <GiBathtub /> {item.bathrooms} bathrooms
                  </span>
                  <span>
                    <IoBed /> {item.bedrooms} bedrooms
                  </span>
                  <span>
                    <IoBed /> {item.beds} beds
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {item.amenities.map((result, index) => (
                    <span key={index}>{result}</span>
                  ))}
                </div>
              </div>
              <div className="description-text mb-6">
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
function OptionItem({ options, setOptions, name, minLimit }) {
  return (
    <div className="optionItem">
      <span className="optionText">{name}</span>
      <div className="optionCounter">
        <button
          onClick={() =>
            setOptions((prev) => {
              return { ...prev, name: prev[name]-- };
            })
          }
          className="optionCounterBtn"
          disabled={options[name] <= minLimit}
        >
          -
        </button>
        <span className="optionCounterNumber">{options[name]}</span>
        <button
          onClick={() =>
            setOptions((prev) => {
              return { ...prev, name: prev[name]++ };
            })
          }
          className="optionCounterBtn"
        >
          +
        </button>
      </div>
    </div>
  );
}
