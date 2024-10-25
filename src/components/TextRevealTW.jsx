import React from 'react';

const TextRevealTW = () => {
  const text = "Spotify Playlist to Youtube ♬";

  return (
    <h1 className="overflow-hidden text-[3rem] font-bold leading-[5rem] text-white">
      {Array.from(text).map((char, index) => {
        let className = "";

        // Apply green color to "Spotify"
        if (index >= 0 && index <= 6) {
          className = "text-green-500"; // Green for "Spotify"
        }

        // Apply red color to "Youtube"
        if (index >= 19 && index <= 26) {
          className = "text-red-500"; // Red for "Youtube"
        }

        return (
          <span
            className={`animate-text-reveal inline-block [animation-fill-mode:backwards] ${className}`}
            key={`${char}-${index}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
};

export default TextRevealTW;
