import React, { useState } from "react";
import Link from "next/link";

// layout for page

import Auth from "../../components/Layout/Auth.js";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import { LoginSchema } from "@/validation/index.js";
import ButtonPrimary from "@/components/misc/ButtonPrimary.js";
import Loader from "@/components/Loader/index.js";
import { postAuth } from "@/api/index.js";
import toastAlert from "@/utils/alert";
import { useRouter } from "next/navigation.js";
import { setStorage } from "@/utils/storage.js";
import Inforial2 from "@/components/Inforial-2.js";
import Cookies from 'js-cookie'

export default function Login() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log("udah di validasi", values)

    setIsLoading(true);

    postAuth(values, '/login').then((res) => {
      setIsLoading(false)
      console.log("ini post login", res)
      var temp = res.data || null
      toastAlert("success", temp.message)
      Cookies.set('api_token', temp.token, { expires: 7 }) // 7 day
      setStorage('HasLoged', true)
      router.push('/')
      actions.resetForm({
        values: {
          username: "",
          password: "",
        },
      });
    })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
        if (err.code === "ERR_BAD_REQUEST") {
          toastAlert("error", err.response.data.errors.message[0])
        }
        console.error(err)
      })
  };

  return (
    <>
      <Auth color={"[#080D28]"}>
        <div className="container mx-auto py-16 px-4 h-full">
          <div className="flex content-center items-center justify-start h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col z-10 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gradient-to-b from-[#E8BAEA33] to-[#62347133] border border-white-200">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-white-500 text-sm font-bold">
                      Sign in
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-white-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
                            labelColor="text-white-500"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <Input
                            label={"Password"}
                            name="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Masukkan Password"
                            labelColor="text-white-500"
                          />
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
            <div
              className="absolute hidden sm:flex -top-40 right-0 sm:-right-96 bottom-0 w-2/5 z-0 sm:w-[110%] bg-no-repeat bg-right bg-mobile-size lg:bg-cover"
              style={{ backgroundImage: `url('/assets/diamond.png')` }}
            ></div>
          </div>
        </div>
      </Auth>
      <div className="mt-0">
        <Inforial2 />
      </div>
    </>
  );
}
