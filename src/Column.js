import { h } from "hyperapp"
import map from "lodash.map"
import ColumnHead from "./ColumnHead"
import Time from "./Time"

export default ({ announcements, id, locations, ts }) => (
  <div className="tc">
    <ColumnHead announcements={announcements} id={id} />
    {map(locations, loc =>
      map(["Ankomst", "Avgang"], activityType => (
        <Time activityType={activityType} ts={ts} loc={loc} id={id} />
      ))
    )}
  </div>
)
