import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import SignupForm from "./SignupForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "../../api-http/http.js";
import ErrorBlock from "../ErrorBlock.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice.js";
function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: userSignup,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user))
      navigate('/events');
    }
  });

  function handleSubmit(formData) {
    mutate({ user: formData });
    console.log(formData.firstName);
    
  }

  return <Modal onClose={() => navigate('/events')}>
    <SignupForm onSubmit={handleSubmit}>
      {isPending && 'Submitting'}
      {!isPending && (<>
        <Link to='/login' className="button-text link-text">I have a account</Link>
        <Link to='/events' className="button-text">Close</Link>
        <button className="button" >Signup</button>
      </>)}


    </SignupForm>
    {isError && <ErrorBlock title='Failed signup ' message={error.info?.message || 'Failed to submit user ,please check your inputs and try again .'} />}
  </Modal>

}

export default SignupPage;