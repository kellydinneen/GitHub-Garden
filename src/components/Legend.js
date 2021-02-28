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
          <p class="red">Push</p>
          <p class="orange">Create</p>
          <p class="blue">Public Event</p>
          <p class="green">Watch Event</p>
          <p class="purple">Issue Comment</p>
          <p class="cornflowerblue">Pull Request</p>
          <p class="white">Other</p>
        `
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
