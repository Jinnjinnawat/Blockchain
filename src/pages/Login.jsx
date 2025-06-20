import { useEffect } from 'react';
import 'flowbite';

export default function Login() {
  useEffect(() => {
    // Flowbite auto initializes via data attributes
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>
        <form className="space-y-6">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="form-input block w-full border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-green-500 focus:border-green-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="form-input block w-full border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-green-500 focus:border-green-500 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded 
                         focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 
                       focus:outline-none focus:ring-green-300 font-medium rounded-lg 
                       text-sm px-5 py-2.5 text-center dark:bg-green-600 
                       dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
