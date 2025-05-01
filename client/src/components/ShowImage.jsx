/* eslint-disable react/prop-types */
export default function ShowImage({ imageUrl }) {
  return (
    <div className="show-image">
      <img src={imageUrl} alt="Image Enlarged" />
    </div>
  );
}
