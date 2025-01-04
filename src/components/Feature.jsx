import {React, useState} from "react";
import { motion } from "framer-motion";
import VisibilitySensor from "react-visibility-sensor";

function Feature({ icon, title, description }) {
    const variant = {
      true: {
        transform: "scale(1)",
      },
      false: {
        transform: "scale(0.5)",
      },
    };
    const [elementIsVisible, setElementIsVisible] = useState(false);
  
    return (
      <VisibilitySensor
        onChange={(isVisible) => setElementIsVisible(isVisible)}
      >
        <div className="feature flex items-center justify-center flex-col relative text-center mx-12 bg-[#1F2A44] p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 w-full max-w-[300px] h-[400px]">
          {/* icon */}
          <motion.div
            variants={variant}
            transition={{
              duration: 1,
              type: "ease-out",
            }}
            animate={`${elementIsVisible}`}
            className="icon bg-[#081730] rounded-2xl p-4 mb-6"
          >
            <img
              src={require(`../img/${icon}.png`)}
              alt=""
              className="w-[3rem]"
            />
          </motion.div>
  
          <span className="mt-5 font-bold text-white text-xl">{title}</span>
  
          {/* Dynamic description */}
          <span className="text-white mt-4 text-sm">{description}</span>
  
          {/* <span className="text-[#E600FF] underline mt-[3rem] hover:cursor-pointer">
            Learn more
          </span> */}
        </div>
      </VisibilitySensor>
    );
  }
  
  export default Feature;
  