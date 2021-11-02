import React from "react";
import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Loader type="Puff" color="#12B980" height={550} width={80} />
    </div>
  );
}
