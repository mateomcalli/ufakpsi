'use client'

import Image from "next/image"

const BrotherCard = (props: { 
  first_name: string
  last_name: string
  major: string
  headshot: string
  college: string
  grad_year: number
  positions: string[]
  linkedin: string
}) => {

  const havePositions = props.positions && props.positions.length > 0;
  const manyPositions = props.positions && props.positions.length >= 5;
  const positionsString = props.positions && props.positions.length > 0
    ? manyPositions
      ? props.positions.slice(0, 3).join(", ") + ", and more..."
      : props.positions.join(", ")
    : "";
  
  return (
    <a className="hover:cursor-pointer w-fit h-fit block rounded-lg" href={props.linkedin} target="_blank">
      <div className="flex gap-4 p-3 w-96 sm:w-104 h-64 border border-neutral-300 rounded-lg hover:border-dblue/70 hover:shadow-[0_15px_25px_-5px_rgba(18,3,116,0.3)] transition-all duration-300 ease-in-out">
        <div className="relative shrink-0 rounded-lg w-36 h-full">
          <Image
            alt="Executive Board Member Headshot"
            src={props.headshot}
            fill
            sizes="144px"
            className="rounded-lg object-cover"
            />
        </div>
        <div className="font-crimson w-full">
          <p className="text-xl sm:text-2xl text-center">{props.first_name} {props.last_name}</p>
          <p className="text-base sm:text-lg/6">
            <span className="underline font-sans text-sm font-bold uppercase tracking-wider text-[#6e6d6d]">Major:</span> {props.major}<br/>
            <span className="underline font-sans text-sm font-bold uppercase tracking-wider text-[#6e6d6d]">College:</span> {props.college}<br/>
            <span className="underline font-sans text-sm font-bold uppercase tracking-wider text-[#6e6d6d]">Grad Year:</span> {props.grad_year}<br/>
            {havePositions ? (
              <span>
                <span className="pr-1 underline font-sans text-sm font-bold uppercase tracking-wider text-[#6e6d6d]">Position(s):</span>
                {positionsString}
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </a>
  )
}

export default BrotherCard