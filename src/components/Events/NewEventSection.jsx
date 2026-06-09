import {useQuery} from '@tanstack/react-query';
import LoadingIndicator from '../LoadingIndicator.jsx';
import ErrorBlock from '../ErrorBlock.jsx';
import EventItem from '../Events/EventItem.jsx';
import { fetchEvents } from '../../api-http/http.js';
export default function NewEventsSection() {
 
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}),
    staleTime: 5000,
    // gcTime: 1000
  });

    

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || ''} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
