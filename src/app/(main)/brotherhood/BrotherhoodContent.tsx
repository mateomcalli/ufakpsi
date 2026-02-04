import Image from "next/image";
import BigThree from "@/src/components/brotherhood/BigThree";
import TeamSect from "@/src/components/brotherhood/TeamSect";

const BrotherhoodContent = () => {
  return (
    <section className="red flex flex-col gap-4 py-8 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto top-16 h-fit relative">
      <div className="px-0 sm:px-6">
        <h1 className="font-libre text-2xl md:text-3xl">Brotherhood at Alpha Kappa Psi</h1>
        <h2 className="font-crimson text-2xl text-lblue italic">Leadership, growth, and community.</h2>
      </div>

      <div className="relative w-full shrink-0 h-80">
        <Image 
          src="/eb_spr_2026.JPG" 
          alt="Executive Board 25-26" 
          fill
          className="rounded-2xl object-cover object-[30%_44%]"
        />
      </div>

      <div className="flex gap-4 flex-col">
        <div className="hidden lg:block">
          <BigThree/>
        </div>
        <div className="lg:hidden">
          <TeamSect
            teamId={1}
            caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
          />
        </div>
        <div className="lg:hidden">
          <TeamSect
            teamId={2}
            caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
          />
        </div>
        <div className="lg:hidden">
          <TeamSect
            teamId={3}
            caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
          />
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={4}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
        <TeamSect
          teamId={5}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={6}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
        <TeamSect
          teamId={7}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={8}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
        <TeamSect
          teamId={9}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={10}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
        <TeamSect
          teamId={11}
          caption="The membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
      </div>
    
    </section>
  )
};

export default BrotherhoodContent