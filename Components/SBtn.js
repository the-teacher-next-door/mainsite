import React from "react";
import Link from "next/link";

const SBtn = props => (
  <React.Fragment>
    {props.link === undefined ? (
      <button
        type={props.type}
        className={`button secondary-button ${props.className}`}
        onClick={props.onClick}
        data-data={props.data}
      >
        {props.children}
      </button>
    ) : (
      ""
    )}
    {props.external ? (
      <Link href={props.link}>
        <a
          className={`secondary-button ${props.className}`}
          target={props.external ? "_blank" : ""}
        >
          {props.children}
        </a>
      </Link>
    ) : (
      ""
    )}

    {props.external === false ? (
      <Link href={props.link}>
        <a
          className={`secondary-button ${props.className}`}
          target={props.external ? "_blank" : ""}
        >
          {props.children}
        </a>
      </Link>
    ) : (
      ""
    )}
  </React.Fragment>
);

export default SBtn;
