'use client'

import { useState } from "react";
import Image from "next/image"

const BrotherCard = (props: { 
  first_name : string; 
  last_name: string; 
  major : string; 
  headshot : string;
  college : string; 
  grad_year : number; 
  positions : string[];
  linkedin : string;
}) => {
  const [havePositions, setHavePositions] = useState<boolean>(true)

  const positionsString = () => {
    if (props.positions.length != 0) {
      let pString : string = "";
      for (let i : number = 0; i < props.positions.length; i++) {
        pString += props.positions[i];
        if (i + 1 != props.positions.length) pString += ", ";
      }
      return pString;
    }
    setHavePositions(false)
  }
  
  return (
    <a className="hover:cursor-pointer w-fit h-fit block rounded-lg" href={props.linkedin} target="_blank">
      <div className="flex gap-4 p-3 w-104 h-64 border border-neutral-300 rounded-lg hover:border-dblue/70 hover:shadow-[0_15px_25px_-5px_rgba(18,3,116,0.3)] transition-all duration-300 ease-in-out">
        <div className="relative shrink-0 rounded-lg w-36 h-full">
          <Image
            alt="Executive Board Member Headshot"
            src={props.headshot}
            fill
            className="rounded-lg object-cover"
            />
        </div>
        <div className="font-crimson w-full">
          <p className="text-2xl text-center">{props.first_name} {props.last_name}</p>
          <p className="text-lg/6">
            <u>Major:</u> {props.major}<br/>
            <u>College:</u> {props.college}<br/>
            <u>Grad Year:</u> {props.grad_year}<br/>
            {havePositions ? (<><u>Position(s):</u> {positionsString()}</>) : null}
          </p>
        </div>
      </div>
    </a>
  )
}

export default BrotherCard