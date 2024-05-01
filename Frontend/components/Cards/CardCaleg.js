import React from "react";
import ButtonPrimary from "../misc/ButtonPrimary";
import ButtonSecondary from "../misc/ButtonSecondary";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsAspirasiModal, setSelectedCaleg } from "@/redux/aspirasi";
import moment from "moment";

// components

export default function CardCaleg({ dataCaleg = {}, isButton = false }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(setIsAspirasiModal(true))
    let data = {
      id: dataCaleg?._id,
      name: dataCaleg?.full_name
    }
    dispatch(setSelectedCaleg(data))
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="flex flex-wrap justify-center">
          <div className="w-full text-center px-1">
            <div className="p-5">
              <img className="w-32 h-32 rounded-full mx-auto object-cover object-center"
                src={`${dataCaleg?.profile_picture ? dataCaleg?.profile_picture : "/assets/avatar-no-image.png"} `}
                alt="Profile picture"
              />
              <h1 className="text-center text-xl font-semibold mt-3 pb-5">
                {dataCaleg?.full_name}
              </h1>
              <h2 className="font-semibold pb-3">
                {dataCaleg?.partai?.name}
              </h2>
              {dataCaleg?.no_urut &&
                <h2 className="font-semibold pb-3">
                  Nomor Urut {dataCaleg?.no_urut}
                </h2>
              }
              <h3 className="font-semibold">
                {dataCaleg?.lembaga === "DPRD Kota / Kabupaten" ? "" : "Dapil "}
                {dataCaleg?.dapil?.name}
              </h3>
              <h4 className="font-semibold pb-3">
                {dataCaleg?.lembaga}
              </h4>
              {!isButton &&
                <div className="font-semibold">
                  {moment(dataCaleg?.birth_date).format('DD/MM/YYYY')}
                </div>}
              {isButton ?
                <>
                  <div className="">
                    <div className="mt-5">
                      <ButtonSecondary addClass={"block w-full py-2 lg:py-2"} onClick={() => router.push(`/list-caleg/${dataCaleg?.username}`)}>
                        Lihat Detail
                      </ButtonSecondary>
                    </div>
                    <div className="mt-5">
                      <ButtonPrimary type='button' onClick={() => handleOpenModal()} addClass={"block w-full py-2 lg:py-2 px-5 lg:px-7"}>
                        Submit Aspirasi
                      </ButtonPrimary>
                    </div>
                  </div>
                </> : <>
                </>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
