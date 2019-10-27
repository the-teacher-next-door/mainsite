import React from "react";
import Jenn from "../images/jennphoto.png";
import PBtn from "./PBtn";
import Link from "next/link";
const AboutSection = props => {
  return (
    <div className="container-fluid about">
      <div className="columns is-centered">
        <div className="column is-8">
          <img className="profile-img" src={Jenn} alt="" />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-6 ">
          <h2>
            Welcome, teacher friends! I’m Jenn Larson, a teacher, a mom, and an
            author. My goal is to provide resources, tips, and strategies to
            help teachers make a difference in the lives of their students. I
            believe that using effective teaching strategies, making learning
            fun, and communicating that you care, can help students achieve to
            the best of their abilities.{" "}
            <Link href="/meet-jenn">
              <a id="sub-link">Learn more about me.</a>
            </Link>
          </h2>
          <ul>
            <li>
              {" "}
              <PBtn
                className="social-icons"
                link="https://www.facebook.com/TheTeacherNextDoor"
                external={true}
              >
                <i className="fab fa-facebook"></i>
              </PBtn>{" "}
            </li>
            <li>
              {" "}
              <PBtn
                className="social-icons"
                link="https://www.facebook.com/TheTeacherNextDoor"
                link="https://www.instagram.com/theteachernextdoor/"
                external={true}
              >
                <i className="fab fa-instagram"></i>
              </PBtn>{" "}
            </li>
            <li>
              {" "}
              <PBtn
                className="social-icons"
                link="https://www.facebook.com/TheTeacherNextDoor"
                link="https://www.pinterest.com/TeacherNextDoor/"
                external={true}
              >
                <i className="fab fa-pinterest-square"></i>
              </PBtn>{" "}
            </li>
            <li>
              {" "}
              <PBtn
                className="social-icons"
                link="https://www.facebook.com/TheTeacherNextDoor"
                link="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door"
                external={true}
              >
                TpT
              </PBtn>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
