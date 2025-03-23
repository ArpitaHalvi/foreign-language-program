export default function DetailsPart() {
  return (
    <section className="details-part">
      <h3 className="collab-heading">Professional Network</h3>
      <div className="collab">
        <div>
          <a
            href="https://staloysiuscollege.ac.in"
            className="partner"
            title="St. Aloysius College, Jabalpur"
          >
            <img
              src="/aloysius-logo2.png"
              alt="LOGO"
              width={100}
              height={100}
            />
          </a>
        </div>
        <div>
          <a
            href="https://www.podareducation.org"
            className="partner"
            title="Podar International School, Jabalpur"
          >
            <img src="/podar-schl2.png" alt="LOGO" />
          </a>
        </div>
        <div>
          <a
            href="https://csjmu.ac.in"
            className="partner"
            title="Chatrapati Shahuji Maharaj University, Kanpur"
          >
            <img src="/csjm-uni.png" alt="LOGO" />
          </a>
        </div>
      </div>
    </section>
  );
}
