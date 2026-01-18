import createClient from "@/lib/supabase/server"
import AddMenu from "@/src/components/admin/AddMenu"
import { redirect } from 'next/navigation'

const Admin = async () => {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  const { data, error } = await supabase.from('brothers').select()

  if (error != null) console.error(error);

  const BrotherLi = (props: {
    first_name: string;
    last_name: string;
    major: string;
    college: string;
  }) => {
    return (
      <div className="flex justify-between text-nowrap items-center h-10 w-full px-4 font-crimson text-xl hover:bg-gray-100 transition duration-300 ease-in-out rounded-xl">
        <p>{props.first_name} {props.last_name}</p>
        <p>{props.major}</p>
        <p>{props.college}</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex flex-col gap-16 pt-8 top-16">
        <div className="flex p-4 flex-col m-auto w-6xl h-40 bg-white border border-gray-300 rounded-xl">
          <div className="flex gap-4">
            <div className="flex items-center w-3/4 h-12 border border-gray-300 rounded-lg">
              <p className="text-gray-500 font-crimson text-xl pl-4">Search for a brother...</p>
            </div>
            <AddMenu/>
          </div>
        </div>
        <div className="m-auto w-6xl h-160 bg-white border border-gray-300 rounded-xl">
          <div className="w-full h-full px-4 py-2">
            {data!.map((brother, i)=> (
              <BrotherLi
                key={i}
                first_name={brother.first_name}
                last_name={brother.last_name}
                major={brother.major}
                college={brother.college}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div></div>
    </>
  )
}

export default Admin