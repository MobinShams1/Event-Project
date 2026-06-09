import Header from '../components/Header.jsx';
import EventsIntroSection from '../components/Events/EventsIntroSection.jsx';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export default function Events() {
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
       

      </Header>
      <main>
        <EventsIntroSection />
        
      </main>
    </>
  );
}
