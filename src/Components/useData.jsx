import React, { useEffect, useState } from "react";
export function useData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getLocationList() {
      const res = await fetch("http://localhost:5000/hotels");
      const data = await res.json();
      setData(data);
    }
    getLocationList();
  }, []);
  return data;
}
