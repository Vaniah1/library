import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Rootstate } from "../../../../redux/ReduxStore";
import { registerUser, resetRegisterSuccess } from '../../../../redux/slices/AuthenticationSlice';

interface RegisterFormProps {
  toggleLogin(): void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const authState = useSelector((state: Rootstate) => state.authentication);
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const firstName = firstRef.current?.value;
    const lastName = lastRef.current?.value;

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email?.match(emailRegex)) {
      setFormError('Please enter a valid email.');
      return;
    }

    if (!password?.match(passwordRegex)) {
      setFormError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    if (!firstName) {
      setFormError('Please enter a first name.');
      return;
    }

    if (!lastName) {
      setFormError('Please enter a last name.');
      return;
    }

    setFormError(null);

    const resultAction = await dispatch(registerUser({ type: "PATRON", email, password, firstName, lastName }));

    if (registerUser.fulfilled.match(resultAction)) {
      setTimeout(() => {
        toggleLogin();
      }, 1000)
    } else {
      setFormError('Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetRegisterSuccess());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen mt-32">
      <div className="block max-w-3xl p-3 mx-auto md:flex md:items-center">
        <form className="p-20 bg-blue-500 rounded-lg shadow-lg sm:w-screen">
          <h1 className="flex justify-center m-2 text-4xl font-bold text-black">
            Register for <p className="text-white">Laibbu!</p>
          </h1>

          <div className="">
            <div className="p-2 m-3 sm:m-0">
              {/* {formError && (
                <div className="flex justify-center w-full p-5 text-white bg-red-500 rounded-lg">
                  {formError}
                </div>
              )}  */}
              {authState.registerSuccess ? (
                <div className="flex justify-center w-full p-5 text-white bg-green-600 rounded-lg">
                  Registered Successfully
                </div>
              ) : formError && <div className="flex justify-center w-full p-5 text-white bg-red-500 rounded-lg">
                  {formError}
                </div>}
              <p className="font-bold text-md">First Name</p>
              <input
                className="w-full p-5 bg-gray-100 rounded-lg outline-blue-600"
                placeholder="Enter First Name"
                required
                ref={firstRef}
                name="first"
                type="text"
                autoComplete="off"
                autoSave="off"
                autoCorrect="off"
              />
              <p className="font-bold text-md">Last Name</p>
              <input
                className="w-full p-5 bg-gray-100 rounded-lg outline-blue-600"
                placeholder="Enter Last Name"
                required
                ref={lastRef}
                name="last"
                type="text"
                autoComplete="off"
                autoSave="off"
                autoCorrect="off"
              />
              <p className="font-bold text-md">Email</p>
              <input
                className="w-full p-5 bg-gray-100 rounded-lg outline-blue-600"
                placeholder="Enter Email"
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
                placeholder="Enter Password"
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
            onClick={handleRegisterUser}
            type="submit"
          >
            Register
          </button>
          <div className="flex justify-center font-semibold cursor-pointer hover:text-white hover:underline-offset-1">
            Have an account? <button onClick={toggleLogin} className="text-red-600 cursor-pointer hover:text-white ">Log in here.</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
