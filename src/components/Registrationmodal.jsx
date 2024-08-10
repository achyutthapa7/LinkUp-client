import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingAnimation from "./LoadingAnimation";
import { useAuth } from "../context/Authentication";
import { useUser } from "../context/UserProfile";

const Registrationmodal = ({
  registrationModal,
  setRegistrationModal = () => {},
}) => {
  const [registration, setRegistration] = useState(true);
  const [verification, setVerification] = useState(false);
  const [createUsername, setCreateUsername] = useState(false);
  const [createPassword, setCreatePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [addProfilePicture, setAddProfilePicture] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("DATA")) || null
  );

  return (
    <div
      className={`fixed ${
        registrationModal ? "flex" : "hidden"
      } top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex h-full justify-center  items-center bg-slate-400 bg-opacity-30`}
    >
      <div className="w-[450px] h-[500px] bg-white shadow-xl rounded-md relative">
        {registration && (
          <Registration
            setVerification={setVerification}
            setRegistration={setRegistration}
            setRegistrationModal={setRegistrationModal}
            setData={setData}
            data={data}
          />
        )}
        {verification && (
          <Verification
            setVerification={setVerification}
            setRegistration={setRegistration}
            setRegistrationModal={setRegistrationModal}
            setCreateUsername={setCreateUsername}
            data={data}
            setData={setData}
          />
        )}
        {createUsername && (
          <CreateUsername
            setCreateUsername={setCreateUsername}
            setVerification={setVerification}
            setRegistrationModal={setRegistrationModal}
            setRegistration={setRegistration}
            setCreatePassword={setCreatePassword}
            data={data}
            setData={setData}
          />
        )}
        {createPassword && (
          <CreatePassword
            setCreatePassword={setCreatePassword}
            setConfirmPassword={setConfirmPassword}
            setRegistration={setRegistration}
            setRegistrationModal={setRegistrationModal}
            setCreateUsername={setCreateUsername}
            data={data}
            setData={setData}
          />
        )}
        {confirmPassword && (
          <ConfirmPassword
            setCreatePassword={setCreatePassword}
            setConfirmPassword={setConfirmPassword}
            setRegistration={setRegistration}
            setRegistrationModal={setRegistrationModal}
            data={data}
            setData={setData}
            setAddProfilePicture={setAddProfilePicture}
          />
        )}

        {addProfilePicture && (
          <AddProfilePicture
            setConfirmPassword={setConfirmPassword}
            setRegistration={setRegistration}
            setRegistrationModal={setRegistrationModal}
            setAddProfilePicture={setAddProfilePicture}
            data={data}
            setData={setData}
          />
        )}
      </div>
    </div>
  );
};

export default Registrationmodal;

const Registration = ({
  setRegistration,
  setVerification,
  setRegistrationModal,
  setData,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    emailAddress: "",
  });
  const { firstName, lastName, dateOfBirth, gender, emailAddress } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (firstName && lastName && dateOfBirth && gender && emailAddress) {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const Data = await res.json();
        if (res.status === 200) {
          setData(Data);
          localStorage.setItem("DATA", JSON.stringify(Data));
          toast.success(
            "Registration successful, please verify your email address"
          );
          setRegistration(false);
          setVerification(true);
          setIsLoading(false);
        } else if (res.status === 402) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(Data.message);
          setIsLoading(false);
        } else {
          toast.error("An error occurred");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("All fields are required");
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p className="text-3xl font-semibold text-center mt-5">Sign Up</p>
      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            emailAddress: "",
          });
        }}
      >
        X
      </span>
      {data && (
        <span
          className="absolute bottom-1 right-5 font-thin  cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
          onClick={() => {
            setRegistration(false);
            setVerification(true);
          }}
        >
          {"Next"}
        </span>
      )}
      <form className="px-5 mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 mb-3 w-full focus:border-blue-600 focus:outline-none rounded-md"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 mb-3 w-full focus:border-blue-600 focus:outline-none rounded-md"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="border p-2 mb-3 w-full focus:border-blue-600 focus:outline-none rounded-md "
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleChange}
        />
        <select
          className="border p-2 mb-3 w-full "
          name="gender"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="email"
          placeholder="Email Address"
          className="border p-2 mb-3 w-full focus:border-blue-600 focus:outline-none rounded-md"
          name="emailAddress"
          value={emailAddress}
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 w-full rounded-md flex justify-center items-center hover:bg-blue-500 active:bg-blue-600"
          onClick={() => {
            // setRegistration(false);
            // setVerification(true);
          }}
        >
          {isLoading ? <LoadingAnimation /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

const Verification = ({
  setRegistration,
  setVerification,
  setRegistrationModal,
  setCreateUsername,
  data,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (verificationCode) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/verification/${data.user.emailAddress}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              verificationCode,
            }),
          }
        );
        const Data = await res.json();
        if (res.status === 200) {
          setData(Data);
          localStorage.setItem("DATA", JSON.stringify(Data));
          toast.success(Data.message);
          setVerification(false);
          setCreateUsername(true);
          setIsLoading(false);
        } else if (res.status === 404) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 403) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 401) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 201) {
          toast(Data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(Data.message);
          setIsLoading(false);
        } else {
          toast("Error occurred");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Verification code is required");
      setIsLoading(false);
    }
  };
  return (
    <div className="px-10 flex flex-col justify-center">
      <p className="text-3xl font-semibold text-center mt-5 mb-10">
        Verification
      </p>
      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          if (!data) {
            setVerification(false);
            setRegistration(true);
          } else {
            setVerification(true);
            setRegistration(false);
          }
        }}
      >
        X
      </span>
      <span
        className="absolute bottom-5 left-5 font-thin  cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
        onClick={() => {
          setRegistration(true);
          setVerification(false);
        }}
      >
        {"Go back"}
      </span>
      {data && (
        <span
          className="absolute bottom-5 right-5 font-thin  cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
          onClick={() => {
            if (data.user.isVerified) {
              setVerification(false);
              setCreateUsername(true);
            }
          }}
        >
          {"Next"}
        </span>
      )}

      <p className="text-center mb-5">
        We've sent a verification code to{" "}
        <strong>{data.user.emailAddress}</strong>. Please enter the code below
        to verify your email address.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Verification Code"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setVerificationCode(e.target.value);
            }}
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => {
            // setVerification(false);
            // setCreateUsername(true);
          }}
        >
          {isLoading ? <LoadingAnimation /> : "verify"}
        </button>
        <div className="mt-5 text-center">
          <p>Didn't receive a code?</p>
          <button className="text-blue-500 hover:underline focus:outline-none">
            Resend Code
          </button>
        </div>
      </form>
    </div>
  );
};

const CreateUsername = ({
  setCreateUsername,
  setVerification,
  setRegistrationModal,
  setRegistration,
  setCreatePassword,
  data,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUsername] = useState("");
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (userName) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/createUserName/${
            data.user.emailAddress
          }`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              userName,
            }),
          }
        );
        const Data = await res.json();
        if (res.status === 200) {
          setData(Data);
          localStorage.setItem("DATA", JSON.stringify(Data));
          toast.success(Data.message);
          setCreateUsername(false);
          setCreatePassword(true);
          setIsLoading(false);
        } else if (res.status === 404) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 402) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(Data.message);
          setIsLoading(false);
        } else {
          toast("Error occurred");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter a username");
      setIsLoading(false);
    }
  };
  return (
    <div className="px-10 flex flex-col  h-full">
      <p className="text-3xl font-semibold text-center mt-5 mb-10">
        Create Username
      </p>
      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          setRegistration(true);
          setCreateUsername(false);
        }}
      >
        X
      </span>
      <span
        className="absolute bottom-5 left-5 font-thin  cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
        onClick={() => {
          setVerification(true);
          setCreateUsername(false);
        }}
      >
        {"Go back"}
      </span>
      {data.user.userName && (
        <span
          className="absolute bottom-5 right-5 font-thin  cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
          onClick={() => {
            setCreatePassword(true);
            setCreateUsername(false);
          }}
        >
          {"Next"}
        </span>
      )}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <input
          disabled={data.user.userName && true}
          value={data.user.userName}
          type="text"
          placeholder="Enter Username"
          className="w-full pl-3 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          name="userName"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          disabled={isLoading || (data.user.userName && true)}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            // setCreateUsername(false);
            // setCreatePassword(true);
          }}
        >
          {isLoading ? <LoadingAnimation /> : "Next"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        This username will be visible to others. Make sure it's unique and
        represents you well!
      </p>
    </div>
  );
};

const CreatePassword = ({
  setCreatePassword,
  setConfirmPassword,
  setRegistration,
  setRegistrationModal,
  setCreateUsername,
  data,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        setIsLoading(false);
      } else {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_URL}/createPassword/${
              data.user.emailAddress
            }`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                password,
              }),
            }
          );
          const Data = await res.json();
          if (res.status === 200) {
            setData(Data);
            localStorage.setItem("DATA", JSON.stringify(Data));
            toast.success(Data.message);
            setCreatePassword(false);
            setConfirmPassword(true);
            setIsLoading(false);
          } else if (res.status === 404) {
            toast.error(Data.message);
            setIsLoading(false);
          } else if (res.status === 500) {
            toast.error(Data.message);
            setIsLoading(false);
          } else {
            toast.error("error occurred");
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      toast.error("Password is required");
      setIsLoading(false);
    }
  };
  return (
    <div className="px-10 flex flex-col h-full relative">
      <p className="text-3xl font-semibold text-center mt-5 mb-10">
        Create Password
      </p>
      <p className="text-center text-gray-700 mb-5">
        One more step! Please create your password.
      </p>

      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          setRegistration(true);
          setCreatePassword(false);
        }}
      >
        X
      </span>
      <span
        className="absolute bottom-5 left-5 font-thin cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
        onClick={() => {
          setCreatePassword(false);
          setCreateUsername(true);
        }}
      >
        Go back
      </span>
      {data.user.password && (
        <span
          className="absolute bottom-5 right-5 font-thin cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
          onClick={() => {
            setCreatePassword(false);
            setConfirmPassword(true);
          }}
        >
          Next
        </span>
      )}

      <form onSubmit={handleSubmit}>
        <input
          disabled={data.user.password && true}
          type="password"
          placeholder="Create your password"
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <button
          disabled={isLoading || (data.user.password && true)}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isLoading ? <LoadingAnimation /> : "Create"}
        </button>
      </form>
    </div>
  );
};

const ConfirmPassword = ({
  setConfirmPassword,
  setRegistrationModal,
  setRegistration,
  setCreatePassword,
  data,
  setData,
  setAddProfilePicture,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (confirmPassword) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/confirmPassword/${
            data.user.emailAddress
          }`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              confirmPassword,
            }),
            credentials: "include",
          }
        );
        const Data = await res.json();
        if (res.status === 200) {
          setData(Data);
          localStorage.setItem("DATA", JSON.stringify(Data));
          // localStorage.setItem("token", Data.token);
          // setAuth({ ...auth, token: Data.token });
          toast.success(Data.message);
          setAddProfilePicture(true);
          setConfirmPassword(false);
          setIsLoading(false);
        } else if (res.status === 404) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 402) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(Data.message);
          setIsLoading(false);
        } else {
          toast.error("An error occurred");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please confirm your password");
      setIsLoading(false);
    }
  };
  return (
    <div className="px-10 flex flex-col h-full relative">
      <p className="text-3xl font-semibold text-center mt-5 mb-10">
        Confirm Password
      </p>
      <p className="text-center text-gray-700 mb-5">
        Confirm your password to proceed.
      </p>

      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          setRegistration(true);
          setConfirmPassword(false);
        }}
      >
        X
      </span>
      <span
        className="absolute bottom-5 left-5 font-thin cursor-pointer text-blue-600 hover:text-blue-700 underline underline-offset-1"
        onClick={() => {
          setCreatePassword(true);
          setConfirmPassword(false);
        }}
      >
        Go back
      </span>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Confirm your password"
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setconfirmPassword(e.target.value)}
          name={confirmPassword}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {isLoading ? <LoadingAnimation /> : "Confirm"}
        </button>
      </form>
    </div>
  );
};

const AddProfilePicture = ({
  setConfirmPassword,
  setRegistration,
  setRegistrationModal,
  setAddProfilePicture,
  data,
  setData,
}) => {
  const [user, setUser] = useUser();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef();
  const handleChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };
  const handleSkip = () => {
    setRegistrationModal(false);
    setAddProfilePicture(false);
    setRegistration(true);
    localStorage.removeItem("DATA");
    navigate("/feeds");
    localStorage.setItem("token", data.token);
    setAuth({ ...auth, token: data.token });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", imgRef.current.files[0]);

    if (formData) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/addProfilePicture/${
            data.user.emailAddress
          }`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        const Data = await res.json();
        if (res.status === 200) {
          setUser(Data.user);
          toast.success(Data.message);
          setRegistrationModal(false);
          setAddProfilePicture(false);
          setRegistration(true);
          localStorage.removeItem("DATA");
          navigate("/feeds");
          localStorage.setItem("token", data.token);
          setAuth({ ...auth, token: data.token });
        } else if (res.status === 404) {
          toast.error(Data.message);
          setIsLoading(false);
        } else if (res.status === 500) {
          toast.error(Data.message);
          setIsLoading(false);
        } else {
          toast.error("An error occured");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please select a profile picture");
      setIsLoading(false);
      return;
    }
  };
  return (
    <div className="px-10 py-8 flex flex-col h-full relative bg-white rounded-lg shadow-md">
      <span
        className="absolute top-2 left-3 text-sm font-medium cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={handleSkip}
      >
        Skip
      </span>
      <p className="text-3xl font-semibold text-center mb-3 text-blue-700">
        Add Profile Picture
      </p>
      <p className="text-center text-gray-600 mb-8">
        To personalize your profile, please upload a profile picture. You can
        skip this step and add a picture later if you prefer.
      </p>

      <span
        className="absolute top-2 right-3 text-2xl font-semibold cursor-pointer text-gray-600 hover:text-gray-700"
        onClick={() => {
          setRegistrationModal(false);
          setRegistration(false);
          setAddProfilePicture(true);
        }}
      >
        X
      </span>
      <div className="flex flex-col items-center justify-center cursor-pointer mb-6">
        <label
          htmlFor="profile-picture"
          className="cursor-pointer hover:text-blue-600 mb-4 text-lg text-blue-500"
        >
          {imgSrc ? "Change Profile Picture" : "Choose Your Profile Picture"}
        </label>
        <div className="w-48 h-48 rounded-full border-[10px] border-gray-300 flex items-center justify-center bg-gray-100">
          {imgSrc ? (
            <a
              href={imgSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full"
            >
              <img
                src={imgSrc}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            </a>
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}
        </div>
      </div>

      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-picture"
          onChange={handleChange}
          ref={imgRef}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none mb-4"
        >
          {isLoading ? "Uploading..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};
