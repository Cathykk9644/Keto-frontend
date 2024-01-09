import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

import cart from "../Assets/cart.jpeg";
import { useNavigate } from "react-router-dom";

const Testimonial = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      id: 1,
      name: "Jane Wong",
      text: "The keto meals are not only super delicious, but they also fit perfectly into my diet plan. Highly recommended for anyone!",
      profileUrl:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXNpYW4lMjBnaXJsfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "John Smith",
      text: "I've tried various meal services, but this one stands out with its taste and nutritional balance. It's a game-changer for my busy lifestyle!",
      profileUrl:
        "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFwcHklMjBndXl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Emma Wilson",
      text: "Fantastic quality and variety! The meals are always fresh and full of flavor. It makes healthy eating so much easier for me.",
      profileUrl:
        "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGtpbmQlMjBnaXJsfGVufDB8fDB8fHww",
    },

    {
      id: 4,
      name: "Alex Chan",
      text: "Meal prep has always been a hassle for me, but with these prepped meals, I'm saving time and eating healthier than ever!",
      profileUrl:
        "https://plus.unsplash.com/premium_photo-1661774991416-ee14a1bc0d30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXNpYW4lMjBndXl8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <>
      <section className="w-full px-16 py-4 bg-bgColor1">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold capitalize text-textColor1 relative before:absolute before:rounded-lg before:content before:w-48 before:h-1.5 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-emerald-200 to-emerald-600 transition-all ease-in-out duration-100">
            Hear what they thought about us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="min-w-[360px] max-w-md bg-bgColor2 rounded-3xl shadow-lg p-6 m-2 ml-10 relative min-h-[220px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="text-emerald-400 text-2xl " />
              <p className="text-gray-500 mt-6 text-md">{testimonial.text}</p>
              <div className="flex justify-end">
                <FaQuoteRight className="text-emerald-400 text-2xl" />
              </div>
              <div className="absolute bottom-4 right-6 flex items-center">
                <img
                  src={testimonial.profileUrl}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="ml-2 text-xs text-gray-400 font-semibold -mb-4 italic">
                  {testimonial.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotion section starts here */}
      <section className="w-full px-16 py-4 bg-bgColor1">
        <div className="flex justify-between items-center mb-8">
          <p className="text-2xl font-semibold capitalize text-textColor1 relative before:absolute before:rounded-lg before:content before:w-32 before:h-1.5 before:-bottom-3 before:left-0 before:bg-gradient-to-tr from-emerald-200 to-emerald-600 transition-all ease-in-out duration-100">
            Come join us today
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 flex justify-center opacity-80">
            <img
              src={cart}
              alt="Promotion"
              className="w-[90%] h-auto object-cover rounded-full"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left p-8 mt-0">
            <h2 className="text-2xl font-bold text-gray-500 mb-8 -mt-12">
              Come join us now to enjoy special discounts up to 20% off!
            </h2>
            <p className="mb-8 text-gray-400 text-sm">
              Don't miss out on our exclusive offers. Sign up today and start
              saving on delicious, healthy keto meals.
            </p>
            <button
              className="px-8 py-3 text-white rounded-2xl transition-all hover:bg-emerald-700 bg-gradient-to-r from-emerald-300 to bg-emerald-600 hover:scale-95"
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
          </div>
        </div>{" "}
      </section>
    </>
  );
};

export default Testimonial;
