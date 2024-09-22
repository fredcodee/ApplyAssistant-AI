import React, { useState } from 'react';
import '../assets/styles/output.css';

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div>
      <div>
        <div className="my-5 mb-12" id="signin-div">
          {/* Error Alert */}
          {error && (
            <div role="alert" className="alert alert-error max-w-sm mb-5 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Error message here</span>
            </div>
          )}

          {/* Sign In Section */}
          <div className="mx-auto bg-blackborder md:rounded-lg p-12 md:max-w-sm flex justify-center flex-col">
            <h1 className="text-center font-bold mb-2 text-2xl">Welcome</h1>

            {/* Google Sign In Button */}
            <button className="btn mt-5 btn-cta text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 50 50" fill="white">
                <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
              </svg>
              Sign in with Google
            </button>

            <div className="divider">OR</div>

            {/* Email Input */}
            <div className="form-control w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Get a Code Button */}
            <button className="btn btn-outline mt-5" onClick={() => setLoading(true)}>
              Sign In
              {loading ? (
                <span className="loading loading-ring loading-sm ml-2"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 ml-2 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              )}
            </button>

            <p className="text-center pt-5 mb-0 pb-0 text-sm cursor-default">
              By signing up, you agree to <a href="#" className="text-primary">Terms of Service</a>.
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-center opacity-60 mt-12 flex justify-center gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 011.043-3.296A3.745 3.745 0 0121 12z"></path>
            </svg>
            First time ? We will sign you up automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
