// components/TabNavigation.js
import { useState } from 'react';

const passedTabStyle = {
    borderTop: "solid #AFB5C0",
    background: "none",
    paddingTop: "10.5px",
    paddingBottom: "10.5px",
    paddingLeft: "16.8px",
    paddingRight: "16.8px"
}

const activeTabStyle = {
    borderTop: "solid #425ae1",
    background: "none",
    paddingTop: "10.5px",
    paddingBottom: "10.5px",
    paddingLeft: "16.8px",
    paddingRight: "16.8px"
}

const TabNavigation = ({ active, toggle, store }) => {
    const tabs = ['Data Caleg', 'Prestasi', 'Pengalaman Organisasi', 'Riwayat Pendidikan', 'Latar Belakang'];
    const [activeTab, setActiveTab] = useState(1); // Assuming '1' is the default active tab

    return (
        <div className='flex justify-center mb-0 px-5 pt-5 pb-4'>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`py-3 px-5 cursor-pointer flex items-center ${activeTab === index + 1 ? "text-[#425ae1]" : "text-gray-400"}`}
                    style={activeTab === index + 1 ? activeTabStyle : passedTabStyle}
                    active={activeTab === index + 1}
                    onClick={() => {
                        setActiveTab(index + 1);
                        toggle(index + 1);
                    }}
                >
                    <div className="font-medium pt-1">
                        {tab}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TabNavigation;
