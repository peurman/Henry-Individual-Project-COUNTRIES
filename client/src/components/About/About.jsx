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
                  <h4>About the Project...</h4>
                </div>
                <div className="sectionp1">
                  <span>
                    Hi everyone! This website was created as an{" "}
                    <b>Individual Project</b> for <b>Henry</b>'s Bootcamp.
                  </span>
                  <span>
                    The theme was about <b>Countries of the world</b>, following
                    certain mandatory guidelines:
                    <ul>
                      ◽ Get the information from an external API, and create an
                      own database to fill it with that information.
                    </ul>
                    <ul>
                      ◽ Create tourist activities through a controlled form,
                      which verifies data before allowing the upload, and whose
                      information also was stored in the database.
                    </ul>
                    <ul>◽ Include a Landing Page.</ul>
                    <ul>◽ Display countries with flag, name and continent.</ul>
                    <ul>
                      ◽ To be able to sort them alphabetically or by number of
                      inhabitants.
                    </ul>
                    <ul>
                      ◽ To be able to search for countries that "contain" the
                      text searched, filter them by Continent and by Activities.
                    </ul>
                    <ul>
                      ◽ Show the detail of each country (capital, surface,
                      population, etc).
                    </ul>
                    <ul>
                      ◽ Paginated with 9 countries on page 1, and then 10
                      countries per page.
                    </ul>
                    <ul>◽ Use Vanilla CSS.</ul>I added to this:
                    <ul>◽ Combination of the three filters and sorting. </ul>
                    <ul>◽ Next and previous buttons.</ul>
                    <ul>
                      ◽ 9 possible pop-up messages (to confirm, inform or warn)
                    </ul>
                    <ul>
                      ◽ 1 "Loading..." message while loading information.
                    </ul>
                  </span>
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
                  <h4>About me...</h4>
                </div>
                <div className="sectionp2">
                  <span>
                    My name is <b>Esteban Manrupe</b>, an Electronics Engineer
                    in a full process of reskilling, with an imminent goal: to
                    become a <b>Full Stack Web Developer</b>.
                  </span>
                </div>
              </div>
              <div className="section3">
                <p>Feel free to contact me on:</p>
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
