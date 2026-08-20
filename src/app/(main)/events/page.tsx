import EventsContent from "./EventsContent"

export const metadata = {
  title: 'Events | UF Alpha Kappa Psi',
  description: "See what UF Alpha Kappa Psi (UF AKPsi) has been up to in and out of Gainesville: from professional networking trips abroad to intramural sports and brotherhood events.",
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events | UF Alpha Kappa Psi',
    description: "See what our chapter has been up to in and out of Gainesville: from professional networking trips abroad to intramural sports and brotherhood events.",
    type: 'website',
  },
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Events = () => {
  return (
    <EventsContent />
  )
}

export default Events