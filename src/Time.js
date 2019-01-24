import { h } from "hyperapp"
import difference_in_minutes from "date-fns/difference_in_minutes"
import cx from "classnames"

export default ({ activityType, times, loc, id }) => {
  const time = times[loc + id + activityType]

  return (
    <span className={cx("td", activityType, delay())}>{formatTimes(time)}</span>
  )

  function delay() {
    if (time && time.TimeAtLocation) {
      const d = difference_in_minutes(
        time.TimeAtLocation,
        time.AdvertisedTimeAtLocation
      )

      if (d < 0) return "ahead"
      if (d < 1) return "ontime"
      if (d < 2) return "delay1"
      if (d < 4) return "delay2"
      if (d < 8) return "delay4"
      return "delay8"
    }
  }
}

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
