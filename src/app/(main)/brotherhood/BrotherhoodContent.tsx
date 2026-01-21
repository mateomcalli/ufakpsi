import Image from "next/image";
import BigThree from "@/src/components/brotherhood/BigThree";
import TeamCardContent from "@/src/components/cards/TeamCardContent";

const BrotherhoodContent = () => {
  return (
    <section className="flex flex-col gap-4 pt-8 px-8 top-16 h-fit relative">
      <div className="font-crimson px-8">
        <h1 className="text-4xl">Brotherhood at Alpha Kappa Psi</h1>
        <h2 className="text-2xl text-lblue italic">Leadership, growth, and community.</h2>
      </div>

      <div className="relative w-full shrink-0 h-80">
        <Image 
          src="/eboard2526.jpg" 
          alt="Executive Board 25-26" 
          fill
          className="rounded-2xl object-cover"
        />
      </div>

      <BigThree/>
    
    </section>
  )
};

export default BrotherhoodContent