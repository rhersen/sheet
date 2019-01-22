import { h } from "hyperapp"
import map from "lodash.map"
import find from "lodash.find"

export default ({ announcements, id }) => (
  <span className="td">
    {map(
      find(announcements, a => a.AdvertisedTrainIdent === id && a.ToLocation)
        .ToLocation,
      "LocationName"
    )}
    <br />
    {id}
  </span>
)
