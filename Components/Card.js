import React from "react";
import SBtn from "./SBtn";
import Link from "next/link";
const Card = props => (
  <Link
    as={`/my-blog/${
      props.category === "Ideas"
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

      {/* <div className="card-body">
      <h2 className="card-title">{props.title}</h2>
    </div> */}
      {/* <div className="card-footer">
      <p className="card-footer-item">
        <Link href={`/${props.category}`}>
          <a>{props.category}</a>
        </Link>
      </p>
      <div className="card-footer-item">
        <Link
          as={`/my-blog/${props.category}/${props.cleanTitle}`}
          href={`/blog?q=${props.cleanTitle}`}
        >
          <a>
            <SBtn>Read More</SBtn>
          </a>
        </Link>
      </div>
    </div> */}
    </div>
  </Link>
);

export default Card;
