import React, { Component } from "react";
import PBtn from "./PBtn";
import Slider from "react-slick";
import Present from "../images/Q.png";
import api from "../utils/api";
import Link from "next/link";
import TitleComponent from "./TitleComponent";
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
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      centerPadding: "30px",
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            infinite: true,
            autoplay: true,
            cssEase: "linear",
            speed: 3000,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: "20px",
            swipeToSlide: true
          }
        },
        {
          breakpoint: 769,
          settings: {
            infinite: true,
            autoplay: true,
            cssEase: "linear",
            speed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            swipeToSlide: true
          }
        }
      ]
    };
    return (
      <div className="container-fluid collections border-bottom ">
        <TitleComponent img={Present} h1="My Resources" />
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
        <div className="columns is-centered is-desktop margin-top-30">
          <div className="column is-6">
            <PBtn
              link="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door"
              external={true}
            >
              Visit My Shop
            </PBtn>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionSlider;
