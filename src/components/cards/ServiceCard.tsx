type ServiceEvent = {
  title: string;
  pics: string;
  caption: string;
}

const ServiceCard = ({ title, pics, caption } : ServiceEvent) => {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg h-64 border border-gray-400">
      <p className="font-merry text-xl">{title}</p>
      <p className="font-crimson text-lg/6">{caption}</p>
    </div>
  )
}

export default ServiceCard