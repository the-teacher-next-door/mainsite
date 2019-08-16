import React from "react";
import Jenn from "../images/jennphoto.png";
import PBtn from "./PBtn";
const AboutSection = props => {
  return (
    <div className="container-fluid about padding-top-30">
      <div className="columns is-centered">
        <div className="column is-8">
          <img className="profile-img" src={Jenn} alt="" />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-6 padding-30">
          <h2>
            Welcome, teacher friends! I’m Jenn Larson, a teacher, a mother, and
            a writer. My goal is to provide resources, tips, and strategies to
            help teachers make a difference in the lives of their students. I
            believe that using effective teaching strategies, making learning
            fun, and communicating that you care, can help students achieve to
            the best of their abilities.
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
      <style jsx global>
        {`
          .profile-img {
            width: 270px;
          }

          .about ul {
            list-style-type: none;
            width: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
          }

          .about ul li a {
            float: left;
            margin: 10px;
            font-size: 25px;
            color: #695395;
          }
        `}
      </style>
    </div>
  );
};

export default AboutSection;
