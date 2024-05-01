import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "../../components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "../../components/Dropdowns/UserDropdown.js";
import { List28Filled } from "@fluentui/react-icons";
import { usePathname } from "next/navigation.js";
import Image from "next/image.js";
import { getUserRole } from "@/utils/storage.js";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role or perform any asynchronous operation
    const fetchedUserRole = getUserRole();
    setUserRole(fetchedUserRole);
  }, []); // Run only once on mount

  if (userRole === null) {
    // If userRole is still null, you can show a loading state or return null
    return null;
  }

  return (
    <>
      {userRole && (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-neutral-500 opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-black-500 m-2 py-3 px-6")}
            >
              {/* <i className="fas fa-bars"></i> */}
              <List28Filled className="font-bold" />
            </button>
            {/* Brand */}
            <Link href="/">
              <div className="col-start-1 col-end-2 flex items-center">
                <Image
                  src="/assets/aspirasi-logo.png"
                  alt="Aspirasi Logo"
                  quality={100}
                  width={170}
                  height={80}
                // layout="responsive"
                />
              </div>
            </Link>
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                <NotificationDropdown />
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col bg-white-500 md:items-stretch min-h-screen sm:min-h-full md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-neutral-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link href="/">
                      <div className="col-start-1 col-end-2 flex items-center">
                        <Image
                          src="/assets/aspirasi-logo.png"
                          alt="Aspirasi Logo"
                          quality={100}
                          width={170}
                          height={80}
                        // layout="responsive"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-neutral-600 opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <span className="bg-transparent h-6 w-6 text-2xl font-bold block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-2 h-12 border border-solid  border-neutral-500 placeholder-neutral-300 text-neutral-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link href="/admin/dashboard">
                    <div

                      className={
                        "text-xs uppercase py-3 font-bold block rounded-lg " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? " bg-secondary-100 hover:bg-secondary-100"
                          : "text-neutral-700 hover:text-neutral-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/dashboard") !== -1
                            ? "opacity-75"
                            : "text-neutral-300")
                        }
                      ></i>{" "}
                      Dashboard
                    </div>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/aspirations">
                    <div

                      className={
                        "text-xs uppercase py-3 font-bold block rounded-lg " +
                        (router.pathname.indexOf("/admin/aspirations") !== -1
                          ? " bg-secondary-100 hover:bg-secondary-100"
                          : "text-neutral-700 hover:text-neutral-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-table mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/aspirations") !== -1
                            ? "opacity-75"
                            : "text-neutral-300")
                        }
                      ></i>{" "}
                      Aspirasi
                    </div>
                  </Link>
                </li>
              </ul>
              {/* Heading */}
              <h6 className={`${userRole === "caleg" ? "hidden" : ""} md:min-w-full text-neutral-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline`}>
                Master Data
              </h6>
              {/* Navigation */}

              <ul className={`md:flex-col md:min-w-full flex flex-col list-none ${userRole === "caleg" ? "hidden" : ""}`}>
                <li className={`items-center`}>
                  <Link href="/admin/users">
                    <div

                      className={
                        "text-xs uppercase py-3 font-bold block rounded-lg " +
                        (router.pathname.indexOf("/admin/users") !== -1
                          ? " bg-secondary-100 hover:bg-secondary-100"
                          : "text-neutral-700 hover:text-neutral-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-table mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/users") !== -1
                            ? "opacity-75"
                            : "text-neutral-300")
                        }
                      ></i>{" "}
                      Management User
                    </div>
                  </Link>
                </li>
                {/* <li className="items-center">
                <Link href="/admin/aspirations">
                  <div

                    className={
                      "text-xs uppercase py-3 font-bold block rounded-lg " +
                      (router.pathname.indexOf("/admin/aspirations") !== -1
                        ? " bg-secondary-100 hover:bg-secondary-100"
                        : "text-neutral-700 hover:text-neutral-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/aspirations") !== -1
                          ? "opacity-75"
                          : "text-neutral-300")
                      }
                    ></i>{" "}
                    Aspirasi
                  </div>
                </Link>
              </li> */}
                <li className={`items-center`}>
                  <Link href="/admin/dapil">
                    <div
                      className={
                        "text-xs uppercase py-3 font-bold block rounded-lg " +
                        (router.pathname.indexOf("/admin/dapil") !== -1
                          ? " bg-secondary-100 hover:bg-secondary-100"
                          : "text-neutral-700 hover:text-neutral-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-table mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/dapil") !== -1
                            ? "opacity-75"
                            : "text-neutral-300")
                        }
                      ></i>{" "}
                      Dapil
                    </div>
                  </Link>
                </li>
                <li className={`items-center`}>
                  <Link href="/admin/partai">
                    <div
                      className={
                        "text-xs uppercase py-3 font-bold block rounded-lg " +
                        (router.pathname.indexOf("/admin/partai") !== -1
                          ? " bg-secondary-100 hover:bg-secondary-100"
                          : "text-neutral-700 hover:text-neutral-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-table mr-2 text-sm " +
                          (router.pathname.indexOf("/admin/partai") !== -1
                            ? "opacity-75"
                            : "text-neutral-300")
                        }
                      ></i>{" "}
                      Partai
                    </div>
                  </Link>
                </li>
              </ul>

              {/* <hr className="my-4 md:min-w-full" />

            <h6 className="md:min-w-full text-neutral-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/auth/login">
                  <div

                    className="text-neutral-700 hover:text-neutral-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-fingerprint text-neutral-400 mr-2 text-sm"></i>{" "}
                    Login
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/auth/register">
                  <div

                    className="text-neutral-700 hover:text-neutral-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-clipboard-list text-neutral-300 mr-2 text-sm"></i>{" "}
                    Register
                  </div>
                </Link>
              </li>
            </ul> */}

              {/* <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-neutral-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              No Layout Pages
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/landing">
                  <div

                    className="text-neutral-700 hover:text-neutral-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-newspaper text-neutral-400 mr-2 text-sm"></i>{" "}
                    Landing Page
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/profile">
                  <div

                    className="text-neutral-700 hover:text-neutral-500 text-xs uppercase py-3 font-bold block"
                  >
                    <i className="fas fa-user-circle text-neutral-400 mr-2 text-sm"></i>{" "}
                    My Profile Page
                  </div>
                </Link>
              </li>
            </ul> */}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
