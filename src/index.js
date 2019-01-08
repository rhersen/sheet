import htmlTable from "./htmlTable"

const location = {
  c: ["Äs", "Åbe", "Sst", "Sci", "Sod"],
  n: ["So", "Udl", "Hel", "Sol", "Hgv", "Nvk", "R", "Upv", "Arnc"],
  s: ["Rön", "Tu", "Tul", "Flb", "Hu", "Sta"],
  e: ["Hnd", "Skg", "Tåd", "Fas"],
  w: ["Sub", "Spå", "Bkb", "Jkb"],
}

const root = document.getElementById("root")
root.insertAdjacentHTML(
  "afterbegin",
  '<button id="update">result.INFO</button>'
)
root.insertAdjacentHTML("beforeend", getIndex())
root.insertAdjacentHTML("beforeend", '<div id="sheet">the sheet</div>')

function getIndex() {
  let s = '<div id="index">'
  s += span("('w','n')\">Järfälla norrut")
  s += span("('w','s')\">Järfälla söderut")
  s += span("('n','n')\">Solna norrut")
  s += span("('n','s')\">Solna söderut")
  s += span("('c','n')\">Centralen norrut")
  s += span("('c','s')\">Centralen söderut")
  s += span("('s','n')\">Huddinge norrut")
  s += span("('s','s')\">Huddinge söderut")
  s += span("('e','n')\">Haninge norrut")
  s += span("('e','s')\">Haninge söderut")
  s += "</div>"
  return s
}

function span(s) {
  return `<span><a href="javascript:getTrains${s}</a></span> `
}

const button = root.firstElementChild
button.onclick = getCurrent

function getCurrent() {
  document.getElementById("sheet").innerHTML = ""
}

window.getTrains = async (branch, direction) => {
  document.getElementById("sheet").innerHTML = ""

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

  document.getElementById("sheet").outerHTML = htmlTable(
    result.TrainAnnouncement,
    direction === "n" ? location[branch] : location[branch].slice().reverse()
  )
  document.getElementById("update").textContent = result.INFO.LASTMODIFIED[
    "@datetime"
  ].substr(11)
}

function apiHost() {
  return process.env.NODE_ENV === "development" ? "http://localhost:1337" : ""
}
