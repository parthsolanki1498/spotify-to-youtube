import React, { useState } from "react";
import { motion } from "framer-motion";
import spotifyLogo from "../img/spotify_logo.png"; // Spotify logo
import youtubeLogo from "../img/youtube_logo.png"; // YouTube logo

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  const bg = {
    hover: {
      left: "2rem",
    },
    initial: {
      left: "19rem",
      top: "-10rem",
    },
  };
  const musicPlayer = {
    hover: {
      left: "295px",
    },
    initial: {
      left: "235px",
    },
  };
  const rect = {
    hover: {
      left: "11rem",
    },
    initial: {
      left: "13rem",
    },
  };
  const heart = {
    hover: {
      left: "9rem",
    },
    initial: {
      left: "12.5rem",
    },
  };

  // Function to change logo during hover
  const handleHover = () => {
    setIsHovered(true); // Switch to YouTube logo immediately on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Reset back to Spotify logo immediately on mouse leave
  };

  return (
    <div className="relative w-screen h-screen bg-[#081730]">
      <div className="wrapper flex items-center justify-between px-[5rem] w-[100%] h-[35rem] relative z-10">
        {/* left side */}
        <div className="headings flex flex-col items-start justify-center h-[100%] text-[3rem]">
          <span>Experience The</span>
          <span>
            <b>Best Quality Music</b>
          </span>

          <span className="text-[15px] text-[#525D6E">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            Magni sequi culpa officiis beatae corporis.
          </span>
        </div>

        {/* right side */}
        <div className="images relative w-[50%]">
          {/* Spotify/YouTube logo switch */}
          <motion.img
            variants={bg}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 1, type: "ease-out" }}
            src={isHovered ? youtubeLogo : spotifyLogo} // Instant logo switch
            alt="logo"
            className="absolute w-[50%] top-[-10rem] left-[19rem]"
          />

          {/* Main phone image */}
          <motion.img
            src={require("../img/p 1.png")}
            alt="phone"
            className="absolute top-[-15rem] h-[34rem] left-[13rem]"
            onMouseEnter={handleHover} // Trigger hover effect
            onMouseLeave={handleMouseLeave} // Reset on mouse leave
          />

          {/* Music player and other UI elements */}
          <motion.img
            variants={musicPlayer}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 1, type: "ease-out" }}
            src={require("../img/p 2.png")}
            alt="music player"
            className="absolute left-[235px] top-[94px] w-[175px]"
          />
          <motion.img
            variants={rect}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 1, type: "ease-out" }}
            src={require("../img/p 3.png")}
            alt="rect"
            className="absolute w-[5rem] left-[13rem] top-[12rem]"
          />
          <motion.img
            variants={heart}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 1, type: "ease-out" }}
            src={require("../img/p 4.png")}
            alt="heart"
            className="absolute w-[5rem] left-[12.5rem] top-[12rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
