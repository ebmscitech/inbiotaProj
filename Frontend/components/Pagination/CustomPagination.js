import React from "react";
import { IosArrowLtr24Filled, IosArrowRtl24Filled } from "@fluentui/react-icons";

function CustomPagination({ active, setActive, totalPages }) {
  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <button size="sm" onClick={prev} disabled={active === 1}>
        <IosArrowLtr24Filled className="h-4 w-4" />
      </button>
      <div color="gray" className="font-normal">
        Page <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </div>
      <button size="sm" onClick={next} disabled={active === totalPages}>
        <IosArrowRtl24Filled strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}

export default CustomPagination;
