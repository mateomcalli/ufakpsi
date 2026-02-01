"use client"

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useMediaQuery } from "usehooks-ts"
import { useState, useEffect } from "react";

const Navbar = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const mdOrSmaller = useMediaQuery('(max-width: 1024px')

  // avoid hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { return <DesktopNavbar/> }

  return (
    <>{mdOrSmaller ? <MobileNavbar/> : <DesktopNavbar/>}</>
  )
}

export default Navbar