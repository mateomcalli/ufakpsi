import EventsContent from "./EventsContent"

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: "Our fraternity\'s events, from NYC trips to intramurals and everything in between!",
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