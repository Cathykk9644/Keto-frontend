import React from "react";
import Bg from "../Assets/Bg.png";
import Header from "./Header";
import Banner from "./Banner";
import MealSection from "./MealSection";

const HomeContainer = () => {
  return (
    <div className="relative w-screen h-screen">
      <img src={Bg} alt="bg-img" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full">
        <Header />
        <Banner />
        <MealSection />
      </div>
    </div>
  );
};

export default HomeContainer;
