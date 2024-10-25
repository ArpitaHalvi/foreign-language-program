import React from "react";
import globe from "../assets/images/study.jpg";

export default function IntroPart() {
  return (
    <div className="intro-part">
      <div className="explore-france">
        <div className="map">
          <img src={globe} alt="" />
        </div>
      </div>
      <div className="motive">
        <p className="greeting">Bonjour, &Eacute;tudiants!</p>
        <p className="aim">
          Want to dive into the world of french culture, learn french with us.
          Communicate in french and let the world know that you are capable of
          interacting in different languages.
        </p>
      </div>
    </div>
  );
}
