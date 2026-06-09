import { useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '../components/Header.jsx';
import { fetchEvent, deleteEvent, queryClient } from '../api-http/http.js';
import ErrorBlock from '../components/ErrorBlock.jsx';
import Modal from '../components/Modal.jsx';
import { useSelector } from 'react-redux';

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });

  const isCreator = data ? user?.username === data?.username : false;

  const { mutate, isPending: isPendingDeletion, isError: isErrorDeleting, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  });

  function handleStartDelete() {
    setShowDeleteModal(true);
  }

  function handleStopDelete() {
    setShowDeleteModal(false);
  }

  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id='event-details-content' className='center'>
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id='event-details-content' className='center'>
        <ErrorBlock 
          title="Failed to load event" 
          message={error.info?.message || "Failed to load event. Please try again later."} 
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
           
            {isCreator && (
              <>
                <button onClick={handleStartDelete}>Delete</button>
                <Link to="edit">Edit</Link>
              </>
            )}
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`${data.date}T${data.time}`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
            <p id="event-details-creator">
              Created by: <strong>{data.username || 'Unknown'}</strong>
              {isCreator && <span className="creator-badge"> (You)</span>}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showDeleteModal && (
        <Modal onClose={handleStopDelete}>
          <p>Are you sure?</p>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                <button onClick={handleDelete} className='button'>Delete</button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock 
              title="Failed to delete event" 
              message={deleteError.info?.message || 'Failed to delete event. Please try again later.'} 
            />
          )}
        </Modal>
      )}
      
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}