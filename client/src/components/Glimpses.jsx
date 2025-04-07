export default function Glimpses() {
  const images = [
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132240/IMG-20250324-WA0013_xzu36j.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work3-1_nlypzz.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work4-1_pjxt2a.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132107/IMG-20250324-WA0018_a3zjno.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132215/IMG-20250324-WA0005_sjwvfw.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743132176/IMG-20250324-WA0019_kugd9q.jpg",
    "https://res.cloudinary.com/dgt8utaaa/image/upload/v1743866777/work1_go2jkz.jpg",
  ];
  return (
    <section className="glimpse-section">
      <h2>Moments of Learning</h2>
      <div className="glimpses">
        {images.map((img, index) => {
          return (
            <div key={index}>
              <img src={img} alt="Glimpses" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
