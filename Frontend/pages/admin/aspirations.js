import React from "react";

// components

import CardAspirations from "@/components/Cards/CardAspirations.js";
// import DapilModal from "@/components/Modals/DapilModal.js";

// layout for page

import Admin from "../../components/Layout/Admin.js";

export default function Users() {
  return (
    <Admin>
      <div className="flex flex-wrap md:pt-32 pt-12">
        <div className="w-full mb-12 px-4">
          <CardAspirations />
        </div>
      </div>
      {/* <DapilModal /> */}
    </Admin>
  );
}