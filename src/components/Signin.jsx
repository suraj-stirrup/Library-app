'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

export default function Signin() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // ✅ Formik hook setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError('');
        setSuccess('');

        // Replace with your actual sign-in API endpoint
        const response = await axios.post('/api/auth/signin', values);

        if (response.status === 200) {
          setSuccess('Login successful!');
          resetForm();
          // Optionally redirect or set session/token
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container px-4 mx-auto py-12">
      <div className="max-w-lg mx-auto bg-white p-8 shadow rounded">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">📚 Library App – Sign In</h2>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Email Field */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`w-full p-3 border-2 rounded ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-indigo-900'
              }`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className={`w-full p-3 border-2 rounded ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-indigo-900'
              }`}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm font-semibold">
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-indigo-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 bg-indigo-800 hover:bg-indigo-900 text-white font-bold rounded transition"
          >
            {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Success/Error messages */}
          {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-6 font-semibold">
          Don’t have an account?{' '}
          <Link href="/user/signup" className="text-red-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
