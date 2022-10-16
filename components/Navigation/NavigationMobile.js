import React, { useContext, useState } from 'react';
import { motion } from "framer-motion"
import ShopContext from "../../context/shopContext";

const NavigationMobile = () => {
  const {menuOpen, setMenuOpen} = useContext(ShopContext);

  const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: '100%'},
  }

  const openMenuHandler = () => {
    return setMenuOpen(!menuOpen)
  }
  return (
    <div className={`relative flex justify-between items-center bg-gray-200 px-4 w-full h-navigation`}>
      <div>
        Logo
      </div>
      <button onClick={openMenuHandler}>MENU</button>
      <motion.aside
        className={`absolute top-full right-0 translate-x-full bg-gray-200 w-2/3 h-screen opacity-0 px-4`}
        animate={menuOpen ? "open" : "closed"}
        variants={variants}
        transition={{ ease: "linear" }}
      >
        <ul className={`flex flex-col gap-4 text-xl uppercase w-full`}>
          {/*<li className={`w-full`}>Link</li>*/}
        </ul>
      </motion.aside>
    </div>
  );
};

export default NavigationMobile;
