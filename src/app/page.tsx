import Image from "next/image";
import Landing from "../components/Landing"
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { LuScale } from "react-icons/lu";

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: 'Professional business fraternity at the University of Florida',
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Home = () => {

  return (
    <div className="pt-16 h-fit">
      <Landing/>

      <section className='relative bg-cream border-t rounded-t-[60px] border-t-gray-500 w-screen h-[200vh] z-10 shadow-[-5px_-20px_30px_-10px_rgba(0,0,0,0.3)]'>
        
        <div className='p-8 flex flex-col gap-8'>
          <h1 className="font-crimson self-center text-2xl">Who we are:</h1>
          <h2 className="font-crimson self-center text-3xl sm:text-4xl"><i>"Shaping people, shaping business."</i></h2>

          <div className="flex flex-col md:flex-row justify-center w-full h-fit md:gap-16">
            <div className="md:w-160 h-58 items-center flex my-4">
              <h3 className='text-center md:text-left font-crimson text-xl'>Founded in 1904, Alpha Kappa Psi has risen to become the number one professional <b>co-ed</b> business fraternity in the nation. With over 298,000 members at 219 different universities, our mission is clear: to develop our members into principled business leaders. With an extensive alumni network and professional resources all around the Heavener Business School and beyond, we foster growth, professional development, and lasting connections for members of <b>any major</b>.</h3>
            </div>

            <div className="flex flex-col h-58 my-4 items-center">
              <h3 className="text-dblue text-5xl font-crimson">150+</h3>
              <h3 className="font-crimson text-xl text-nowrap">active members</h3>
              <h3 className="text-dblue text-5xl font-crimson">32</h3>
              <h3 className="font-crimson text-xl text-nowrap">majors represented</h3>
              <h3 className="text-dblue text-5xl font-crimson">1000+</h3>
              <h3 className="font-crimson text-xl">alumni</h3>
            </div>
          </div>
        </div>

        <fieldset className="border rounded-xl border-dblue m-8 h-50 flex flex-row justify-between pt-4">
          <legend className="m-auto px-2 font-crimson text-2xl">Our core values</legend>
          <div className="flex red h-fit">
            <div className="flex flex-col h-fit">
              <MdOutlinePeopleAlt color={"#120374"} size={80}/>
              <p className="self-center font-crimson text-xl">Unity</p>
            </div>
            <div className="flex flex-col h-fit">
              <RiServiceLine color={"#120374"} size={80}/>
              <p className="self-center font-crimson text-xl">Service</p>
            </div>
            <div className="flex flex-col h-fit">
              <Image className="ml-3" src="/brotherhood.svg" alt='pillar' width={80} height={80}/>
              <p className="self-center font-crimson text-xl">Brotherhood</p>
            </div>
            <div className="flex flex-col h-fit px-1">
              <BsBook color={"#120374"} className="mt-1 ml-1.5" strokeWidth={0.2} size={76}/>
              <p className="self-center font-crimson text-xl">Knowledge</p>
            </div>
            <div className="flex flex-col h-fit">
              <LuScale color={"#120374"} strokeWidth={1.6} size={80}/>
              <p className="self-center font-crimson text-xl">Integrity</p>
            </div>
          </div>
        </fieldset>

      </section>
    </div>
  )
}

export default Home