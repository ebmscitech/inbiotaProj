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
        <div className="min-h-[75vh] md:min-h-[80vh] md:flex px-5">
          <div className="relative overflow-hidden lg:flex w-1/2 bg-white-200 items-center justify-center hidden">
            <div className="px-5">
              <RegisterImage />
            </div>
          </div>
          <div className="flex lg:w-1/2 justify-center items-center bg-white">
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
                  <div className="flex place-items-center mb-5">
                    <span className="text-xl min-w-max font-bold w-1/5 pr-7 sm:pr-0">
                      Data Diri
                    </span>
                    <hr className="w-4/5" style={{ border: '1px solid black' }} />
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Nama Lengkap"}
                          name="full_name"
                          type="text"
                          placeholder="Masukkan Nama Lengkap"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Tempat Lahir"}
                          name="birth_place"
                          type="text"
                          placeholder="Masukkan Nama Tempat"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3 flex flex-wrap">
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
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"No Handphone"}
                          name="mobile_phone"
                          type="text"
                          placeholder="Masukkan No Handphone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Email"}
                          name="email"
                          type="email"
                          placeholder="Masukkan Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex place-items-center mb-5">
                    <span className="text-xl min-w-max font-bold w-1/5 pr-7 sm:pr-0">
                      Data Caleg
                    </span>
                    <hr className="w-4/5" style={{ border: '1px solid black' }} />
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="mb-5 px-3">
                      <label
                        htmlFor="dapil"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Lembaga
                      </label>
                      <div className="w-full grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 justify-items-start items-center">
                        <div className="grid justify-items-center" >
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPR"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => setLembaga("DPR")}
                              />
                              <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPR
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="grid justify-items-center" >
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPD"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => setLembaga("DPD")}
                              />
                              <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPD
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="grid justify-items-center" >
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPRD Provinsi"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => setLembaga("DPRD Provinsi")}
                              />
                              <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPRD Provinsi
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="grid justify-items-center" >
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="lembaga-radio"
                                type="radio"
                                checked={lembaga === "DPRD Kota / Kabupaten"}
                                className="border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                onChange={() => setLembaga("DPRD Kota / Kabupaten")}
                              />
                              <span className="min-w-max ml-2 text-sm font-semibold text-blueGray-600">
                                DPRD Kota / Kabupaten
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <label
                          htmlFor="dapil"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Partai
                        </label>
                        <Select
                          id="partai-select"
                          className={"react-select"}
                          classNamePrefix="select"
                          // isClearable={false}
                          isSearchable={true}
                          options={listPartai}
                          // styles={colourStyles}
                          theme={selectThemeColors}
                          value={partai}
                          onChange={(data) => setPartai(data)}
                          components={{ Option: DropdownComponent }}
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <label
                          htmlFor="dapil"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Dapil
                        </label>
                        <Select
                          id="dapil-select"
                          className={"react-select"}
                          classNamePrefix="select"
                          // isClearable={false}
                          isSearchable={true}
                          options={listDapil}
                          // styles={colourStyles}
                          theme={selectThemeColors}
                          value={dapil}
                          onChange={(data) => setDapil(data)}
                          components={{ Option: DropdownComponent }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex place-items-center mb-5">
                    <span className="text-xl min-w-max font-bold w-1/5 pr-7 sm:pr-0">
                      Akun
                    </span>
                    <hr className="w-4/5" style={{ border: '1px solid black' }} />
                  </div>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <Input
                          label={"Username"}
                          name="username"
                          type="text"
                          placeholder="Masukkan Username"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div className="mb-5">
                        <div className="relative items-center">
                          {/* <Input
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
                          </span> */}
                          <Input
                            label={"Password"}
                            name="password"
                            type={show ? 'text' : 'password'}
                            placeholder="Masukkan Password"
                          />
                          <span onClick={togglePasswordVisibility} className={`cursor-pointer absolute right-5 ${errors.password ? "bottom-8" : values.password === "" ? "bottom-3" :values.username === "" ? "bottom-":"bottom-3"}`}>
                            {!show ? (
                              <EyeOff24Filled className="absolute -right-2 bottom-1" />
                            ) : (
                              <Eye24Filled className="absolute -right-2 bottom-1" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse">
                    {!isLoading ? (
                      <ButtonPrimary type="submit" addClass={"py-3 lg:py-4 px-5 lg:px-7"}>
                        Daftar
                      </ButtonPrimary>
                    ) : (
                      <Loader
                        isbutton={true}
                        className="flex items-center py-3 lg:py-4 px-5 lg:px-7"
                        buttontext="Sending In..."
                      />
                    )}
                    <div className="pr-5">
                      <ButtonSecondary type="button" addClass={"py-3 lg:py-4 px-5 lg:px-7"} onClick={() => router.push('/')}>
                        Batal
                      </ButtonSecondary>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <RegisterModal />
      </Auth>
    </>
  );
}
