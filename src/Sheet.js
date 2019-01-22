import { h } from "hyperapp"
import map from "lodash.map"
import trains from "./trains"
import Column from "./Column"
import ColumnHead from "./ColumnHead"
import StationsColumn from "./StationsColumn"

export default ({ announcements, locations, activityTypes, ts }) => (
  <div id="sheet">
    <StationsColumn locations={locations} activityTypes={activityTypes} />
    <div className="tr tbody">
      {map(trains(announcements, new Date()), id => (
        <Column
          announcements={announcements}
          id={id}
          locations={locations}
          activityTypes={activityTypes}
          ts={ts}
        />
      ))}
    </div>
  </div>
)
