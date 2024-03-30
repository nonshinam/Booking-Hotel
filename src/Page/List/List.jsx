import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderList from "../../Components/Header/HeaderList";
import Navbar from "../../Components/Navbar/Navbar";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "./List.css";
import Item from "../../Components/Item/Item";
import { useData } from "../../Components/useData";

function List() {
  const allData = useData();
  const location = useLocation();
  console.log(location);
  const [data, setData] = useState(location.state.searchResults);
  const [result, setResult] = useState([]);
  const [alert, setAlert] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    startDate: location.state.date.startDate,
    endDate: location.state.date.endDate,
    key: location.state.date.key,
  });
  const [searchInput, setSearchInput] = useState(location.state.searchInput);
  const handleSelect = (range) => {
    setDate(range.selection);
  };
  const [options, setOptions] = useState({
    adult: location.state.options.adult,
    children: location.state.options.children,
    room: location.state.options.room,
  });
  const changeHandler = (event) => {
    setSearchInput(event);
    const searchResult = allData
      .slice()
      .filter((result) =>
        (
          result.smart_location.toLocaleLowerCase() ||
          result.neighbourhood.toLocaleLowerCase()
        ).includes(event.toLocaleLowerCase())
      );
    if (searchResult) {
      setResult(searchResult);
    }
  };
  const searchHandler = () => {
    if (!result.length) {
      setSearchInput("");
      setAlert(true);
    } else {
      setData(result);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="header-list">
        <HeaderList />
      </div>
      <div className="listContainer">
        <div>
          <div className="list-item-search">
            <h2 className=" font-bold">Search</h2>
            <div className="list-item-right">
              <p className="list-item-title">Destination</p>
              <input
                name="text"
                placeholder={`${
                  alert
                    ? "please enter the correct location"
                    : "where are you going?"
                }`}
                className={`input-list ${alert ? "searchAlert" : ""}`}
                value={searchInput}
                onChange={(event) => changeHandler(event.target.value)}
              />
            </div>
            <div className="list-item-right">
              <p className="list-item-title">Check-in Date</p>
              <h3 className="date-list" onClick={() => setOpenDate(!openDate)}>
                {`${format(date.startDate, "dd/MM/yyy")}  to 
            ${format(date.endDate, "dd/MM/yyy")}`}
              </h3>
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
            </div>

            <div className="options-list" onClick={() => setOpenDate(false)}>
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
                minLimit={0}
              />
              <OptionItem
                name="room"
                options={options}
                setOptions={setOptions}
                minLimit={1}
              />
            </div>
            <button
              onClick={() => {
                setOpenDate(false);
                searchHandler();
              }}
              className="list-item-button"
            >
              search
            </button>
          </div>
        </div>
        <div className="list-items">
          {data.reverse().map((result) => {
            return <Item key={result.id} {...result} date={date} options={options} />;
          })}
        </div>
      </div>
    </div>
  );
}
function OptionItem({ options, setOptions, name, minLimit }) {
  return (
    <div className="list-option-items">
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
export default List;
