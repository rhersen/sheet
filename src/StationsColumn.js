import { h } from "hyperapp"
import map from "lodash.map"

export default ({ locations }) => (
  <div className="tc station">
    <span className="td station">
      train
      <br />
      station
    </span>
    {map(locations, loc =>
      map(["Ankomst", "Avgang"], t => (
        <span className={`td station ${t}`}>
          {t.substr(0, 3)} {loc}
        </span>
      ))
    )}
  </div>
)
