import { h } from "hyperapp"
import map from "lodash.map"
import trains from "./trains"
import Column from "./Column"

export default ({ announcements, locations, ts }) => (
  <div className="tr tbody">
    {map(trains(announcements, new Date()), id => (
      <Column
        announcements={announcements}
        id={id}
        locations={locations}
        ts={ts}
      />
    ))}
  </div>
)
