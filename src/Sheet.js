import { h } from "hyperapp"
import Column from "./Column"
import ColumnHead from "./ColumnHead"
import StationsColumn from "./StationsColumn"

import TrainColumns from "./TrainColumns"

export default ({ announcements, locations, ts }) => (
  <div id="sheet">
    <StationsColumn locations={locations} />
    <TrainColumns announcements={announcements} locations={locations} ts={ts} />
  </div>
)
