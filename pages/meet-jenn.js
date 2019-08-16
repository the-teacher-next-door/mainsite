import React, { useState, useEffect } from "react";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import IconNav from "../Components/IconNav";
import NavNext from "../Components/NavNext";
import Layout from "../Components/Layout/Layout";
import Link from "next/link";
import api from "../utils/api";
import Footer from "../Components/Footer";
import Socials from "../Components/Socials";
import SBtn from "../Components/Sbtn";
import Jenn from "../images/jennphoto.png";
function Meet(props) {
  const info = [
    {
      heading: `Teaching Experience`,
      summary:
        "I have been a teacher for over 20 years! I taught second grade for about ten years and then 4th/5th for about ten years too. Teaching is in my blood as my mother and father were both teachers and my brother works as a professor of history. I look forward to going to work each day and am excited to be able to share teaching ideas and some of the things I make for my classroom with you."
    },
    {
      heading: `My Teaching Style`,
      summary: `Teaching to the whole child is important to me and while I want
    my students to do well on standardized tests, and work towards
    that end, I have never felt that tests were the most important
    thing that I teach. I believe in motivating kids to become life
    long learners, while modeling the character traits that they
    need to grow into happy, well-adjusted adults. I love to add
    humor to the learning day and try to make even the most dull
    subject come to life. I truly care about the kids I teach and
    want them to have the best year possible.`
    },
    {
      heading: `Honors/Awards/Shining Teacher Moment`,
      summary: `I have been a teacher for over 20 years! I taught second grade
  for about ten years and then 4th/5th for about ten years too.
  Teaching is in my blood as my mother and father were both
  teachers and my brother works as a professor of history. I look
  forward to going to work each day and am excited to be able to
  share teaching ideas and some of the things I make for my
  classroom with you.`
    },
    {
      heading: `My Own Educational History`,
      summary: `I have a BA in Psychology and a Master's in
      Curriculum/Instruction.`
    },
    {
      heading: `My Family`,
      summary: ` I have two kids. My son and his wife (who is like my second
        daughter) live in San Francisco. My daughter is currently in
        college. I also have a boyfriend and two rescue cats.`
    }
  ];
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState(info[0]);

  useEffect(() => {
    fadeIn();
    api.loadBooks().then(books => {
      console.log(books.data);
      setBooks(books.data);
    });
  }, []);

  const setActive = e => {
    // remove active from buttons
    let buttons = document.querySelectorAll(".buttons");
    buttons.forEach(button => {
      button.classList.remove("active");
    });
    const data = e.target.dataset["data"];
    e.target.classList.add("active");
    fadeOut();
    setTimeout(() => {
      setSections(info[parseInt(data)]);
    }, 1000);
    setTimeout(() => {
      fadeIn();
    }, 1000);
  };

  const fadeIn = () => {
    let summary = document.querySelector(".summaries");
    let h1 = document.querySelector("h1");
    summary.style.opacity = 1;
    h1.style.opacity = 1;
  };

  const fadeOut = () => {
    let summary = document.querySelector(".summaries");
    let h1 = document.querySelector("h1");
    h1.style.opacity = 0;
    summary.style.opacity = 0;
  };
  // mini nav to set summary and title
  return (
    <Layout>
      <div className="meet">
        <NavNext />
        <IconNav />
        <div className="container-fluid aboutSection">
          <div className="container">
            <div className="columns is-multiline is-centered">
              <div className="column is-8 has-text-centered">
                {/* mini nav */}
                <div className="miniNav ">
                  <ul>
                    <li>
                      <SBtn className="buttons" data="0" onClick={setActive}>
                        Teaching Experience
                      </SBtn>
                    </li>
                    <li>
                      <SBtn className="buttons" data="1" onClick={setActive}>
                        Teaching Style
                      </SBtn>
                    </li>
                    <li>
                      <SBtn className="buttons" data="2" onClick={setActive}>
                        Honors/Awards
                      </SBtn>
                    </li>
                    <li>
                      <SBtn className="buttons" data="3" onClick={setActive}>
                        Education
                      </SBtn>
                    </li>
                    <li>
                      <SBtn className="buttons" data="4" onClick={setActive}>
                        My Family
                      </SBtn>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="column is-8 info">
                <h1>{sections.heading}</h1>
                <h2 className="summaries">{sections.summary}</h2>
                {/* SOCIALS */}
                <div className="socials">
                  <ul>
                    <li>
                      <p>Follow Me!</p>
                    </li>
                    <li>
                      <Socials href="https://www.facebook.com/TheTeacherNextDoor">
                        <i className="fab fa-facebook"></i>
                      </Socials>
                    </li>
                    <li>
                      <Socials href="https://www.instagram.com/theteachernextdoor/">
                        <i className="fab fa-instagram"></i>
                      </Socials>
                    </li>
                    <li>
                      <Socials href="https://www.pinterest.com/TeacherNextDoor/">
                        <i className="fab fa-pinterest-square"></i>
                      </Socials>
                    </li>
                    <li>
                      <Socials href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                        TpT
                      </Socials>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="column is-4 imgColumn">
                <div className="aboutImg">
                  <img src={Jenn} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="columns ">
              <div className="column">
                {/* link to store */}
                <Link href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                  <a id="storeLink">
                    Check out my Store! <i className="fas fa-arrow-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-centered is-multiline">
          <div className="column is-6 has-text-centered">
            <div className="books">
              <h1>My Books</h1>
              {books.map(book => {
                return (
                  <Link href={book.link}>
                    <a className="book">
                      <div className="bookLink">
                        <img src={book.img} alt="" />
                        <p>{book.name}</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default Meet;
