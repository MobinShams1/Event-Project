import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Modal from '../components/Modal.jsx';
import EventForm from '../components/Events/EventForm.jsx';
import { createNewEvent, queryClient } from '../api-http/http.js';
import ErrorBlock from '../components/ErrorBlock.jsx';
import { useEffect } from 'react';
export default function NewEvent() {
  const navigate = useNavigate();

  

  const { mutate, isPending, isError, error } = useMutation({

    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate(formData);

  }

  return (
    <Modal onClose={() => navigate('/events')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (<>
          <Link to="/events" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)}

      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Failed to create event. Please check your inputs and try again later.'} />}
    </Modal>
  );
}
