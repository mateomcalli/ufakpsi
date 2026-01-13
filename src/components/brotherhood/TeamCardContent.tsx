
import { motion } from "framer-motion";
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
      <p className="font-crimson text-xl font-semibold pl-2">{props.teamName}</p>
      <p className="font-crimson text-lg pl-2">{props.caption}</p>
      <motion.div 
        className="bg-cream hover:bg-[#dddddd] transition-colors ease-in-out duration-100 rounded-xl flex items-center gap-4 p-2 w-fit mt-auto"
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 10, y: -10 }}
        transition={{ duration: 0.1 }}
      >
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
      </motion.div>
    </div>
  )
}

export default TeamCardContent