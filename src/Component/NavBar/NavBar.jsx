import React from "react";
import Logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <>
      <div className="flex w-[80%] mx-auto items-center h-[15vh]">
        <a href="https://imaginary-realms.in" target="_blank">
          <img src={Logo} alt="CodeWithAbdur" className="w-[15rem] hover:grayscale-0 grayscale transition-all duration-300" />
        </a>
      </div>
    </>
  );
};

export default NavBar;
