export default function Achievements() {
  const achievers = [
    {
      name: "Errin Mathew",
      exam: "DELF 2025",
      img: "/achiever1.jpg",
      testimony:
        "Giving the DELF A1 exam at Alliance Française Bhopal was a unique and enriching experience. The exam tested my basic French skills in listening, reading, writing, and speaking. While some sections, like listening, were a bit challenging due to the speed of native speakers, I found the writing and reading parts manageable. The speaking test was both exciting and nerve-wracking, as I had to interact with an examiner in French. The atmosphere at Alliance Française was welcoming, and the staff was helpful, which made the experience smoother. Overall, it was a great opportunity to assess my progress and gain confidence in using French in real-life situations.",
    },
  ];
  return (
    <section className="achievements-section">
      <h2>Empowering Fluency: Students who took the leap</h2>
      <p>
        These students started their French journey with us and confidently
        appeared for prestigious French exams like DELF, TEF, and TCF.
      </p>
      <div className="achievers" data-aos="slide-right">
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
      </div>
    </section>
  );
}
