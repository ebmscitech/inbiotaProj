import React, { useEffect, useState } from "react";
import ButtonPrimary from "../misc/ButtonPrimary";
import Image from "next/image";
import { setIsAspirasiModal, setSelectedCaleg } from "@/redux/aspirasi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as fbq from '@/lib/fpixel'
import { isObjEmpty } from "@/utils/index";
import Loader from "../Loader";
import MetaPixel from "../MetaPixel";

// components

export default function CardCalegDetail({ dataCaleg = {}, isLoading }) {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.global);
  const [listAchievement, setListAchievement] = useState(dataCaleg?.achievements)
  const [listOrganization, setListOrganization] = useState(dataCaleg?.organizationHistories)
  const [listEducation, setListEducation] = useState(dataCaleg?.educationHistories)
  const [listCover, setListCover] = useState([])
  const [listVisi, setListVisi] = useState([])
  const [listMisi, setListMisi] = useState([])
  const [listBackground, setListBackground] = useState([])
  const [pixelData, setPixelData] = useState({})
  const [redirectLink, setRedirectLink] = useState("")
  const [isStickyButton, setIsStickyButton] = useState(false);

  const handleOpenModal = () => {
    dispatch(setIsAspirasiModal(true))
    let data = {
      id: dataCaleg?.account?._id,
      name: dataCaleg?.account?.full_name,
      pixelData: pixelData,
      redirectLink: redirectLink
    }
    dispatch(setSelectedCaleg(data))
    // fbq.event('ViewContent', {
    //   content_name: `Modal Aspirasi Caleg ${dataCaleg?.account?.full_name}`,
    //   content_category: 'Aspirasi > Detail Caleg > Modal Aspirasi',
    //   content_type: 'caleg',
    //   // content_ids: ['1234'],
    //   // currency: 'USD', 
    //   // value: 10
    // })
  }

  useEffect(() => {
    if (dataCaleg) {
      setListAchievement(dataCaleg?.achievements);
      setListOrganization(dataCaleg?.organizationHistories);
      setListEducation(dataCaleg?.educationHistories);
      setListVisi(dataCaleg?.account?.visi);
      setListMisi(dataCaleg?.account?.misi);
      setListBackground(dataCaleg?.backgrounds);
      setRedirectLink(dataCaleg?.account?.redirect_link ? dataCaleg?.account?.redirect_link : "")
      setIsStickyButton(dataCaleg?.account?.sticky_button)
      var tempListPixel = dataCaleg?.account?.pixel_id
      if (tempListPixel && tempListPixel.length > 0) {
        // const filteredPixelData = tempListPixel.filter((item) => item.action.value === 'Detail');
        // if (filteredPixelData) {
        // }
        setPixelData(tempListPixel)
        // console.log("ini PixelId", tempListPixel)
      } else {
        setPixelData([])
      }
      var tempCover = dataCaleg?.account?.cover;
      // console.log("ini detail caleg", dataCaleg)
      if (tempCover && tempCover.length > 0) {
        // console.log("ini temp cover", tempCover)
        setListCover(tempCover[0]);
      } else {
        setListCover([]);
      }
    }
  }, [dataCaleg]);

  const renderGagasan = (gagasanText) => {
    if (!gagasanText) {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
          <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
        </div>
      );
    }

    const gagasanPoints = gagasanText.split('\n').filter(point => point.trim() !== '');

    return (
      <ul className="text-neutral-400 leading-relaxed pl-4">
        {gagasanPoints.map((point, index) => (
          <li key={index} className="list-disc ml-1 mb-2">
            {point.trim().startsWith('-') ? point.trim().substring(1).trim() : point.trim()}
          </li>
        ))}
      </ul>
    );
  };

  const renderPixel = () => {
    if (!isObjEmpty(pixelData)) {
      const filteredPixelData = pixelData.filter((item) => item.action.value === 'Detail');
      if (filteredPixelData) {
        return <MetaPixel pixelData={filteredPixelData[0]} dataCaleg={dataCaleg} />;
      } else {
        return null;
      }
    }
    return null;
  };

  return (
    <>
      {renderPixel()}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="flex flex-wrap ">
          <div className="w-full px-1">
            {!isLoading ?
              <>
                <div className="p-5">
                  <div className="mb-5">
                    <Image className="rounded-xl lg:rounded-3xl" src={`${listCover.length > 0 ? listCover : "/assets/profile-cover.svg"}`} width={897} height={240} alt="Profile Cover" />
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Gagasan
                    </h1>
                    {renderGagasan(dataCaleg?.account?.gagasan)}
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Visi
                    </h1>
                    {listVisi?.length > 0 ?
                      <ul className="text-neutral-400 leading-relaxed pl-4">
                        {listVisi?.map((item, index) => {
                          return (
                            <li key={index} className="list-disc ml-1 mb-2">
                              {item.description}
                            </li>
                          )
                        })}
                      </ul> :
                      <div className="flex flex-col justify-center items-center w-full">
                        <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                        <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                      </div>
                    }
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Misi
                    </h1>
                    {listMisi?.length > 0 ?
                      <ul className="text-neutral-400 leading-relaxed pl-4">
                        {listMisi?.map((item, index) => {
                          return (
                            <li key={index} className="list-disc ml-1 mb-2">
                              {item.description}
                            </li>
                          )
                        })}
                      </ul> :
                      <div className="flex flex-col justify-center items-center w-full">
                        <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                        <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                      </div>
                    }
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Latar Belakang
                    </h1>
                    {listBackground?.length > 0 ?
                      <ul className="text-neutral-400 leading-relaxed pl-4">
                        {listBackground?.map((item, index) => {
                          return (
                            <li key={index} className="list-disc ml-1 mb-2">
                              {item.name}
                            </li>
                          )
                        })}
                      </ul> :
                      <div className="flex flex-col justify-center items-center w-full">
                        <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                        <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                      </div>
                    }
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Prestasi
                    </h1>
                    {listAchievement?.length > 0 ?
                      <ul className="text-neutral-400 leading-relaxed pl-4">
                        {listAchievement?.map((item, index) => {
                          return (
                            <li key={index} className="list-disc ml-1 mb-2">
                              {item.name}
                            </li>
                          )
                        })}
                      </ul> :
                      <div className="flex flex-col justify-center items-center w-full">
                        <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                        <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                      </div>
                    }
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Pengalaman Organisasi
                    </h1>
                    {listOrganization?.length > 0 ?
                      <>
                        {listOrganization?.map((item, index) => {
                          return (
                            <div key={index} className="mb-5">
                              <div className="flex place-items-center">
                                <span className="min-w-max text-secondary-600 font-bold w-1/6 pr-7 sm:pr-0">
                                  Tahun {moment(item?.start_date).format('YYYY')} - {moment(item?.end_date).format('YYYY')}
                                </span>
                                <hr className="w-5/6 border border-secondary-600 border-solid" />
                              </div>
                              <div className="mb-5">
                                <h2 className="font-semibold text-neutral-400 py-5">
                                  {item?.position}{" "}{item?.name}
                                </h2>
                                {/* <p className="text-neutral-400 leading-relaxed">
                            {item?.description}
                          </p> */}
                              </div>
                            </div>
                          )
                        })}
                      </> :
                      <div className="flex flex-col justify-center items-center w-full">
                        <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                        <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                      </div>
                    }
                  </div>
                  <div className="mb-5">
                    <h1 className="font-semibold text-neutral-400 text-xl py-5">
                      Pendidikan
                    </h1>
                    <div className="relative px-4">
                      {listEducation?.length > 0 ?
                        <>
                          <div className="absolute h-full border border-solid border-opacity-20 border-primary-600"></div>
                          {listEducation?.map((item, index) => {
                            return (
                              <div key={index} className="flex items-center w-full my-6 -ml-1.5">
                                <div className="w-1/12 z-10">
                                  <div className="w-3.5 h-3.5 bg-primary-600 rounded-full"></div>
                                </div>
                                <div className="w-11/12 text-neutral-400">
                                  <p className="font-bold">{item?.name}</p>
                                  <p className="text-sm">{moment(item?.start_date).format('MMMM YYYY')} - {moment(item?.graduation_date).format('MMMM YYYY')}</p>
                                </div>
                              </div>
                            )
                          })}
                        </> :
                        <div className="flex flex-col justify-center items-center w-full">
                          <Image src="/assets/no-data-1.svg" width={144} height={123} alt="No Data" />
                          <h1 className="text-xl font-semibold text-neutral-100 mt-5">Tidak ada data</h1>
                        </div>
                      }
                    </div>
                  </div>
                  {!isStickyButton ?
                    <>
                      <div className="py-5">
                        <hr className="w-full border border-neutral-100 border-solid" />
                      </div>
                      <div className="flex flex-row-reverse my-5">
                        <ButtonPrimary type='button' onClick={() => handleOpenModal()} addClass={"py-3 lg:py-4 px-5 lg:px-7"}>Sampaikan Aspirasi</ButtonPrimary>
                      </div>
                    </> :
                    <div className="sm:bottom-0 bottom-[3.4rem] left-0 fixed w-full bg-w-50 text-center">
                      <div className="py-2.5">
                        <ButtonPrimary type='button' onClick={() => handleOpenModal()} addClass={"py-3 lg:py-4 px-5 lg:px-7"}>Sampaikan Aspirasi</ButtonPrimary>
                      </div>
                    </div>
                  }
                </div>
              </> : <>
                <div className="grid h-[364px]">
                  <Loader isloading={isLoading} />
                </div>
              </>}
          </div>
        </div>
      </div>
    </>
  );
}
