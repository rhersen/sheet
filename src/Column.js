import { h } from "hyperapp"
import map from "lodash.map"
import ColumnHead from "./ColumnHead"
import Time from "./Time"
import times from "./times"

export default ({ announcements, id, locations }) => {
  const ts = times(announcements)
  return (
    <div className="tc">
      <ColumnHead announcements={announcements} id={id} />
      {map(locations, loc =>
        map(["Ankomst", "Avgang"], activityType => (
          <Time activityType={activityType} times={ts} loc={loc} id={id} />
        ))
      )}
    </div>
  )
}
