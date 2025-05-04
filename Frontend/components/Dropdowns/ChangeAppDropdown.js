import React, { useEffect, useState } from "react"
import Link from "next/link"

export default function ChangeAccountDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [roles, setRoles] = useState([])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        // Run this only on the client to avoid hydration mismatch
        setRoles([
            { name: "User", href: "/" },
            { name: "Admin", href: "http://145.223.19.73:8000/indexadmin" }
        ])
    }, [])

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
            >
                {/* Change App */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.254 27C34.4967 27 35.504 28.0074 35.504 29.25V35.499C35.504 38.5371 33.0411 41 30.003 41C26.9648 41 24.5019 38.5371 24.5019 35.499V29.25C24.5019 28.0074 25.5093 27 26.7519 27H33.254ZM33.254 28.5H26.7519C26.3377 28.5 26.0019 28.8358 26.0019 29.25V35.499C26.0019 37.7087 27.7933 39.5 30.003 39.5C32.2127 39.5 34.004 37.7087 34.004 35.499V29.25C34.004 28.8358 33.6682 28.5 33.254 28.5ZM20.25 27L24.4065 27.0003C24.0118 27.4116 23.7243 27.9266 23.5888 28.5003L20.25 28.5C19.8358 28.5 19.5 28.8358 19.5 29.25V34.4988C19.5 36.1563 20.8437 37.5 22.5012 37.5C22.9421 37.5 23.3608 37.4049 23.7379 37.2342C23.8713 37.7236 24.0623 38.1899 24.3019 38.6257C23.7509 38.8663 23.1417 39 22.5012 39C20.0153 39 18 36.9847 18 34.4988V29.25C18 28.0074 19.0074 27 20.25 27ZM39.75 27C40.9926 27 42 28.0074 42 29.25V34.5C42 36.9853 39.9853 39 37.5 39C36.8609 39 36.253 38.8668 35.7024 38.6266L35.7581 38.5254C35.9722 38.1192 36.1445 37.6875 36.2693 37.2362C36.6438 37.4057 37.0609 37.5 37.5 37.5C39.1569 37.5 40.5 36.1569 40.5 34.5V29.25C40.5 28.8358 40.1642 28.5 39.75 28.5L36.4171 28.5003C36.2817 27.9266 35.9942 27.4116 35.5995 27.0003L39.75 27ZM30 19C31.933 19 33.5 20.567 33.5 22.5C33.5 24.433 31.933 26 30 26C28.067 26 26.5 24.433 26.5 22.5C26.5 20.567 28.067 19 30 19ZM38.003 20C39.6598 20 41.003 21.3431 41.003 23C41.003 24.6569 39.6598 26 38.003 26C36.3461 26 35.003 24.6569 35.003 23C35.003 21.3431 36.3461 20 38.003 20ZM21.997 20C23.6539 20 24.997 21.3431 24.997 23C24.997 24.6569 23.6539 26 21.997 26C20.3402 26 18.997 24.6569 18.997 23C18.997 21.3431 20.3402 20 21.997 20ZM30 20.5C28.8954 20.5 28 21.3954 28 22.5C28 23.6046 28.8954 24.5 30 24.5C31.1046 24.5 32 23.6046 32 22.5C32 21.3954 31.1046 20.5 30 20.5ZM38.003 21.5C37.1746 21.5 36.503 22.1716 36.503 23C36.503 23.8284 37.1746 24.5 38.003 24.5C38.8314 24.5 39.503 23.8284 39.503 23C39.503 22.1716 38.8314 21.5 38.003 21.5ZM21.997 21.5C21.1686 21.5 20.497 22.1716 20.497 23C20.497 23.8284 21.1686 24.5 21.997 24.5C22.8254 24.5 23.497 23.8284 23.497 23C23.497 22.1716 22.8254 21.5 21.997 21.5Z" fill="#FFFFFF" />
                </svg>
            </button>
            {/* <button
                className="bg-primary-500 border-warning-400 border text-white-500 py-2 px-6 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                change app
            </button> */}

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white-200 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        {roles.map((role) => (
                            <Link
                                key={role.name}
                                href={role.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {role.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
