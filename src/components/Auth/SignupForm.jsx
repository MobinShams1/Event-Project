import { useState } from "react";

function SignupForm({children ,onSubmit}) {

  const [showPass, setShowPass] = useState(false);
  
    function handletoggleShowPass() {
      setShowPass((prev) => !prev)
    }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit({...data});
  }

  return <>
    <p className="title-form">Welcome to Signup</p>
    <form id='event-form' onSubmit={handleSubmit}>
      <p className="control"> 
        <label htmlFor="firstname">Firstname</label>
        <input 
          id="firstname"
          name="firstName"
          type="firstname"
        />
      </p>
      <p className="control"> 
        <label htmlFor="lastname">Lastname</label>
        <input 
          id="lastname"
          name="lastName"
          type="lastname"
        />
      </p>
      <p className="control">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="username"
        />
      </p>
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

export default SignupForm;