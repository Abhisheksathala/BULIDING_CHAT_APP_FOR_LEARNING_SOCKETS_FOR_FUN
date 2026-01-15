import React from "react";

// IMPORTS
import InputComponent from "../components/InputComponent";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import AnimationWarper from "../animation/AnimationWraper";
import { IoMdPerson } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = ({ type }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (formData) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const configRegister = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (type === "login") {
        try {
          const { data } = await axios.post(
            `${server}/api/v1/user/login`,
            {
              identifier: formData.username,
              password: formData.password,
            },
            config
          );
          dispatch(userExist(true));
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }

      if (type === "signin") {
        try {
          const formDatas = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            bio: formData.bio,
            avater: formData.avater,
          };

          const { data } = await axios.post(
            `${server}/api/v1/user/register`,
            formDatas,
            configRegister
          );
          dispatch(userExist(true));
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [avater, setAvater] = React.useState(null);

  return (
    <AnimationWarper>
      <section className="w-screen h-screen overflow-hidden flex items-center justify-center ">
        <form
          onSubmit={handleSubmit(submit)}
          className={`w-[80%] max-w-[500px] shadow rounded-lg py-4 px-4`}
        >
          <h1 className={`text-4xl capitalize text-center mb-15 font-semibold`}>
            {type === "login" ? "welcome back" : "Join us today"}
          </h1>
          {type === "signin" ? (
            <>
              <div className="flex items-center flex-col justify-center gap-4">
                <label
                  htmlFor="avater "
                  className="bg-gray-300 w-[8rem] h-[8rem] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors ease-linear duration-300 active:bg-gray-300 overflow-hidden "
                >
                  {avater ? (
                    <>
                      <img
                        className="aspect-square"
                        src={URL.createObjectURL(avater)}
                        alt="avater "
                      />
                    </>
                  ) : (
                    <IoMdPerson className="w-8 h-8" />
                  )}
                </label>
                <input
                  type="file"
                  {...register("file")}
                  name="avater "
                  onChange={(e) => {
                    setAvater(() => e.target.files[0]);
                  }}
                  id="avater "
                  hidden
                />
                {errors.file && (
                  <p className="text-red-500 text-left">
                    {errors.file.message}
                  </p>
                )}
                <div className="w-full">
                  {errors.email && (
                    <p className="text-red-500 text-left">
                      {errors.email.message}
                    </p>
                  )}
                  <InputComponent
                    type={"email"}
                    placeholder={"email"}
                    containerclass={""}
                    className={"px-2 py-2 "}
                    {...register("email", { required: "email is required" })}
                  />
                </div>
              </div>
            </>
          ) : null}
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <InputComponent
            type={"text"}
            placeholder={"username"}
            containerclass={""}
            className={"px-2 py-2 "}
            {...register("username", { required: "username is required" })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <InputComponent
            type={"password"}
            placeholder={"password"}
            containerclass={""}
            className={"px-2 py-2"}
            {...register("password", { required: "password is required" })}
          />

          {type === "signin" && (
            <>
              {errors.bio && (
                <p className="text-red-500">{errors.bio.message}</p>
              )}
              <InputComponent
                type={"text"}
                placeholder={"bio"}
                containerclass={""}
                className={"px-2 py-2 "}
                {...register("bio", { required: "bio is required" })}
              />
            </>
          )}

          <div className="mt-6">
            <Button
              type={"submit"}
              customclass={"text-white font-semibold "}
              title={<>{type === "signin" ? "Sign Up" : "Login"}</>}
            />
          </div>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>
          {type === "signin" ? (
            <p className="mt-6 text-gray-400">
              Already have an account?{" "}
              <Link
                to={`/userauthentication/login`}
                className="underline text-black text-xl ml-1"
              >
                Login
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-gray-400">
              Don't have an account?{" "}
              <Link
                to={`/userauthentication/register`}
                className="underline text-black text-xl ml-1"
              >
                Sign Up
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWarper>
  );
};

export default Login;
