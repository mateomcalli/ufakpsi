import Image from "next/image";
import BigThree from "@/src/components/brotherhood/BigThree";
import TeamSect from "@/src/components/brotherhood/TeamSect";

const BrotherhoodContent = () => {
  return (
    <section className="flex flex-col gap-4 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto mt-24 h-fit relative">
      <div className="px-0 sm:px-4">
        <h1 className="font-merry text-2xl md:text-3xl">Brotherhood at Alpha Kappa Psi</h1>
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
            caption="The President's team enforces internal and external standards, and it serves as the top organizational layer of the fraternity."
          />
        </div>
        <div className="lg:hidden">
          <TeamSect
            teamId={2}
            caption="From internal communication to development with AI, the EVP's team handles the technical necessities that keep AKPsi moving."
          />
        </div>
        <div className="lg:hidden">
          <TeamSect
            teamId={3}
            caption="The Finance team is responsible for the chapter's spend and budget, among other critical financial processes for the fraternity."
          />
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={4}
          caption="The Membership team drives new member onboarding and development through mentorship, engagement, and building strong connections."
        />
        <TeamSect
          teamId={5}
          caption="The Professional Development team builds new member career readiness through resume development, workshops, and interview coaching."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={6}
          caption="The Alumni & External Affairs team leads recruitment strategy and operations, while building lasting relationships with alumni and graduating brothers."
        />
        <TeamSect
          teamId={7}
          caption="The Professional Activities team expands brother professional development through dedicated recruiter events, professional trips, and individualized career support."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={8}
          caption="The Public Relations team manages chapter brand strategy across Instagram, LinkedIn, and TikTok to ensure consistent messaging and representation."
        />
        <TeamSect
          teamId={9}
          caption="The Social Affairs team plans and oversees chapter social events and trips that promote connection and strengthen brotherhood."
        />
      </div>

      <div className="flex gap-4 flex-col lg:flex-row lg:items-start">
        <TeamSect
          teamId={10}
          caption="The Community Service team organizes volunteer initiatives, food drives, and community projects to serve the Gainesville community."
        />
        <TeamSect
          teamId={11}
          caption="The DEI team advances an inclusive chapter culture through internal education, external dialogue, and community engagement."
        />
      </div>
    
    </section>
  )
};

export default BrotherhoodContent