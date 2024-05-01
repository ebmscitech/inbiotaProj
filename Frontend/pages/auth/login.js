import React, { useState } from "react";
import Link from "next/link";

// layout for page

import Auth from "../../components/Layout/Auth.js";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import { LoginSchema } from "@/validation/index.js";
import ButtonPrimary from "@/components/misc/ButtonPrimary.js";
import Loader from "@/components/Loader/index.js";
import { Eye24Filled, EyeOff24Filled } from "@fluentui/react-icons";
import { postAuth } from "@/api/index.js";
import toastAlert from "@/utils/alert";
import { useRouter } from "next/navigation.js";
import { setCookie, setStorage, setUserData } from "@/utils/storage.js";

export default function Login() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const onSubmit = async (values, actions) => {
    console.log("udah di validasi", values)

    setIsLoading(true);

    postAuth(values, '/login').then((res) => {
      setIsLoading(false)
      console.log("ini post login", res)
      var temp = res.data.data || null
      const tempAccount = res.data.data.account
      toastAlert("success", "Berhasil login !")
      // handleClose()
      actions.resetForm({
        values: {
          username: "",
          password: "",
        },
      });
      // setUserData({
      //   username: tempAccount.username,
      //   id_user: tempAccount._id,
      //   role: tempAccount.role,
      // });
      // setStorage("userData", {
      //   username: tempAccount.username,
      //   id_user: tempAccount._id,
      //   role: tempAccount.role,
      // })
      const dataToStore = {
        username: tempAccount.username,
        id_user: tempAccount._id,
        role: tempAccount.role,
        profile_picture: tempAccount.profile_picture,
      };
      setUserData(dataToStore)
      setCookie("_asp_ud", tempAccount, 8)
      router.push('/admin/dashboard')
      // setCookie("token", temp.token, 8)
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        if (err.code === "ERR_BAD_REQUEST") {
          toastAlert("error", err.response.data.message)
        }
        console.error(err)
      })
  };

  return (
    <>
      <Auth>

        <div className="container mx-auto py-16 px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign in
                    </h6>
                  </div>
                  {/* <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                      Github
                    </button>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                      Google
                    </button>
                  </div> */}
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                  </div> */}
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      username: "",
                      password: ""
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting, values, errors }) => (
                      <Form className="w-full pt-5 sm:pt-5">
                        <div className="relative w-full mb-3">
                          <Input
                            label={"Username"}
                            name="username"
                            type="text"
                            placeholder="Masukkan Username"
                          />
                        </div>
                        {/* <div className="relative w-full mb-3">
                          <Input
                            label={"Password"}
                            name="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Masukkan Password"
                          />
                          <span onClick={togglePasswordVisibility} className={`cursor-pointer absolute inline-block right-5 ${errors.password ? "bottom-9" : values.password === "" ? "bottom-3" : "bottom-3"}`}>
                            {!show ? (
                              <EyeOff24Filled />
                            ) : (
                              <Eye24Filled />
                            )}
                          </span>
                        {/* <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                              Remember me
                            </span>
                          </label>
                        </div> */}
                        <div className="relative w-full mb-3">
                          <Input
                            label={"Password"}
                            name="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Masukkan Password"
                          />
                          <span onClick={togglePasswordVisibility} className={`cursor-pointer absolute right-5 ${errors.password ? "bottom-8" : values.password === "" ? "bottom-3" : "bottom-3"}`}>
                            {!show ? (
                              <EyeOff24Filled className={`absolute -right-2 bottom-1`} />
                            ) : (
                              <Eye24Filled className={`absolute -right-2 bottom-1`} />
                            )}
                          </span>
                        </div>
                        <div className="text-center grid w-full mt-6">
                          {!isLoading ? (
                            <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                              Sign In
                            </ButtonPrimary>
                          ) : (
                            <Loader
                              isbutton={true}
                              className="flex items-center py-3 lg:py-4 px-5 lg:px-7"
                              buttontext="Sending In..."
                            />
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  {/* <a

                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a> */}
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <div className="text-blueGray-200">
                      <small>Create new account</small>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
}
