import Image from "next/image";

const TeamContent = (props: {
  teamName: string; 
  caption: string;
  imageString: string; 
  border: boolean; 
}) => {
  return (
    <div className={`flex flex-col flex-1 px-4 ${props.border ? `border-r border-black` : ``}`}>
      <p className="font-crimson text-xl font-semibold">{props.teamName}</p>
      <p className="font-crimson text-lg">{props.caption}</p>
      <div className="w-full h-24 mt-auto">
        <div className="relative rounded-full border border-black w-24 h-24">
          <Image
            alt="Executive Board Member Headshot"
            src={props.imageString}
            fill
            className="rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default TeamContent