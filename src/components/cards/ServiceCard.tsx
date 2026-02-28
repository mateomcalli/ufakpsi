type ServiceEvent = {
  title: string;
  pics: string;
}

const ServiceCard = ({ title, pics } : ServiceEvent) => {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg h-64 border border-gray-400">
      <p className="font-libre text-xl">{title}</p>
      <p className="font-crimson text-lg/6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus massa in tellus efficitur elementum. Aliquam erat volutpat. Ut purus quam, molestie a ultricies a, blandit vel turpis. Nulla dictum augue nulla, eget mollis dolor venenatis a.</p>
    </div>
  )
}

export default ServiceCard