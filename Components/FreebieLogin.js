import React from "react";
import PBtn from "./PBtn";
import Link from "next/link";
const MiniConvert = props => (
  <div className="container-fluid miniConvert">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-5">
          <div>
            <h1>Already joined my newsletter?</h1>
          </div>
        </div>
        <div className="column is-2 right-column">
          <Link href={`/teacher-freebies`}>
            <a>
              <PBtn>Login</PBtn>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default MiniConvert;
