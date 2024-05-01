import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// components
import { useDispatch, useSelector } from "react-redux";
import { getUserId, getUsername } from "@/utils/storage.js";
import TabNavigation from "../Tab/index.js";
import { setActiveTab } from "@/redux/profile.js";
import TabContent from "../Tab/TabContent.js";
import DataCaleg from "../Profile/DataCaleg.js";
import Organization from "../Profile/Organization.js";
import { getCaleg } from "@/redux/caleg.js";
import toastAlert from "@/utils/alert.js";
import { noValue } from "@/utils/validateInput.js";
import Achievement from "../Profile/Achievement.js";
import Education from "../Profile/Education.js";
import Background from "../Profile/Background.js";

function CardProfile({ color }) {
  const username = getUsername()
  const userId = getUserId()
  const dispatch = useDispatch()
  const active = useSelector((state) => state.profile.activeTab);
  const [dataAccount, setDataAccount] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const toggle = tab => {
    if (active !== tab) {
      dispatch(setActiveTab(tab))
    }
  }

  async function getDataCaleg(username) {
    let params = {
      username: username
    }
    setIsLoading(true)
    await dispatch(getCaleg(params)).then((res) => {
      setIsLoading(false);
      var temp = res.payload.data
      var tempAccount = temp.account
      console.log("ini get detail caleg", temp)
    })
      .catch((err) => {
        setIsLoading(false);
        toastAlert("error", "Proses mendapatkan data caleg sedang gangguan");
        console.error(err);
      });
  }

  useEffect(() => {
    if (!noValue(username)) {
      getDataCaleg(username)
      console.log("ini username card profile", username)
    }
  }, [username])

  const components = [
    <DataCaleg isLoading={isLoading} />,
    <Achievement />,
    <Organization />,
    <Education />,
    <Background />,
  ];

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded " +
          (color === "light" ? "bg-w-50" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-b">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-neutral-700" : "text-white")
                }
              >
                Edit Profile
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full p-8 overflow-x-hidden overflow-y-hidden">
          <TabNavigation toggle={toggle} />
          <TabContent components={components} active={active} />
        </div>
      </div>
    </>
  );
}

CardProfile.defaultProps = {
  color: "light",
};

CardProfile.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardProfile;
