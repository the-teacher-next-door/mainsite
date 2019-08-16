import React from "react";
import dynamic from "next/dynamic";
const DynamicComponent = dynamic((...props) => import("./Editor"), {
  ssr: false
});

export default DynamicComponent;
