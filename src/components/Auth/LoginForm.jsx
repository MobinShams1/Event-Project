import { useState } from "react";

function LoginForm({ children, onSubmit }) {
  const [showPass, setShowPass] = useState(false);

  function handletoggleShowPass() {
    setShowPass((prev) => !prev)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit({ ...data });
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
          type={showPass ? 'text' : 'password'}
          
        />
        <button
          type="button"
          onClick={handletoggleShowPass}
          style={{
            position: 'absolute',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px 8px',
            marginRight: '2rem'
          }}
        >
          {showPass ? '👁️' : '👁️‍🗨️'}
        </button>
      </p>

      <p className="form-actions">{children}</p>
    </form>
  </>
}

export default LoginForm;