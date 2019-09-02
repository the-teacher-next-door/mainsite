import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import Link from "next/link";
import api from "../utils/api";
import Footer from "../Components/Footer/FooterNext";
import Socials from "../Components/Socials";
import SBtn from "../Components/SBtn";
import Jenn from "../images/jennphoto.png";
import TitleComponent from "../Components/TitleComponent";
import Book from "../images/B.png";
import Container from "../Components/FormatComponents/Container";
import Header from "../Components/Header";
import Column from "../Components/FormatComponents/Column";
function Meet(props) {
  const info = [
    {
      heading: `Teaching Experience`,
      summary: `My father and mother both started out as teachers and my brother is a history professor, so I think teaching
        must run in my family! I didn’t set out to be a teacher, but originally wanted to be a counselor. I graduated
        with a degree in psychology. Right out of college, I worked as a substitute teacher, and fell in love with
        teaching! I went back to college to get my teaching credential, and later a master’s degree and I’ve taught now
        for over twenty years! Most of my teaching experience is at the elementary level, first in second grade, but
        more recently in fourth and fifth grades.`,
      lists: []
    },
    {
      heading: `My Teaching Style`,
      summary: `Teaching to the whole child is important to me and while I want my students to do well on standardized tests,
      and work towards that end, I have never felt that tests were the most important thing that I teach. Besides
      content learning, I believe in motivating kids to become life-long learners, while encouraging the character
      traits they need to grow into happy, kind adults.
      My teaching philosophy starts by making meaningful connections with my students. I really work hard to
      create a positive classroom climate and use Morning Meetings as our cornerstone.
      Keeping kids motivated is huge to me and I like to plan activities which are learning focused but really fun! I
      use a variety of teaching and learning formats, including lots of games, while incorporating movement when
      possible. I love to add humor to the learning day and try to make even the most dull subject come to life. I
      truly care about the kids I teach and want them to have the best year possible.`,
      lists: []
    },
    {
      heading: `Honors/Awards/Shining Teacher Moment`,
      summary: ``,
      lists: [
        `Mentor Teacher`,
        `2013-2014 Woman of the Year (National Association of Professional Women)`,
        `Published Author`
      ]
    },
    {
      heading: `My Own Educational History`,
      summary: ``,
      lists: [
        `BA in Psychology`,
        `Master's Degree in Education: Curriculum and Instruction`
      ]
    },
    {
      heading: `My Family`,
      summary: ` There were three kids in my family and I grew up as the middle child and only daughter. My father started as a
      teacher but eventually became the head of Special Services for our local school district. My mother was also a
      teacher but became a stay at home mom as we were growing up. Later, she went to seminary and became an
      ordained pastor.
      I have two kids of my own. My son and his wife both live and work in San Diego. My daughter is in the
      teaching program. Right now, she and her fiancé are planning a summer wedding. I also have a long time
      boyfriend and three rescue cats (Lola, Willie, and Callie).`,
      lists: []
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
    let lists = document.querySelector(".lists");
    let h1 = document.querySelector("h1");
    summary.style.opacity = 1;
    lists.style.opacity = 1;
    h1.style.opacity = 1;
  };

  const fadeOut = () => {
    let summary = document.querySelector(".summaries");
    let lists = document.querySelector(".lists");
    let h1 = document.querySelector("h1");
    h1.style.opacity = 0;
    summary.style.opacity = 0;
    lists.style.opacity = 0;
  };
  // mini nav to set summary and title
  return (
    <Layout>
      <div className="meet">
        <Header />
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
                <h2 className="lists">
                  {sections.lists.map(item => {
                    return <h2>{item}</h2>;
                  })}
                </h2>
                {/* SOCIALS */}
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
              <Column className="is-6">
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
              </Column>
              <Column className="is-6">
                {/* link to store */}
                <Link href="https://www.teacherspayteachers.com/Store/The-Teacher-Next-Door">
                  <a id="storeLink">
                    Check out my Store! <i className="fas fa-arrow-right"></i>
                  </a>
                </Link>
              </Column>
            </div>
          </div>
        </div>
        <Container>
          <div className="books">
            <TitleComponent img={Book} h1="My Books" />
            <div className="columns is-centered is-multiline">
              {books.map(book => {
                return (
                  <div className="column is-3 has-text-centered">
                    <a href={book.link} className="book" target="_blank">
                      <div className="bookLink">
                        <img src={book.img} alt="" />
                        <p>{book.name}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </Layout>
  );
}

export default Meet;
