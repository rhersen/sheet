import { h, app } from "hyperapp"
import times from "./times"
import Nav from "./Nav"
import Sheet from "./Sheet"

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

const view = (
  { modified, announcements, branch, direction },
  { getTrains }
) => (
  <div>
    <button id="update">{modified}</button>
    <Nav getTrains={getTrains} />
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