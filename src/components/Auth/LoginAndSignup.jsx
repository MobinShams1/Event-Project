import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUserFromStorage } from "../../redux/authSlice";
function LoginAndSignUp() {

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  let content;

  function handleLogout() {

    dispatch(logout());
    dispatch(setUserFromStorage());
    navigate('/events');
  }

  if (isLoggedIn) {
    content = (
      <>
        {isLoading && <p>Loading ...</p>} {!isLoading && <>
          <span id="header-title">{user.firstName + user.lastName}</span>
          <button className="button" onClick={handleLogout}>Logout</button></>}
      </>
    );
  }



  if (!isLoggedIn) {
    content = <>
      <Link className="button" to='/login'>Login</Link>
      <Link className="button" to="/signup">Sign Up</Link>
    </>
  }

  return <div className="login-signup">
    {content}
  </div>
}

export default LoginAndSignUp;