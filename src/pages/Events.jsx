import Header from '../components/Header.jsx';
import EventsIntroSection from '../components/Events/EventsIntroSection.jsx';

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import NewEventsSection from '../components/Events/NewEventSection.jsx';
import FindEventSection from '../components/Events/FindEventSection.jsx';
import LoginAndSignUp from '../components/Auth/LoginAndSignup.jsx';
export default function Events() {
  return (
    <>
      <Header>
        <Link to="/events/new" className="button">
          New Event
        </Link>
        <LoginAndSignUp/>

      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
      <Outlet />

    </>
  );
}
