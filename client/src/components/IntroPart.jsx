import MapComponent from "./MapComponent";

export default function IntroPart() {
  return (
    <section className="intro-part">
      <div className="explore-france">
        <div className="map" id="map">
          <MapComponent />
        </div>
      </div>
      <div className="motive">
        <h2 className="greeting">Bonjour, &Eacute;tudiants!</h2>
        <p className="aim">
          {/* Want to dive into the world of french culture, learn french with us.
          Communicate in french and let the world know that you are capable of
          interacting in different languages. */}
          Unlock opportunities with French - Interactive courses designed for
          students, professionals, and enthusiasts.
        </p>
      </div>
    </section>
  );
}
