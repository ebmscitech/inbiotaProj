import React from "react";

// components

import CardPartai from "@/components/Cards/CardPartai.js";
// import DapilModal from "@/components/Modals/DapilModal.js";

// layout for page

import Admin from "../../components/Layout/Admin.js";
import PartaiModal from "@/components/Modals/PartaiModal.js";

export default function Users() {
  return (
    <Admin>
      <div className="flex flex-wrap md:pt-32 pt-12">
        <div className="w-full mb-12 px-4">
          <CardPartai />
        </div>
      </div>
      <PartaiModal />
    </Admin>
  );
}
