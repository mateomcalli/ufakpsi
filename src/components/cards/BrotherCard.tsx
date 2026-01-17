import Image from "next/image"

const BrotherCard = (props: { 
  first_name : string; 
  last_name: string; 
  major : string; 
  college : string; 
  grad_year : number; 
  positions : string[];
  linkedin : string;
}) => {
  const positionsString = () => {
    if (props.positions != null) {
      let pString : string = "";
      for (let i : number = 0; i < props.positions.length; i++) {
        pString += props.positions[i];
        if (i + 1 != props.positions.length) pString += ", ";
      }
      return pString;
    }
    return 'NPH';
  }
  
  return (
    <a className="hover:cursor-pointer w-fit h-fit block rounded-lg" href={props.linkedin} target="_blank">
      <div className="flex flex-col gap-1 p-3 w-72 h-100 border border-gray-400 rounded-lg hover:bg-dblue/20 transition-colors duration-300 ease-in-out">
        <div className="relative shrink-0 rounded-lg w-full h-48">
          <Image
            alt="Executive Board Member Headshot"
            src="/good3316.jpg"
            fill
            className="rounded-lg object-cover"
            />
        </div>
        <div className="font-crimson w-full">
          <p className="text-2xl text-center">{props.first_name} {props.last_name}</p>
          <p className="text-lg/6"><u>Major:</u> {props.major}<br/><u>College:</u> {props.college}<br/><u>Grad Year:</u> {props.grad_year}<br/><u>Position(s):</u> {positionsString()}</p>
        </div>
      </div>
    </a>
  )
}

export default BrotherCard