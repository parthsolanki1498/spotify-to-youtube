import React from "react";
import Feature from "./Feature";

function Experience() {
  return (
    <div className="experience flex flex-col items-center justify-center px-[5rem] bg-[#081730] h-screen relative z-[2]">
      {/* title icon */}
      <img src={require("../img/Path 318.png")} alt="" className="w-[5rem]" />
      
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem] text-white">
        <span>How it works?</span>
        <span>
          <b>In mere 3 simple steps</b>
        </span>
      </div>
      
      {/* features */}
      <div className="feature flex items-center justify-around mt-[6rem] w-[100%] space-x-6">
        <Feature
          icon="Group 2"
          title="Connect your Accounts"
          description="Easily link your Spotify and YouTube accounts with secure and encrypted login. Your data privacy is our priority."
        />
        <Feature
          icon="music icon"
          title="Select your Playlist"
          description="Pick any playlist from your Spotify library to transfer. Choose your favorites with just a click."
        />
        <Feature
          icon="Group 4"
          title="Transfer and Enjoy"
          description="Sit back and relax while we create your playlist on YouTube. Music migration made simple!"
        />
      </div>
    </div>
  );
}

export default Experience;
