import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import loginAnimation from "../../assets/Animations/Animation - auth.json";
import Swal from "sweetalert2";

const Login = () => {
  const { LoginUserEmailPassword, createUserUseGoogl } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    const email = data.email;
    const password = data.password;

    LoginUserEmailPassword()
      .then((res) => {
        if (res.user) {
          Swal.fire({
            title: "Success!",
            text: "User has been login successfully.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
              popup: "text-[#129990]",
            },
            buttonsStyling: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to create user.",
          icon: "error",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
      });
    // TODO: Firebase Email/Password login here
  };

  const handleGoogleLogin = () => {
    createUserUseGoogl()
      .then((res) => {
        if (res.user) {
          Swal.fire({
            title: "Success!",
            text: "User has been login successfully.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
              popup: "text-[#129990]",
            },
            buttonsStyling: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to create user.",
          icon: "error",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center bg-gray-50 px-4">
      {/* Left Side - Animation */}
      <div className="hidden md:flex justify-center">
        <Lottie
          animationData={loginAnimation}
          loop
          className="w-full max-w-md"
        />
      </div>

      {/* Right Side - Form */}
      <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-center text-[#129990] mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="******"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#129990] text-white py-2 rounded hover:bg-opacity-90"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/joinus"
              className="text-[#129990] font-medium hover:underline"
            >
              Join US
            </Link>
          </div>
        </form>

        <div className="divider my-4">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center gap-2 border py-2 rounded hover:bg-gray-100"
        >
          <FaGoogle className="text-xl" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
