import React, { useEffect, useState } from "react";
import Featured from "../../Components/Featured/Featured";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import PropertyList from "../../Components/PropertyList/PropertyList";
import { useData } from "../../Components/useData";
import "./Home.css";

function Home() {
  const data = useData();
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer mb-8">
        <Featured data={data} />
        <h1 className="homeTitle mt-4">Browse by property type</h1>
        <PropertyList data={data.slice(0, 5)} />
        <h1 className="homeTitle mt-3"> Homes guests love</h1>
        <PropertyList data={data.slice(5, 10)} />
      </div>
    </div>
  );
}

export default Home;
