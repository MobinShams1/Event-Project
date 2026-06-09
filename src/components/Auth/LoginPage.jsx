import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal.jsx";
import LoginForm from "./LoginForm";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api-http/http.js";
import { loginStart, loginSuccess, loginFailure } from '../../redux/authSlice.js'
import { useDispatch} from "react-redux";
import ErrorBlock from "../ErrorBlock.jsx";

function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      dispatch(loginSuccess(data.user));
      navigate('/events');
    },
    onMutate: () => {
      dispatch(loginStart);
    },
    onError: () => {
      dispatch(loginFailure(error.info?.message || 'Login failed!'));
    }
  });


  function handleSubmit(formData) {
    mutate({ user: formData });

  }



  return <Modal onClose={() => navigate('../')} >
    <LoginForm onSubmit={handleSubmit}>
      {isPending && <p>Submitting</p>}
      {!isPending && (<>
        <Link to="/signup" className="button-text">I have not a account</Link>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Login
        </button>
      </>)}


    </LoginForm>

    {isError && <ErrorBlock title='Failef to Login' message={error.info?.message || 'Failed to submit user ,please check your inputs and try again .'} />}
  </Modal>
}

export default LoginPage;