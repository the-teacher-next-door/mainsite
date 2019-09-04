import React from "react";
import Logo from "../../images/logo.png";
import BookIcon from "../../images/BookIcon.png";
import Calc from "../../images/Calc.png";
import Light from "../../images/Light.png";
import Mug from "../../images/Mug.png";
import Pencil from "../../images/Pencil.png";
import Link from "next/link";
import Container from "../FormatComponents/Container";
import Column from "../FormatComponents/Column";
import Columns from "../FormatComponents/Columns";
import ContainerFluid from "../FormatComponents/ContainerFluid";
const IconNav = props => (
  <ContainerFluid className="icon-nav">
    <Container>

    <Columns>
      <Column className="is-6 left">
        <img src={Logo} alt="" className="logo image " />
      </Column>
      <Column className="is-6 right">
        <ul>
          <li>
            <Link as={`/reading`} href="/reading?q=reading">
              <a className="icon-link-tags">
                <img src={BookIcon} className="icons image" alt="" />
                Reading
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/writing`} href="/writing?q=writing">
              <a className="icon-link-tags">
                <img src={Pencil} className="icons image" alt="" />
                Writing & Grammar
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/math`} href="/math?q=math">
              <a className="icon-link-tags">
                <img src={Calc} className="icons image" alt="" />
                Math
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/holidays`} href="/holidays?q=holidays">
              <a className="icon-link-tags">
                <img src={Mug} className="icons image" alt="" />
                Holidays
              </a>
            </Link>
          </li>
          <li>
            <Link as={`/ideas`} href="/ideas?q=ideas">
              <a className="icon-link-tags">
                <img src={Light} className="icons image" alt="" />
                Classroom Ideas
              </a>
            </Link>
          </li>
        </ul>
      </Column>
    </Columns>
    </Container>
  </ContainerFluid>
);

export default IconNav;
