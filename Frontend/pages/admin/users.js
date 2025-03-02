import React from "react";

// components

// import CardUsers from "@/components/Cards/CardUsers.js";
// import ConfirmationModal from "@/components/Modals/ConfirmationModal.js";

// layout for page

import Admin from "../../components/Layout/Admin.js";

export default function Users() {
  return (
    <Admin>
      <div className="flex flex-wrap md:pt-32 pt-12">
        <div className="w-full mb-12 px-4">
          {/* <CardUsers /> */}
        </div>
      </div>
      {/* <ConfirmationModal /> */}
    </Admin>
  );
}
