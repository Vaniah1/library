import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Rootstate } from '../../../../redux/ReduxStore';
import { loginUser } from '../../../../redux/slices/AuthenticationSlice';



interface LoginFormProps {
    toggleRegister():void
}

const LoginForm: React.FC<LoginFormProps> = ({toggleRegister}) => {
  const auth = useSelector((state: Rootstate) => state.authentication);
  const dispatch: AppDispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!email.match(emailRegex)) {
        setFormError('Please enter a valid email.');
        return;
      }

      if (!password.match(passwordRegex)) {
        setFormError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        return;
      }

      setFormError(null);
      setSuccessMessage(null);
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        setSuccessMessage('Login successful!');
      } else {
        setFormError('Invalid email or password!');
      }
      console.log(auth)
    }
  };

  return (
    <div className="min-h-screen mt-32 border-black">
      <div className="block max-w-3xl p-3 mx-auto md:flex md:items-center">
        <form className="p-20 bg-blue-500 rounded-lg shadow-lg sm:w-screen">
          <h1 className="flex justify-center m-2 text-4xl font-bold text-black">
            Welcome Back to <p className="text-white">Laibbu!</p>
          </h1>

          <div className="">
            <div className="p-2 m-3 sm:m-0">
              {formError && (
                <div className="flex justify-center w-full p-5 text-white bg-red-500 rounded-lg">
                  {formError}
                </div>
              )}
              {successMessage && (
                <div className="flex justify-center w-full p-5 text-white bg-green-600 rounded-lg">
                  {successMessage}
                </div>
              )}
              <p className="font-bold text-md">Email</p>
              <input
                className="w-full p-5 bg-gray-100 rounded-lg outline-blue-600"
                placeholder="Write Email Here"
                required
                ref={emailRef}
                name="email"
                type="email"
                autoComplete="off"
                autoSave="off"
                autoCorrect="off"
              />
            </div>
            <div className="p-2 m-3 sm:m-0">
              <p className="font-bold text-md">Password</p>
              <input
                className="w-full p-5 bg-gray-100 rounded-lg outline-blue-600"
                placeholder="Write Password Here"
                required
                ref={passwordRef}
                type="password"
                name="password"
                autoComplete="off"
                autoSave="off"
                autoCorrect="off"
              />
            </div>
          </div>

          <button
            className="w-full p-5 m-2 font-bold text-white bg-teal-800 rounded-lg hover:opacity-80"
            onClick={handleLoginUser}
          >
            Login
          </button>
          <div className="flex justify-center font-semibold hover:text-white">
            Don’t have an account? <button onClick={toggleRegister} className="text-red-600 cursor-pointer hover:text-white ">Create one here.</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
