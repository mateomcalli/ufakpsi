import EventsContent from "./EventsContent"

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: "Our fraternity\'s events, ranging from NYC trips to intramurals.",
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Events = () => {
  return (
    <EventsContent/>
  )
}

export default Events