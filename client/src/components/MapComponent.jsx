import { useEffect, useRef } from "react";
import "ol/ol.css"; // Import OpenLayers styles
import "../../node_modules/ol/ol.css"; // Import OpenLayers styles
import { Map, View } from "../../node_modules/ol"; // Core Map and View classes
import TileLayer from "../../node_modules/ol/layer/Tile"; // Tile Layer
import OSM from "../../node_modules/ol/source/OSM"; // OpenStreetMap source
import { fromLonLat } from "../../node_modules/ol/proj"; // Convert coordinates
import VectorLayer from "../../node_modules/ol/layer/Vector";
import VectorSource from "../../node_modules/ol/source/Vector";
import Feature from "../../node_modules/ol/Feature";
import Point from "../../node_modules/ol/geom/Point";
import { Style, Icon } from "../../node_modules/ol/style";
import Overlay from "../../node_modules/ol/Overlay"; // For popups

export default function MapComponent() {
  const mapRef = useRef(null); // Reference for the map div
  const popupRef = useRef(null);

  useEffect(() => {
    // Create a vector source to hold markers
    const vectorSource = new VectorSource();

    // Create a marker feature for Paris, France
    const parisMarker = new Feature({
      geometry: new Point(fromLonLat([2.3522, 48.8566])), // Paris coordinates
    });

    // Set a custom icon style for the marker
    parisMarker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1], // Anchor point for the icon
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom marker icon
          scale: 0.09, // Scale the icon
          color: "crimson",
        }),
      })
    );

    // Add the marker to the vector source
    vectorSource.addFeature(parisMarker);

    // Create a vector layer to display the marker
    const markerLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create a popup overlay
    const popup = new Overlay({
      element: popupRef.current,
      positioning: "bottom-center",
      stopEvent: false,
      offset: [0, -10], // Position the popup above the marker
    });

    // Initialize the map
    const map = new Map({
      target: mapRef.current, // Attach the map to the ref
      layers: [
        new TileLayer({
          source: new OSM(), // Use OpenStreetMap as the tile source
        }),
        // vectorLayer, // Add marker layer
        markerLayer, // Add marker layer
      ],
      overlays: [popup],
      view: new View({
        center: fromLonLat([2.3522, 48.8566]), // Center on Paris (lon/lat in radians)
        zoom: 12, // Adjust the zoom level for paris
      }),
    });

    // Add click interaction for the marker
    map.on("singleclick", (event) => {
      // Check if a marker is clicked
      map.forEachFeatureAtPixel(event.pixel, (feature) => {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates); // Show the popup above the marker
        popupRef.current.innerHTML = `<h3>Welcome to Paris!</h3>`; // Customize popup content
      });
    });
    // Cleanup function to remove the map on component unmount
    return () => map.setTarget(null);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px", // Adjust the height of the map
        }}
      ></div>
      {/* Popup */}
      <div
        ref={popupRef}
        style={{
          backgroundColor: "white",
          padding: "5px",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
          position: "absolute",
          transform: "translate(-50%, -100%)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
}
