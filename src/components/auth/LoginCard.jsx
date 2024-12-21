import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import { loginValidationSchema } from "../../utils/validations/auth";
import { loginUser } from '../../services/api/Login';
import { UserContext } from "../home/userContextProvider";

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-red-500 p-4 rounded-lg border border-red-200 bg-red-50">
        <h2 className="font-semibold mb-2">Something went wrong:</h2>
        <pre className="text-sm">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Loading Component
const LoadingSpinner = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
  </div>
);

const LoginCard = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          await fetchUser();
          navigate('/home', { replace: true });
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        console.error('Auth check failed:', error);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [navigate, fetchUser]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
        console.log(values,'this is the data')
      try {
        setError('');
        formik.setSubmitting(true);
        
        const response = await loginUser(values);
        
        if (response?.access_token) {
          await fetchUser();
          toast.success("Login Successful");
          navigate('/home', { replace: true });
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  if (isChecking) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen w-full items-center justify-center text-gray-600">
        <div className="relative">
          <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute -left-20 -top-20"></div>
          <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute -right-20 -bottom-20"></div>
          
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center">
                <span className="flex-shrink-0 text-3xl font-black tracking-tight text-indigo-500">
                  Blog Application
                </span>
              </div>

              <form onSubmit={formik.handleSubmit} className="mb-4">
                <div className="mb-4">
                  <label 
                    htmlFor="username" 
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className={`block w-full cursor-text appearance-none rounded-md border 
                      ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-400'}
                      bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:shadow`}
                    placeholder="Enter your username"
                    autoComplete="username"
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.username}</div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between">
                    <label 
                      className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`block w-full cursor-text appearance-none rounded-md border 
                      ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-400'}
                      bg-white py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:shadow`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={formik.isSubmitting}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                  )}
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`w-full rounded-md py-2 px-5 text-sm text-white shadow 
                      ${formik.isSubmitting 
                        ? 'bg-indigo-300 cursor-not-allowed' 
                        : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}
                  >
                    {formik.isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="mr-2">Signing in...</div>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>

                {error && (
                  <div className="text-center text-red-500 text-sm mb-4">
                    {error}
                  </div>
                )}
              </form>

              <p className="text-center text-sm">
                Don't Have An Account?{' '}
                <Link 
                  to="/register" 
                  className="text-indigo-500 hover:text-indigo-600 font-medium"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with ErrorBoundary wrapper
export default function LoginCardWithErrorBoundary() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      onReset={() => window.location.reload()}
    >
      <LoginCard />
    </ErrorBoundary>
  );
}