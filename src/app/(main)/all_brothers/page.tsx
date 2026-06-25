import BrotherCard from "@/src/components/cards/BrotherCard";
import createClient from "@/lib/supabase/server";

export const metadata = {
  title: 'UF Alpha Kappa Psi',
  description: 'All of our Alpha Phi brothers in one place. Check out our LinkedIn profiles and filter by major or year.',
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
    <div className="relative top-24 flex flex-col gap-8">
      <h1 className="font-merry text-2xl md:text-3xl text-center">All Brothers</h1>
      <section className="flex flex-col w-full px-4 items-center min-[910px]:grid min-[910px]:grid-cols-2 min-[910px]:w-fit min-[910px]:px-0 min-[910px]:mx-auto min-[910px]:items-stretch min-[1350px]:grid-cols-3 min-[1780px]:grid-cols-4 gap-4">
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