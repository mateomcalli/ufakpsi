import BrotherCard from "@/src/components/cards/BrotherCard";
import createClient from "@/lib/supabase/server";

export const metadata = {
  title: 'AllBrothers',
  description: 'List of all brothers in the fraternity.',
  icons: {
    icon: '/akp_emblem.png',
  },
}

const AllBrothers = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('brothers').select()

  if (error != null) console.error(error);

  data!.map(brother => (
    console.log(brother)
  ))

  return (
    <section className="relative top-16 flex">
      {data!.map((b, i) => (
        <BrotherCard
          key={i}
          first_name={b.first_name}
          last_name={b.last_name}
          major={b.major}
          college={b.college}
          grad_year={b.grad_year}
          positions={b.positions}
          linkedin={b.linkedin}
        />
      ))}
    </section>
  )
};

export default AllBrothers