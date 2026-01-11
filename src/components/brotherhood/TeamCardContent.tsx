import Image from "next/image";

const TeamCardContent = (props: {
  teamName: string; 
  caption: string;
  imageString: string; 
  border: boolean;
  execName: string;
  execTitle: string;
}) => {
  return (
    <div className={`flex flex-col flex-1 px-4 ${props.border ? `border-r border-black` : ``}`}>
      <p className="font-crimson text-xl font-semibold">{props.teamName}</p>
      <p className="font-crimson text-lg">{props.caption}</p>
      <div className="items-center flex gap-4 w-full h-24 mt-auto">
        <div className="relative shrink-0 rounded-full border border-black w-24 h-24">
          <Image
            alt="Executive Board Member Headshot"
            src={props.imageString}
            fill
            className="rounded-full object-cover"
            />
        </div>
        <div className="flex flex-col h-fit">
          <p className="font-crimson text-xl font-semibold">{props.execName}</p>
          <p className="font-crimson text-lg">{props.execTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default TeamCardContent