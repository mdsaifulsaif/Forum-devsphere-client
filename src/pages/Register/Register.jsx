import React, { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import signupAnimation from "../../assets/Animations/Animation - auth.json";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { createUserEmailPassword, updateUser, createUserUseGoogl } =
    use(AuthContext);
  const [imageURL, setImageURL] = useState("");
  const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Image Upload Function
  // const handlePhoto = async (e) => {
  //   console.log("imaggg");
  //   // const image = e.target.files[0];
  //   // const formData = new FormData();
  //   // formData.append("image", image);

  //   // try {
  //   //   const res = await axios.post(
  //   //     `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
  //   //     formData
  //   //   );
  //   //   if (res.data && res.data.success) {
  //   //     const uploadedURL = res.data.data.display_url;
  //   //     setImageURL(uploadedURL);
  //   //     console.log("Uploaded Image URL:", uploadedURL); // ✅ Log image URL only
  //   //   }
  //   // } catch (err) {
  //   //   console.error("Image upload failed:", err);
  //   // }
  // };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;

    createUserEmailPassword(email, password)
      .then(async (res) => {
        // update user
        await updateUser({
          displayName: name,
          photoURL: "url",
        });
        if (res?.user) {
          // send user data to backend
          const saveUser = {
            name: res.user.displayName,
            email: res.user.email,
            photoURL: "url",
            role: "user",
            badge: "bronze",
            isMember: false,
            createdAt: new Date(),
          };

          axios
            .post("http://localhost:3000/users", saveUser)
            .then((res) => {
              console.log("User saved to DB:", res.data);
            })
            .catch((err) => {
              console.error("User save error:", err);
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
            createdAt: new Date(),
          };

          axios
            .post("http://localhost:3000/users", saveUser)
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

          {/* <div>
            <label className="block mb-1 font-medium">Photo</label>
            <input
              onChange={handlePhoto}
              type="file"
              accept="image/*"
              {...register("photo", { required: "Photo is required" })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.photo && (
              <p className="text-sm text-red-500">{errors.photo.message}</p>
            )}
          </div> */}

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
