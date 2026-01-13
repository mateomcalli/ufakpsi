import createClient from "@/lib/supabase/server"

const Admin = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('brothers').select()

  if (error != null) console.error(error);

  data!.map(brother => (
    console.log(brother)
  ))

  const BrotherLi = (props: {
    first_name: string;
    last_name: string;
    major: string;
    college: string;
  }) => {
    return (
      <div className="flex items-center h-10 w-full px-4 font-crimson text-xl hover:bg-gray-100 transition duration-300 ease-in-out rounded-xl gap-80">
        <p>{props.first_name} {props.last_name}</p>
        <p>{props.major}</p>
        <p>{props.college}</p>
      </div>
    )
  }

  return (
    <div className="red relative flex flex-col gap-16 pt-8 top-16">
      <div className="m-auto w-7xl h-40 bg-white border border-gray-300 rounded-xl">

      </div>
      <div className="m-auto w-7xl h-160 bg-white border border-gray-300 rounded-xl">
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
  )
}

export default Admin