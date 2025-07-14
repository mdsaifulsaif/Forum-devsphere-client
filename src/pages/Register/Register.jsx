import React, { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import signupAnimation from "../../assets/Animations/Animation - auth.json";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Register = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    createUserEmailPassword,
    updateUser,
    user,
    setUser,
    createUserUseGoogl,
  } = use(AuthContext);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    console.log(email, password, name);

    createUserEmailPassword(email, password)
      .then((res) => {
        // send user data to bakend
        const saveUser = {
          name: name,
          email: res.user.email,
          photoURL: imageURL,
          role: "user",
          badge: "bronze",
          isMember: false,
          cost: 10,
          createdAt: new Date(),
        };
        axiosSecure
          .post("/users", saveUser)
          .then((res) => {
            console.log("User saved to DB:", res.data);
          })
          .catch((err) => {
            console.error("User save error:", err);
          });

        // update profile in firebase
        const usernameandphoto = {
          displayName: name,
          photoURL: imageURL,
        };
        updateUser(usernameandphoto)
          .then((res) => {
            console.log("user profile is updated");
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Success!",
          text: "User has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
        navigate("/");

        console.log(res);
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

  // crate user use google
  const handleGoogleRegister = () => {
    createUserUseGoogl()
      .then((res) => {
        if (res.user) {
          // send user data to backend
          const saveUser = {
            name: res.user.displayName,
            email: res.user.email,
            role: "user",
            badge: "bronze",
            isMember: false,
            cost: 10,
            createdAt: new Date(),
          };

          axiosSecure
            .post("/users", saveUser)
            .then((res) => {
              console.log("User saved to DB:", res.data);
            })
            .catch((err) => {
              console.error("User save error:", err);
            });

          //success message
          Swal.fire({
            title: "Success!",
            text: "User has been created successfully.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
              popup: "text-[#129990]",
            },
            buttonsStyling: false,
          });
        }
        navigate("/");
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

  const handleImage = async (e) => {
    const profile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", profile);
    const imbbApi = `https://api.imgbb.com/1/upload?&key=${
      import.meta.env.VITE_IMBB_API_KEY
    }`;
    const res = await axios.post(imbbApi, formData);

    setImageURL(res.data.data.url);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center bg-gray-50 px-4">
      {/* Left Side - Lottie */}
      <div className="hidden md:flex justify-center">
        <Lottie
          animationData={signupAnimation}
          loop
          className="w-full max-w-md"
        />
      </div>

      {/* Right Side - Form */}
      <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-center text-[#129990] mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* imgge  */}
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              onChange={handleImage}
              type="file"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your name"
            />
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
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
            Register
          </button>

          <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              to="/join"
              className="text-[#129990] font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </form>

        <div className="divider my-4">or</div>

        <button
          onClick={handleGoogleRegister}
          className="w-full flex justify-center items-center gap-2 border py-2 rounded hover:bg-gray-100"
        >
          <FaGoogle className="text-xl" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
