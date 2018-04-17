const moment = require('moment')

require('./style.css')
const htmlTable = require('./htmlTable')

const location = {
  c: ['Äs', 'Åbe', 'Sst', 'Sci', 'Sod'],
  n: ['So', 'Udl', 'Hel', 'Sol', 'Hgv', 'Nvk', 'R', 'Upv', 'Arnc'],
  s: ['Rön', 'Tu', 'Tul', 'Flb', 'Hu', 'Sta'],
  e: ['Hnd', 'Skg', 'Tåd', 'Fas'],
  w: ['Sub', 'Spå', 'Bkb', 'Jkb'],
}

const root = document.getElementById('root')
root.insertAdjacentHTML(
  'afterbegin',
  '<button id="update">result.INFO</button>'
)
root.insertAdjacentHTML('beforeend', getIndex())
root.insertAdjacentHTML('beforeend', '<div id="sheet">the sheet</div>')

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
  s += '</div>'
  return s
}

function span(s) {
  return '<span><a href="javascript:getTrains' + s + '</a></span> '
}

const button = root.firstElementChild
button.onclick = getCurrent

function getCurrent() {
  document.getElementById('sheet').innerHTML = ''
}

window.getTrains = (branch, direction) => {
  const xhr = new XMLHttpRequest()
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      const locations =
        direction === 'n'
          ? location[branch]
          : location[branch].slice().reverse()
      const result = JSON.parse(this.response).RESPONSE.RESULT[0]
      document.getElementById('sheet').outerHTML = htmlTable(
        result.TrainAnnouncement,
        locations
      )
      document.getElementById('update').textContent = moment(
        result.INFO.LASTMODIFIED['@datetime']
      ).format('H:mm:ss')
    } else {
      document.getElementById('sheet').innerHTML = this.status
      document.getElementById('update').textContent = this.status
    }
  }

  xhr.open(
    'GET',
    `/json/trains?direction=${direction}&locations=${
      location[branch]
    }&since=1:00&until=1:00`,
    true
  )
  xhr.send()
  document.getElementById('sheet').innerHTML = ''
}
