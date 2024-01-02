import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MealRow from "./MealRow";
import { BACKEND_URL } from "../constants";
import { useEffect, useState, useRef } from "react";

const MealSection = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/meals`)
      .then((response) => {
        setMeals(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Add horizontal scrolling function for meals
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth / 2; // scroll half the width of the container
      const newScrollPosition =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div>Loading meals...</div>;
  }

  if (error) {
    return <div>Error fetching meals: {error}</div>;
  }

  return (
    <section className="w-full mt-20 px-16 py-4 bg-bgColor1">
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold capitalize relative text-textColor1 before:absolute before:rounded-lg before:content before:w-56 before:h-1.5 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-emerald-200 to-emerald-600 transition-all ease-in-out duration-100">
          Our top & healthy keto meal choices
        </p>
        {/* Arrow controls can be later implemented to scroll the meal cards */}

        <div className="hidden md:flex gap-3 items-center">
          {" "}
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="w-8 h-8 rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => handleScroll("left")}
          >
            <MdChevronLeft className="text-lg font-bold text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.8 }}
            className="w-8 h-8 rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => handleScroll("right")}
          >
            <MdChevronRight className="font-bold text-white" />
          </motion.div>
        </div>
      </div>

      {/* Scrollable container start */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto py-4 scrollbar-none"
      >
        {meals.map((meal, index) => (
          <div key={index} className="min-w-[140px] shrink-0">
            <MealRow meal={meal} flag={true} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MealSection;
