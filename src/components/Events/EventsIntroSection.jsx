import meetupImg from '../../assets/meetup.jpg';
import { Link } from 'react-router-dom';
export default function EventsIntroSection() {
  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on Event!</p>
    </section>
  );
}
