import { useState, useEffect } from "react";
import { useData } from "../useData";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import HeaderList from "./HeaderList";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const data = useData();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (range) => {
    setDate(range.selection);
  };
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const changeHandler = (event) => {
    setSearchInput(event);
    const searchResult = data.filter((result) =>
      result.smart_location
        .toLocaleLowerCase()
        .includes(event.toLocaleLowerCase())
    );
    setSearchResults(searchResult);
  };
  const searchHandler = () => {
    if (searchInput) {
      if (searchResults.length) {
        navigate("/hotels", {
          state: { searchInput, searchResults, date, options },
        });
      } else {
        setSearchInput("");
        setAlert(true);
      }
    } else {
      navigate("/hotels", {
        state: { searchInput, searchResults: data, date, options },
      });
    }
  };
  return (
    <>
      <div className="header relative">
        <div className="headerContainer">
          <HeaderList />
          <div className=" my-16">
            <h1 className="headerTitle text-2xl font-bold">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant saving of 10% or
            </p>
            <button className="headBtn">Sign in / Register</button>
          </div>
        </div>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              onChange={(event) => changeHandler(event.target.value)}
              name="text"
              placeholder={`${
                alert
                  ? "please enter the correct location"
                  : "where are you going?"
              }`}
              className={`headerSearchInput ${
                alert ? "headerSearchAlert" : ""
              }`}
              value={searchInput}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              className="headerSearchText"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date.startDate, "dd/MM/yyy")}  to 
            ${format(date.endDate, "dd/MM/yyy")}`}
            </span>
            {openDate && (
              <DateRangePicker
                editableDateInputs={true}
                ranges={[date]}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                className="date"
                onChange={handleSelect}
              />
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              className="headerSearchText"
              onClick={() => setOpenOptions(!openOptions)}
            >{`${options.adult} adults . ${options.children} children . ${options.room} room`}</span>
            {openOptions && (
              <div className="options">
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
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={searchHandler}>
              search
            </button>
          </div>
        </div>
      </div>
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
