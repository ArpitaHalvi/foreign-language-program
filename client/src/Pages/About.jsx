import { CheckTwoTone, EmojiObjects } from "@mui/icons-material";
import Reports from "../components/Reports";
import "./About.scss";
import Glimpses from "../components/Glimpses";
import { aboutContent } from "./AboutContent";

export default function About() {
  return (
    <section className="about-section">
      <h2>
        Building Cultures, <br /> One Language at a Time.
      </h2>
      <h3>
        <i>
          &quot;Bienvenue! we&apos;re thrilled to have you here. Embark on an
          enriching journey to master the French language and explore its
          vibrant culture with us!&quot;
        </i>
      </h3>
      {/* <div className="about-us">
        <p>
          French is spoken in many countries- not just in France! It is the
          official language in Switzerland, Belgium, Canada, Seychelles,
          Morocco, Ivory Coast- just to name a few. In fact, it is the only
          language spoken on all five continents. French people are very proud
          of their language and will immediately warm to you if you speak it-
          even if you make a few mistakes. Since there are no hard consonants in
          the French language, it is easy on the ear. It is a language of
          precision and musicality.
        </p>
        <p>
          We aim to teach you how to read, write and speak French. This
          international language will open up a host of opportunities for
          students and learners alike. The tourism, hotel and other hospitality
          industry, airlines, international banks, technical and artistic
          collaborations and teaching are some of the areas where knowledge of
          the French language and culture can help you. Other than that one can
          enjoy French literature and cinema, understand research papers in
          Mathematics and allied subjects.
        </p>
      </div> */}
      <div className="about-flp">
        {aboutContent.map((about, index) => {
          return (
            <div key={index} className="about-item">
              <h4>{about.title}</h4>
              <p>{about.content}</p>
              <div className="decor">
                <EmojiObjects className="icon" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="instructor">
        <h4>The Instructor</h4>
        <h5>Mrs. Sonal Chaturvedi</h5>
        <ul>
          <li>
            <CheckTwoTone className="tick-style" />
            Language Consultant (French)– Accounted Experience in Translation
          </li>
          <li>
            <CheckTwoTone className="tick-style" />
            Teaching & consulting with NGOs, Schools, Education Institutes and
            Organizations
          </li>
          <li>
            <CheckTwoTone className="tick-style" />
            Social Consultants- Diverse Ability in early childhood Education &
            Socialwork.
          </li>
        </ul>
      </div>
      <Glimpses />
      <Reports />
    </section>
  );
}
