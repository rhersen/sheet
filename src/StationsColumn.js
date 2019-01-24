import { h } from "hyperapp"
import map from "lodash.map"
import cx from "classnames"

export default ({ locations }) => (
  <div className="tc station">
    <span className="td station">
      train
      <br />
      station
    </span>
    {map(locations, loc =>
      map(["Ankomst", "Avgang"], activity => (
        <span className={cx("td", "station", activity)}>
          {activity.substr(0, 3)} {loc}
        </span>
      ))
    )}
  </div>
)
