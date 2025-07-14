import { SlideInOnScroll } from "./SlideInOnScroll";

export default function Achievements() {
  const achievers = [
    {
      name: "Errin Mathew",
      exam: "DELF 2025",
      img: "/achiever1.jpg",
      testimony:
        "Giving the DELF A1 exam at Alliance Française Bhopal was a unique and enriching experience. The exam tested my basic French skills in listening, reading, writing, and speaking. ",
    },
    {
      name: "Errin Mathew",
      exam: "DELF 2025",
      img: "/achiever1.jpg",
      testimony:
        "Giving the DELF A1 exam at Alliance Française Bhopal was a unique and enriching experience. The exam tested my basic French skills in listening, reading, writing, and speaking.",
    },
  ];

  return (
    <section className="achievements-section">
      <h2>Empowering Fluency: Students who took the leap</h2>
      <p>
        These students started their French journey with us and confidently
        appeared for prestigious French exams like DELF, TEF, and TCF.
      </p>
      {/* <div className="achievers" data-aos="slide-right">
        {achievers.map((achiever, index) => {
          const { name, exam, testimony, img } = achiever;
          return (
            <div className="achiever" key={`achiever-${index}`}>
              <img src={img} alt="" />
              <div className="about-achiever">
                <h3>{name}</h3>
                <p>{exam}</p>
                <p>{testimony}</p>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="achievers">
        {achievers.map((achiever, index) => {
          const { img, name, exam, testimony } = achiever;
          return (
            <SlideInOnScroll key={index * 3}>
              <div className="achiever" key={`achiever-${index + 3}`}>
                <div className="img">
                  <img src={img} alt="Student Image" />
                </div>
                <div className="about">
                  <h3>{name}</h3>
                  <p>{exam}</p>
                  <p>{testimony}</p>
                </div>
              </div>
            </SlideInOnScroll>
          );
        })}
      </div>
    </section>
  );
}
