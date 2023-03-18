import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "./map.css";
import Render3D from "../render-3d/Render3D";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);
  const width = 500;
  const height = 300;

  const [showCube, setShowCube] = useState(false);

  useEffect(() => {
    let map;
    if (mapContainer.current) {
      map = new mapboxgl.Map({
        container: mapContainer.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [78.6049, 24.3914], // starting position [lng, lat]
        zoom: 3, // starting zoom
      });

      map.on("move", () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
    }

    return () => map.remove();
  }, []);

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    setImageUrl(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},${zoom},0/${width}x${height}?access_token=${mapboxgl.accessToken}`
    );
  }, [lat, lng, width, height, zoom]);

  return (
    <header className="map___container">
      <div
        id="map"
        onClick={() => {
          setShowCube(false);
        }}
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      ></div>

      <button
        className="map___container--button"
        onClick={() => {
          setShowCube(true);
        }}
      >
        Render 3D
      </button>

      <section className="map___container--3D">
        {imageUrl && showCube && (
          <Render3D texturePath={imageUrl} style={{ borderRadius: "25px" }} />
        )}
      </section>
    </header>
  );
};

export default Map;
