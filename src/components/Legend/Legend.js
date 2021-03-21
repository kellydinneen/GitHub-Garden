import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

const Legend = ({ map }) => {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML =`
          <h2>GitHub Activity</h2>
          <hr>
          <p class="legend-category push">Push Event</p>
          <p class="legend-category public">Create Event</p>
          <p class="legend-category watch">Public Event</p>
          <p class="legend-category issue">Watch Event</p>
          <p class="legend-category pull">Issue Comment</p>
          <p class="legend-category create">Pull Request</p>
          <p class="legend-category other">Other</p>
        `
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
