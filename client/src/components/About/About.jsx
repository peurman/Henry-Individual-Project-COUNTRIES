import React from "react";
import linkedin from "../../assests/Linkedin.png";
import github from "../../assests/GitHub.png";
import "../../styles/About.css";

export default function About() {
  return (
    <div className="base3">
      <div className="containerA3">
        <div className="containerB3">
          <div className="containerC3">
            <div className="containerD3">
              <div className="section1">
                <div className="containerTitAbout">
                  <span>About the Project...</span>
                </div>
                <div className="sectionp1">
                  <p>
                    Hi everyone! This website was created as an{" "}
                    <b>Individual Project</b> for <b>Henry</b>'s Bootcamp.
                  </p>
                  <p>
                    The thematic was about <b>COUNTRIES</b>, generating a list
                    of them, exploring the details of each one, applying
                    filters, doing different sorting, and searching through a
                    search bar. And then combining all of that.
                  </p>
                  <p>
                    The website also had to be able to create activities, which
                    had to be uploaded to the database, and then be used to
                    filter the countries that had those activities.
                  </p>{" "}
                  <div className="containerTech">
                    <div className="containerTech2">
                      <p>Technologies Used:</p>
                      <div className="containerTech3">
                        <div className="backFront">
                          <p>BackEnd</p>
                          <div className="technologies">Node JS</div>
                          <div className="technologies">Express</div>
                          <div className="technologies">Sequelize</div>
                          <div className="technologies">PostgreSQL</div>
                        </div>
                        <div className="backFront">
                          <p>Frontend</p>
                          <div className="technologies">React</div>
                          <div className="technologies">Redux</div>
                          <div className="technologies">HTML</div>
                          <div className="technologies">CSS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section2">
                <div className="containerTitAbout">
                  <span>About me...</span>
                </div>
                <div className="sectionp2">
                  <p>
                    My name is <b>Esteban Manrupe</b>, an Electronics Engineer
                    in a full process of reinvention and restiling, with an
                    imminent goal: to become a <b>Full Stack Web Developer</b>.
                  </p>
                </div>
              </div>
              <div className="section3">
                <p>
                  I like to share with you these links, so feel free to contact
                  me:
                </p>
                <a href="https://www.linkedin.com/in/estebanmanrupe/">
                  <img src={linkedin} alt="Lkduser" className="logoLinkedin" />
                </a>
                <a href=" https://github.com/peurman">
                  <img src={github} alt="Lkduser" className="logoLinkedin" />
                </a>
              </div>
            </div>
            <div className="section4">
              <span className="datePI">July 2022</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
