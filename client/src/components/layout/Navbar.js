import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center px-4 pt-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link
            to="/"
            className="block text-2xl font-black md:hidden lg:block "
          >
            <span className="text-black transition duration-200 ease-in-out ">
              App
            </span>
          </Link>
          <Link
            to="/"
            className="hidden text-3xl font-black md:block lg:hidden"
          >
            <span className="text-black transition duration-200 ease-in-out ">
              App
            </span>
          </Link>
        </div>
        <div className="hidden md:flex justify-between items-center text-lg md:text-base font-medium text-black">
          <Link
            to="/"
            className="block mf px-4 rounded-full transition duration-200 ease-in-out sm:inline-block "
          >
            Home{" "}
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            to="/login"
            className="flex hc items-center py-3 px-8 w-auto text-base font-semibold leading-snug bg-black rounded-full transition ease-in-out duration-200 text-white hh ff t"
          >
            Sign In
          </Link>
        </div>
        <div className="block md:hidden">
          <button className="hg gi nh sc transition fj ease-in-out xi yi ub  ff">
            <span className="block gg kg ng w-full rc rounded-full ef transition duration-200 ease-in-out xi yi k q"></span>
            <span className="block gg ng og w-full rc rounded-full ef transition duration-200 ease-in-out xi yi k q"></span>
            <span className="block gg ng og w-full rc rounded-full ef transition duration-200 ease-in-out xi yi k q"></span>
            <span className="block gg ng pg w-full rc rounded-full ef transition duration-200 ease-in-out xi yi k q"></span>
          </button>
          <div className="hidden gg kg ng fi hc items-center bi id v ab eb">
            <div className="flex bc jc items-center jf mx-auto i w-full text-lg">
              <a
                href="index.html"
                className="block nf sf font-medium rounded-full transition duration-200 ease-in-out text-white  sm:inline-block"
              >
                Home{" "}
              </a>

              <a
                className="flex hc items-center pf px-8 w-auto md font-semibold leading-snug bg-white rounded-full transition ease-in-out duration-200 text-gray-900 hh ff s"
                href="contact.html"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
