/* eslint-disable react/prop-types */
export default function ShowBrochure({ imageUrl }) {
  return (
    <div className="show-brochure">
      <img src={imageUrl} alt="Brochure" />
    </div>
  );
}
