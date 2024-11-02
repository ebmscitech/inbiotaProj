import React, { useMemo, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import SearchBox from "./misc/SearchBox";
import { useRouter } from "next/navigation";
import Diamond from "../public/assets/diamond.svg";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import { RegisterSchema } from "@/validation/index.js";
import Loader from "@/components/Loader/index.js";
import CustomCheckbox from "./Fields/Checkbox";
import Inforial2 from "./Inforial-2";
import Instagram from "../public/assets/Icon/instagram.svg";

const ContactInfo = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    console.log("ini submit")
    // let data = {
    //   role: "caleg",
    //   partai: partai.value,
    //   dapil: dapil.value,
    //   birth_date: moment(birthDate).format('YYYY-MM-DD'),
    //   lembaga: lembaga
    // }
    // let validatedData = {
    //   ...data,
    //   ...values,
    // };
    // if (
    //   partai.value !== "" &&
    //   dapil.value !== "" &&
    //   lembaga !== ""
    // ) {
    //   console.log("udah di validasi", validatedData)
    //   setIsLoading(true);

    //   postAuth(validatedData, '/register').then((res) => {
    //     setIsLoading(false)
    //     console.log("ini post register", res)
    //     dispatch(setIsRegisterModal(true))
    //     toastAlert("success", "Berhasil daftar sebagai caleg !")
    //   })
    //     .catch((err) => {
    //       setIsLoading(false)
    //       console.log(err)
    //       if (err.code === "ERR_BAD_REQUEST") {
    //         toastAlert("error", err.response.data.message)
    //       }
    //       console.error(err)
    //     })
    // } else {
    //   toastAlert(
    //     "warning",
    //     "Mohon untuk melengkapi dokumen terlebih dahulu !"
    //   );
    // }
  };

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="inforial-1"
    >
      {/* <SearchBox /> */}
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}>
          <div className="flex flex-col justify-center items-start row-start-1 z-10">
            <div className="relative mb-8">
              {/* <div className="absolute h-full -left-5 sm:-left-8 border-[3px] border-solid border-opacity-20 border-secondary-500"></div> */}
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-white-300 leading-normal">
                <strong>Our Contact
                  <p className="from-[#FF5DD9] bg-clip-text text-transparent bg-gradient-to-r to-[#890670]">Get In Touch</p></strong>
              </h1>
            </div>
            <h2 className="mb-16">
              <strong className="text-deactive-500 text-[26px] mb-1">CONTACT INFO</strong>
              <p className="text-white-500 mb-1">team@ebmscitech.com</p>
              <p className="text-white-500">(022) 82044193</p>
            </h2>
            <h3 className="mb-16">
              <strong className="text-deactive-500 text-[26px] mb-1">ADDRESS</strong>
              <p className="text-white-500 mb-1">Jl. Bukit Raya No.582, Kp. Sekejulang, Ciumbuleuit, Cidadap, Bandung 40142, Jawa Barat, Indonesia</p>
              <p className="text-white-500 text-sm">follow me on:</p>
              <Instagram className="h-6 w-6 fill-[#E3AE68]" />
            </h3>
            {/* <p className="text-white-500 text-[26px] font-medium mt-4 mb-6">
              Inbiota is a database software which plants data with
              compound containted in it. A breaktrough for natural
              product research using AI to help finding data.
            </p> */}
            {/* <ButtonPrimary type='button' onClick={() => router.push('/search')}
              addClass={"py-3 lg:py-4 px-10 lg:px-12"}>
              Get Started!
            </ButtonPrimary> */}
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div
        className="absolute hidden sm:flex -top-0 right-0 sm:-right-96 bottom-0 w-2/5 z-0 sm:w-[110%] bg-no-repeat bg-right bg-mobile-size lg:bg-cover"
        style={{ backgroundImage: `url('/assets/diamond.png')` }}
      ></div>
      <div
        className="absolute top-0 -left-10 -bottom-[33rem] w-2/5 sm:w-w-[45%] bg-no-repeat bg-right"
        style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "400px 400px" }}
      ></div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          full_name: "",
          birth_place: "",
          mobile_phone: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, errors }) => (
          <Form className="w-full px-10">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Input
                    labelColor="text-white-500"
                    label={"Complete Name"}
                    name="full_name"
                    type="text"
                    placeholder="Enter Complete Name"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Input
                    labelColor="text-white-500"
                    label={"Email Address"}
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Input
                    labelColor="text-white-500"
                    label={"No Handphone"}
                    name="mobile_phone"
                    type="text"
                    placeholder="Enter No Handphone"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <Input
                    labelColor="text-white-500"
                    label={"Address"}
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3">
                <div className="mb-5">
                  <Input
                    labelColor="text-white-500"
                    label={"Username"}
                    name="username"
                    type="textarea"
                    placeholder="Enter Username"
                  />
                </div>
              </div>
            </div>
            <div className="w-full grid text-center place-items-center">
              <div className="w-full sm:w-1/2 mb-3">
                You can unsubscribe from these communications at any time.
                For more information please review our privacy policy.
              </div>
              {!isLoading ? (
                <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-24 lg:px-28"}>
                  Submit
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
  );
};

export default ContactInfo;
