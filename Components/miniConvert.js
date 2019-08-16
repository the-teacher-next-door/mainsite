import React from "react";
import PBtn from "./PBtn";
import Link from "next/link";
const MiniConvert = props => (
  <div className="container-fluid miniConvert">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-5">
          <div>
            <h1>JOIN MY NEWSLETTER</h1>
            <h2>
              Gain access to a library of FREE resources for upper elementary
              grades!
            </h2>
          </div>
        </div>
        <div className="column is-2 right-column">
          <Link href={`/freebies-register`}>
            <a>
              <PBtn>SUBSCRIBE</PBtn>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default MiniConvert;
