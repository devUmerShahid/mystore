import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { resetPassword } = useAuth();

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      alert("Password reset link has been sent to your email!");
    } catch (error) {
      alert("Failed to send reset email. Please check your email address.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Password!
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-all duration-300 disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
