import React, { Component } from 'react';

export class FormReg extends Component {
  render() {
    const { showModal, toggleModal, onSwitchToLogin } = this.props;

    if (!showModal) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={toggleModal}
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <div
          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg max-w-md w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create your account
            </h3>
            <button
              type="button"
              onClick={toggleModal}
              className="text-gray-400 hover:text-gray-900"
            >
              ✖
            </button>
          </div>

          <form className="space-y-4 mt-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-white">
                I accept the <a href="#" className="text-blue-700 hover:underline">Terms and Conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToLogin();
                }}
                className="text-white hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default FormReg;