import { h, app } from "hyperapp"
import map from "lodash.map"
import find from "lodash.find"
import trains from "./trains"
import times from "./times"

const location = {
  c: ["Äs", "Åbe", "Sst", "Sci", "Sod"],
  n: ["So", "Udl", "Hel", "Sol", "Hgv", "Nvk", "R", "Upv", "Arnc"],
  s: ["Rön", "Tu", "Tul", "Flb", "Hu", "Sta"],
  e: ["Hnd", "Skg", "Tåd", "Fas"],
  w: ["Sub", "Spå", "Bkb", "Jkb"],
}

const state = { announcements: [], modified: "result.INFO" }

const actions = {
  getTrains: ({ branch, direction }) => async ({}, { update }) => {
    const response = await fetch(
      `${apiHost()}/json/trains?direction=${direction}&locations=${
        location[branch]
      }&since=1:00&until=1:30`
    )

    const {
      RESPONSE: {
        RESULT: [result],
      },
    } = await response.json()

    update({ result, branch, direction })
  },
  update: ({ result, branch, direction }) => () => {
    return {
      modified: result.INFO.LASTMODIFIED["@datetime"].substr(11),
      announcements: result.TrainAnnouncement,
      branch,
      direction,
    }
  },
}

const Sheet = ({ announcements, locations, activityTypes, ts }) => (
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

const view = (
  { modified, announcements, branch, direction },
  { getTrains }
) => (
  <div>
    <button id="update">{modified}</button>
    <div id="index">
      <span>
        <a onclick={() => getTrains({ branch: "w", direction: "n" })}>
          Järfälla norrut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "w", direction: "s" })}>
          Järfälla söderut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "n", direction: "n" })}>
          Solna norrut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "n", direction: "s" })}>
          Solna söderut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "c", direction: "n" })}>
          Centralen norrut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "c", direction: "s" })}>
          Centralen söderut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "s", direction: "n" })}>
          Huddinge norrut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "s", direction: "s" })}>
          Huddinge söderut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "e", direction: "n" })}>
          Haninge norrut
        </a>
      </span>
      <span>
        <a onclick={() => getTrains({ branch: "e", direction: "s" })}>
          Haninge söderut
        </a>
      </span>
    </div>
    <Sheet
      announcements={announcements}
      locations={
        direction !== "n" && branch
          ? location[branch].slice().reverse()
          : location[branch]
      }
      activityTypes={["Ankomst", "Avgang"]}
      ts={times(announcements)}
    />
  </div>
)

app(state, actions, view, document.body)

function apiHost() {
  return process.env.NODE_ENV === "development" ? "http://localhost:1337" : ""
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
