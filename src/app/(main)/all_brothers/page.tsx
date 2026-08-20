import BrotherCard from "@/src/components/cards/BrotherCard";
import createClient from "@/lib/supabase/server";

export const metadata = {
  title: 'All Brothers | UF Alpha Kappa Psi',
  description: 'All of our Alpha Phi brothers in one place. Check out our LinkedIn profiles and filter by major or year.',
  alternates: {
    canonical: '/all_brothers',
  },
  openGraph: {
    title: 'Brothers | UF Alpha Kappa Psi',
    description: 'Meet the brothers of the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida. Filter by major or graduation year, and connect with us on LinkedIn.',
    type: 'website',
  },
  icons: {
    icon: '/akp_emblem.png',
  },
}

const AllBrothers = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('brothers').select().order('first_name', { ascending: true })

  if (error) {
    console.error(error);
    return
  }

  return (
    <div className="relative top-24 flex flex-col gap-8 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl pb-16">
      <h1 className="font-merry text-2xl md:text-3xl text-center">All Brothers</h1>
      <section className="flex flex-wrap gap-4 justify-center w-full">
        {data!.map((b, i) => {
          if (!b.persona) return (
            <BrotherCard
              key={i}
              first_name={b.first_name}
              last_name={b.last_name}
              major={b.major}
              headshot={b.headshot}
              college={b.college}
              grad_year={b.grad_year}
              positions={b.positions}
              linkedin={b.linkedin}
            />
        )})}
      </section>
    </div>
  )
};

export default AllBrothers