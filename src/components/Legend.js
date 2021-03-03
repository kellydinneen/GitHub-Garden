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
          <p class="push">Push Event</p>
          <p class="public">Create Event</p>
          <p class="watch">Public Event</p>
          <p class="issue">Watch Event</p>
          <p class="pull">Issue Comment</p>
          <p class="create">Pull Request</p>
          <p class="other">Other</p>
        `
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
