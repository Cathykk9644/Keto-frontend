import React, { useEffect, useState } from "react";
import Bg from "../Assets/Bg.png";
import Header from "./Header";
import Banner from "./Banner";
import MealSection from "./MealSection";
import CartContainer from "./CartContainer";
import { useStateValue } from "../context/StateProvider";
import Testimonial from "./Testimonial";

const HomeContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className="relative w-screen h-screen">
      <img src={Bg} alt="bg-img" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full">
        <Header />
        <Banner />
        <MealSection />
        <Testimonial />
        {cartShow && <CartContainer />}
      </div>
    </div>
  );
};

export default HomeContainer;
