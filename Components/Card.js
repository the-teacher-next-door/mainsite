import React from "react";
import SBtn from "./SBtn";
import Link from "next/link";
const Card = props => (
  <Link
    as={`/my-blog/${
      props.category === "ideas"
        ? "classroom-ideas"
        : props.category.toLowerCase()
    }/${props.cleanTitle}`}
    href={`/blog?q=${props.cleanTitle}`}
  >
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.img} alt={props.title} />
        </figure>
      </div>
    </div>
  </Link>
);

export default Card;
