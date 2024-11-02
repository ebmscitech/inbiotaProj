import React from "react";

// components

import CardDapil from "@/components/Cards/CardDapil.js";
import DapilModal from "@/components/Modals/DapilModal.js";

// layout for page

import Admin from "../../components/Layout/Admin.js";

export default function Dapil() {
  return (
    <Admin>
      <div className="flex flex-wrap md:pt-32 pt-12">
        <div className="w-full mb-12 px-4">
          <CardDapil />
        </div>
      </div>
      <DapilModal />
    </Admin>
  );
}
