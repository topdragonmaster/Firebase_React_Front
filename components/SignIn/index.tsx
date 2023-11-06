import React, { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import * as Yup from "yup";
import { Form, Formik } from "formik";


const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function SignIn() {
  const provider = new GoogleAuthProvider();
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = getAuth();

  function signinClicked() {

    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Signed in with popup");
      });
  }

  const handleSignIn = (email: string, password: string) => {
    console.log(email, password)
    return signInWithEmailAndPassword(auth, email, password)
      .then((_userCredential) => {
        setIsSignUp(false)
        console.log("User signed in :)");
        // You can access the user credential here
      })
      .catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  const handleSignUp = (email: string, password: string) => {
    console.log(email, password)
    return createUserWithEmailAndPassword(auth, email, password)
      .then((_userCredential) => {
        console.log("User signed up :)");
        // You can access the user credential here
      })
      .catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        signup: false,
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (values.signup === true) {
          handleSignUp(values.email, values.password).catch(() => {
            setSubmitting(false);
          });
        } else {
          handleSignIn(values.email, values.password).catch(() => {
            setSubmitting(false);
          });
        }
      }}
    >
      {({
        submitForm,
        isSubmitting,
        values,
        handleChange,
        setFieldValue,
        touched,
        errors,
      }) => (
        <Form>
          <div className="bg-white dark:bg-gray-900">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
              <div className="w-full max-w-md">

                <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">sign In</h1>

                <div className="relative flex items-center mt-8">
                  <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>

                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                  />

                </div>

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>

                  <input
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                </div>
                {
                  isSubmitting && <div className="text-center">
                    <div role="status">
                      <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }

                {isSignUp ? <div className="mt-6">
                  <>
                    <button disabled={isSubmitting} onClick={() => {
                      setFieldValue("signup", true);
                      submitForm();
                    }} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign Up
                    </button>
                    <div className="mt-6 text-center ">
                      <p
                        onClick={() => { setIsSignUp(false) }}
                        className="cursor-pointer text-sm text-blue-500 hover:underline dark:text-blue-400"
                      >
                        Return to SignIn
                      </p>
                    </div>
                  </>
                </div> :
                  <div className="mt-6">
                    <button
                      onClick={submitForm}
                      disabled={isSubmitting} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign In
                    </button>

                    <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign in with</p>

                    <button onClick={signinClicked} className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                      </svg>

                      <span className="mx-2">Sign in with Google</span>
                    </button >

                    <div className="mt-6 text-center ">
                      <p
                        onClick={() => { setIsSignUp(true) }}
                        className="cursor-pointer text-sm text-blue-500 hover:underline dark:text-blue-400"
                      >
                        Don’t have an account yet? Sign up
                      </p>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
