import React from "react";

function Team() {
  return (
    <div className="team flex flex-col items-center justify-center bg-[#081730] h-screen px-[3rem] pt-16">
      {/* Title Icon */}
      <img
        src={require("../img/Path 318.png")}
        alt="Icon"
        className="w-[5rem] mb-6"
      />
      
      {/* Heading */}
      <div className="headline text-center text-white text-[2rem] mb-6 z-10">
        <span>Meet the Team</span>
        <div>
          <b>Our Experts Behind the Scenes</b>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="team-members grid grid-cols-3 gap-5 w-full">
        {/* Team Member 1 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 1"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">John Doe</h3>
          <p className="text-[#E600FF]">CEO</p>
          <p className="text-[#707070] mt-4">
            John leads the team with his expertise in business strategy and vision.
          </p>
        </div>

        {/* Team Member 2 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 2"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">Jane Smith</h3>
          <p className="text-[#E600FF]">CTO</p>
          <p className="text-[#707070] mt-4">
            Jane is the technical mastermind behind our innovative platform and tech solutions.
          </p>
        </div>

        {/* Team Member 3 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 3"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">Alice Johnson</h3>
          <p className="text-[#E600FF]">COO</p>
          <p className="text-[#707070] mt-4">
            Alice ensures the smooth operations of the company, keeping everything running efficiently.
          </p>
        </div>

        {/* Team Member 4 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 4"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">Bob Martin</h3>
          <p className="text-[#E600FF]">CFO</p>
          <p className="text-[#707070] mt-4">
            Bob manages the company's finances, ensuring sustainability and growth in the long term.
          </p>
        </div>

        {/* Team Member 5 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 5"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">Sara Lee</h3>
          <p className="text-[#E600FF]">Marketing Head</p>
          <p className="text-[#707070] mt-4">
            Sara leads our marketing campaigns, helping to create an influential brand presence.
          </p>
        </div>

        {/* Team Member 6 */}
        <div className="team-member text-center bg-[#020917] p-6 rounded-lg shadow-lg">
          <img
            src={require("../img/Mask Group 23.png")}
            alt="Team Member 6"
            className="w-[150px] h-[150px] rounded-full mx-auto"
          />
          <h3 className="mt-4 text-[1.5rem] text-white">David Brown</h3>
          <p className="text-[#E600FF]">Product Manager</p>
          <p className="text-[#707070] mt-4">
            David ensures our product vision aligns with user needs and company goals, driving innovation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
