import React, { useEffect, useState } from 'react';
import NavigationDesktop from './NavigationDesktop'
import NavigationMobile from './NavigationMobile'

const Navbar = () => {

  const [dimensions, setDimensions] = useState({
    height: null,
    width: null
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <nav className={`relative`}>
      {
        dimensions.width > 900 ? <NavigationDesktop/> : <NavigationMobile/>
      }
    </nav>
  );
};

export default Navbar;
