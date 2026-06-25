import Image from "next/image";

const DBCard = (props: {
  DBName : string;
  DBImage : string;
}) => {
  return (
    <a href={'/admin/' + props.DBName.toLowerCase().replace(/ /g, "_")} className="w-full h-full rounded-lg block">
      <div className="flex flex-col gap-3 w-full h-full justify-between bg-white border border-gray-400 rounded-lg p-3">
        <div className="relative rounded-lg h-full">
          <Image
            src={props.DBImage}
            alt='Database image'
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-center font-crimson text-3xl h-fit">{props.DBName}</p>
      </div>
    </a>
  )
}

export default DBCard