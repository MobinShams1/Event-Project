import { Link, redirect, useNavigate, useParams, useSubmit, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../components/Modal.jsx';
import EventForm from '../components/Events/EventForm.jsx';
import { fetchEvent, queryClient, updateEvent } from '../api-http/http.js';
import ErrorBlock from '../components/ErrorBlock.jsx';
import {useSelector} from 'react-redux';
export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useNavigation();
  const submit = useSubmit();
  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000
  });

  const {user} = useSelector((state) => state.auth);

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });

  //     const previousEvent = queryClient.getQueryData(['events', params.id]);

  //     queryClient.setQueryData(['events', params.id], newEvent);

  //     return { previousEvent }

  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   }

  // });

  const isCreator = user?.username === data?.username;

  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' });


  }

  function handleClose() {
    navigate('../');
  }

  if (!isCreator) {
    <Modal onClose={() => navigate('/events')}>
      <ErrorBlock 
          title="Access Denied" 
          message="You do not have permission to edit this event. Only the creator can edit it." 
        />
    </Modal>
  }


  let content;




  if (isError) {
    content = <>
      <ErrorBlock title="Failed to load Event." message={error.info?.message || "Failed to load event. please check your inputs and try again later . "} />
      <div className='form-actions'>
        <Link to="../" className='button'>Okay</Link>
      </div>
    </>
  }

  if (data) {
    content = <><EventForm inputData={data} onSubmit={handleSubmit}>
      {state === 'submitting' ? <p>Sending data...</p> : <>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </>}

    </EventForm></>
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['event']);
  return redirect('../');
}