import React, { useEffect, useState } from "react";
import Auth from "@/components/Layout/Auth.js";
import RegisterImage from "../../public/assets/register.svg"
import Select, { components, StylesConfig } from "react-select";
import { isObjEmpty, selectThemeColors } from "@/utils/index";
import ButtonPrimary from "@/components/misc/ButtonPrimary.js";
import ButtonSecondary from "@/components/misc/ButtonSecondary.js";
import { useDispatch, useSelector } from "react-redux";
import RegisterModal from "@/components/Modals/RegisterModal.js";
import { Form, Formik } from "formik";
import Input from "@/components/Fields/Input.js";
import { RegisterSchema } from "@/validation/index.js";
import Loader from "@/components/Loader/index.js";
import { useRouter } from 'next/navigation'
import { setIsRegisterModal } from "@/redux/auth.js";
import { Eye24Filled, EyeOff24Filled } from "@fluentui/react-icons";
import { postAuth } from "@/api/index";
import toastAlert from "@/utils/alert";
import { getListDapil, getListPartai } from "@/redux/global";
import DatePicker from "@/components/DatePicker";
import moment from "moment";
import { noValue } from "@/utils/validateInput";
import Inforial2 from "@/components/Inforial-2";
import RadioInput from "@/components/Fields/Radio";
import CustomCheckbox from "@/components/Fields/Checkbox";

export default function Register() {
  const dispatch = useDispatch()
  const router = useRouter()
  const store = useSelector((state) => state.global);

  const [birthDate, setBirthDate] = useState(new Date());
  const [listDapil, setListDapil] = useState([]);
  const [dapil, setDapil] = useState({
    value: "",
    label: "Pilih Dapil"
  });
  const [listPartai, setListPartai] = useState([]);
  const [partai, setPartai] = useState({
    value: "",
    label: "Pilih Partai"
  });

  const [lembaga, setLembaga] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const DropdownComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center cursor-pointer">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  useEffect(() => {
    if (!isObjEmpty(store?.listPartai)) {
      console.log("ini list Partai register", store?.listPartai)
      var tempList = store?.listPartai
      const temp = tempList.map((v, index) => {
        return {
          label: v.name,
          value: v._id
        }
      });
      setListPartai(temp)
    } else {
      dispatch(getListPartai())
    }
  }, [store?.listPartai])

  useEffect(() => {
    if (!isObjEmpty(store?.listDapil)) {
      console.log("ini list Dapil register", store?.listDapil)
      var tempList = store?.listDapil
      const temp = tempList.map((v, index) => {
        return {
          label: v.name,
          value: v._id
        }
      });
      setListDapil(temp)
    } else {
      dispatch(getListDapil())
    }
  }, [store?.listDapil])

  useEffect(() => {
    if (!noValue(lembaga)) {
      // console.log("ini lembaga", lembaga)
      // dispatch(getListDapil())
    }
  }, [lembaga])

  const onSubmit = async (values, actions) => {
    let data = {
      role: "caleg",
      partai: partai.value,
      dapil: dapil.value,
      birth_date: moment(birthDate).format('YYYY-MM-DD'),
      lembaga: lembaga
    }
    let validatedData = {
      ...data,
      ...values,
    };
    if (
      partai.value !== "" &&
      dapil.value !== "" &&
      lembaga !== ""
    ) {
      console.log("udah di validasi", validatedData)
      setIsLoading(true);

      postAuth(validatedData, '/register').then((res) => {
        setIsLoading(false)
        console.log("ini post register", res)
        dispatch(setIsRegisterModal(true))
        toastAlert("success", "Berhasil daftar sebagai caleg !")
      })
        .catch((err) => {
          setIsLoading(false)
          console.log(err)
          if (err.code === "ERR_BAD_REQUEST") {
            toastAlert("error", err.response.data.message)
          }
          console.error(err)
        })
    } else {
      toastAlert(
        "warning",
        "Mohon untuk melengkapi dokumen terlebih dahulu !"
      );
    }
  };

  return (
    <>
      <Auth>
        <div className="min-h-[75vh] md:min-h-[80vh] justify-items-center items-center grid px-5 pb-10">
          {/* <div className="relative overflow-hidden lg:flex w-1/2 bg-white-200 items-center justify-center hidden">
            <div className="px-5">
              <RegisterImage />
            </div>
          </div> */}
          <div className="w-full">
            <Inforial2 />
          </div>
          <div className="max-w-5xl w-full z-10 justify-center items-center bg-white">
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
                          label={"No Handphone"}
                          name="mobile_phone"
                          type="text"
                          placeholder="Enter No Handphone"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <label
                          htmlFor="birth_date"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Tanggal Lahir
                        </label>
                        <DatePicker
                          selected={birthDate}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date) => setBirthDate(date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Hometown"}
                          name="home_town"
                          type="text"
                          placeholder="Enter Hometown"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Address"}
                          name="address"
                          type="text"
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Username"}
                          name="username"
                          type="text"
                          placeholder="Enter Username"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      By signing up you are consenting for us to contact you with Inbiota updates.
                    </div>
                    <CustomCheckbox
                      label="I agree to receive Inbiota updates"
                      name="agreeToUpdates"
                    />
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
          <div
            className="absolute top-0 right-0 sm:right-52 bottom-72 w-2/5 sm:w-w-[45%] bg-no-repeat bg-right"
            style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "230px 230px" }}
          ></div>
          <div
            className="absolute top-0 left-48 bottom-96 w-2/5 sm:w-w-[45%] bg-no-repeat bg-left"
            style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "230px 230px" }}
          ></div>
          <div
            className="absolute top-0 left-0 bottom-0 w-2/5 sm:w-[45%] bg-no-repeat bg-bottom bg-mobile-size"
            style={{ backgroundImage: `url('/assets/molecules.svg')`, backgroundSize: "330px 330px" }}
          ></div>
        </div>
        <RegisterModal />
      </Auth>
    </>
  );
}
