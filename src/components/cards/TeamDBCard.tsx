import Image from "next/image"
import Link from "next/link";

const TeamCard = (props: { id: number; image: string; teamName: string; }) => {
  return (
    <Link href={`/admin/teams/${props.id}`} className="w-full max-w-xs sm:w-80">
      <div className="flex flex-col gap-3 w-full h-64 justify-between bg-white border border-neutral-300 rounded-lg p-3">
        <div className="relative rounded-lg h-full">
          <Image
            src={props.image}
            alt='Database image'
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-center font-crimson text-2xl h-fit">{props.teamName}</p>
      </div>
    </Link>
  )
}

export default TeamCard