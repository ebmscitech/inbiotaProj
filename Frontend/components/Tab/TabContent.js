// components/TabContent.js
import React from 'react';

const TabContent = ({ active, components = [] }) => {
    return (
        <div className="p-4">
            <div>
                {components[active - 1]}
            </div>
        </div>
    );
};

export default TabContent;
