import { h } from "hyperapp"

export default ({ activityType, times, loc, id }) => (
  <span className={`td ${activityType}`}>
    {formatTimes(times[loc + id + activityType])}
  </span>
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
