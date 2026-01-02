"use client"

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useMediaQuery } from "usehooks-ts"
import { useState, useEffect } from "react";

const Navbar = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const smOrSmaller = useMediaQuery('(max-width: 640px')

  // avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { return <MobileNavbar/> }

  return (
    <>{smOrSmaller ? <MobileNavbar/> : <DesktopNavbar/>}</>
  )
}

export default Navbar