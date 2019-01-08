import map from "lodash.map"

import formatTimes from "./formatTimes"
import times from "./times"
import trains from "./trains"

export default (announcements, locations) => {
  const trainIds = trains(announcements, new Date())
  const activityTypes = ["Ankomst", "Avgang"]
  const ts = times(announcements)

  return ['<div id="sheet">']
    .concat(
      '<div class="tc station">',
      '<span class="td station">train<br />station</span>',
      map(locations, location =>
        map(
          activityTypes,
          t =>
            `<span class="td station ${t}">${t.substr(0, 3)} ${location}</span>`
        ).join("\n")
      ),
      "</div>",
      '<div class="tr tbody">',
      map(trainIds, id =>
        ['<div class="tc">']
          .concat(
            '<span class="td">',
            `${map(
              find(announcements, { AdvertisedTrainIdent: id }).ToLocation,
              "LocationName"
            )}`,
            "<br>",
            `${id}`,
            "</span>",
            map(locations, location =>
              map(
                activityTypes,
                activityType =>
                  `<span class="td ${activityType}">${formatTimes(
                    ts[location + id + activityType]
                  )}</span>`
              ).join("\n")
            ),
            "</div>"
          )
          .join("\n")
      ),
      "</div>"
    )
    .join("\n")
}
