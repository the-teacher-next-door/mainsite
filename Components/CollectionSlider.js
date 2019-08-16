import React, { Component } from "react";
import PBtn from "./PBtn";
import Slider from "react-slick";
import Present from "../images/Q.png";
import api from "../utils/api";
import Link from "next/link";
class CollectionSlider extends Component {
  componentDidMount() {
    console.log(this.props.items);
  }
  render() {
    var settings = {
      infinite: true,
      autoplay: true,
      cssEase: "linear",
      speed: 3000,
      slidesToShow: 3,
      arrows: false
    };
    return (
      <div className="container-fluid collections border-bottom padding-30">
        <div className="container">
          <img src={Present} alt="" />
          <h1 className="padding-bottom-30">My Products</h1>
          <Slider {...settings}>
            {this.props.items.map((item, index) => {
              return (
                <Link href={item.link}>
                  <a>
                    <img src={item.img} alt="" />
                  </a>
                </Link>
              );
            })}
          </Slider>
          <div className="columns is-centered margin-top-30">
            <div className="column is-2">
              <PBtn
                link="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door"
                external={true}
              >
                Visit My Shop
              </PBtn>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionSlider;
