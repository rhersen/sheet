import { h } from "hyperapp"
import map from "lodash.map"
import trains from "./trains"
import find from "lodash.find"

export default ({ announcements, locations, activityTypes, ts }) => (
  <div id="sheet">
    <div className="tc station">
      <span className="td station">
        train
        <br />
        station
      </span>
      {map(locations, loc =>
        map(activityTypes, t => (
          <span className={`td station ${t}`}>
            {t.substr(0, 3)} {loc}
          </span>
        ))
      )}
    </div>
    <div className="tr tbody">
      {map(trains(announcements, new Date()), id => (
        <div className="tc">
          <span className="td">
            {map(
              find(announcements, { AdvertisedTrainIdent: id }).ToLocation,
              "LocationName"
            )}
            <br />
            {id}
          </span>
          {map(locations, loc =>
            map(activityTypes, activityType => (
              <span className={`td ${activityType}`}>
                {formatTimes(ts[loc + id + activityType])}
              </span>
            ))
          )}
        </div>
      ))}
    </div>
  </div>
)

function formatTimes(s) {
  if (!s) return "×"

  const a = f(s.AdvertisedTimeAtLocation)
  const e = f(s.EstimatedTimeAtLocation)
  const t = f(s.TimeAtLocation)

  if (a === t) return <b>{t}</b>

  if (t) {
    if (s.ActivityType === "Ankomst") return <b>{t}</b>

    return (
      <span>
        <b>{t}</b>/{removeHours(a)}
      </span>
    )
  }

  if (e)
    return (
      <span>
        <i>{e}</i>/{removeHours(a)}
      </span>
    )

  return a

  function removeHours(time) {
    return time.substr(time.indexOf(":") + 1)
  }
}

function f(s) {
  let match
  const regExp = [
    /T0(\d:\d\d):00/,
    /T0(\d:\d\d:\d\d)/,
    /T(\d\d:\d\d):00/,
    /T(\d\d:\d\d:\d\d)/,
  ]

  for (let i = 0; i < regExp.length; i++)
    if ((match = regExp[i].exec(s))) return match[1]

  return ""
}
