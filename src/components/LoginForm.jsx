import React, { useCallback, useMemo, useState } from 'react';
import Input from './common/Input';
import { useAuth } from '../reducer/AuthContext';

function LoginForm() {
  const { handleSubmit, message } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = useCallback(() => setIsSignup((prev) => !prev));

  const title = useMemo(() => (isSignup ? 'Signup' : 'Login'), [isSignup]);
  const goto = useMemo(() => (!isSignup ? 'Signup' : 'Login'), [isSignup]);

  const onSubmit = (e) => {
    handleSubmit(e, isSignup);
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>{title}</h3>
      {isSignup && (
        <div>
          <Input label="Name" name="name" />
        </div>
      )}
      <div>
        <Input label="Email" name="email" type="email" />
      </div>
      <div>
        <Input label="Password" name="password" type="password" />
      </div>
      <div className="actions">
        <button type="submit">{title}</button>
        <button type="reset" onClick={toggleForm}>
          Goto {goto}
        </button>
      </div>

      <p>{message}</p>
    </form>
  );
}

export default LoginForm;
