type ServiceEvent = {
  title: string;
  pics: string;
  caption: string;
}

const ServiceCard = ({ title, pics, caption } : ServiceEvent) => {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg h-64 border border-neutral-300">
      <p className="font-merry text-xl">{title}</p>
      <p className="font-sans text-base/6">{caption}</p>
    </div>
  )
}

export default ServiceCard