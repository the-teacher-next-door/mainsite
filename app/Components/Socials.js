import React from "react";
import Link from "next/link";
const Socials = props => (
  <Link href={props.href}>
    <a className="socials">{props.children}</a>
  </Link>
);
export default Socials;
