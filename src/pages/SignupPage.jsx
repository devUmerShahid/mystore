// import React from "react";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function SignupPage() {
//   const { register, handleSubmit } = useForm();
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       await signup(data.email, data.password, data.name);
//       alert("Account created!");
//       navigate("/cart");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white shadow-md rounded p-6 w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           {...register("email")}
//           className="w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="text"
//           placeholder="Full Name"
//           {...register("name")}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password")}
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }




import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data.email, data.password, data.name);
      alert("Account created successfully!");
      navigate("/cart");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center border-b border-gray-100 px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your details below to create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              {...register("password", { required: true, minLength: 8 })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters long.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-all duration-300 disabled:opacity-60"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 border-t border-gray-100 py-4 px-6">
          By clicking “Create Account”, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>.
        </div>
      </div>
    </div>
  );
}