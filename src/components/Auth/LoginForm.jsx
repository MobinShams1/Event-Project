
function LoginForm({children ,onSubmit}) {


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit({...data});
  }

  return <>
    <p className="title-form">Welcome to Login</p>
    <form id='event-form' onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          type="email"
        />
      </p>
      <p className="control">
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
        />
      </p>
      
      <p className="form-actions">{children}</p>
    </form>
  </>
}

export default LoginForm;