export default function Glimpses() {
  const images = [
    {
      title: "",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132240/IMG-20250324-WA0013_xzu36j.jpg",
    },
    {
      title: "",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work3-1_nlypzz.jpg",
    },
    {
      title: "Podar International School",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work4-1_pjxt2a.jpg",
    },
    {
      title: "Lit Fest (St. Aloysius' College)",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132107/IMG-20250324-WA0018_a3zjno.jpg",
    },
    {
      title: "Podar International School",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132215/IMG-20250324-WA0005_sjwvfw.jpg",
    },
    {
      title: "Lit Fest (St. Aloysius' College)",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132176/IMG-20250324-WA0019_kugd9q.jpg",
    },
    {
      title: "",
      img: "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work1_go2jkz.jpg",
    },
  ];
  return (
    <section className="glimpse-section">
      <h2>Moments of Learning</h2>
      <div className="glimpses">
        {images.map((glipmse, index) => {
          return (
            <div key={index} className="glimpse">
              <img src={glipmse.img} alt="Glimpses" />
              <h6>{glipmse.title}</h6>
            </div>
          );
        })}
      </div>
    </section>
  );
}
