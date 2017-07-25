const find = require('lodash.find')
const map = require('lodash.map')
const moment = require('moment')

const formatTimes = require('./formatTimes')
const times = require('./times')
const trains = require('./trains')

function htmlTable(announcements, locations) {
    const trainIds = trains(announcements, moment())
    const activityTypes = ['Ankomst', 'Avgang']
    const ts = times(announcements)

    return [
        '<div id="sheet">']
        .concat('<div class="tr"><span class="td"></span>',
            map(trainIds,
                id =>
                    `<span class="td">${map(find(announcements, {AdvertisedTrainIdent: id}).ToLocation, 'LocationName')}<br>${id}</span>`),
            '</div>',
            map(locations,
                location =>
                    map(activityTypes,
                        activityType =>
                            `<div class="tr"><span class="td ${activityType}">${activityType.substr(0, 3)} ${location}</span>` +
                            map(trainIds,
                                id =>
                                    `<span class="td ${activityType}">${formatTimes(ts[location + id + activityType])}</span>`)
                                .join('\n') +
                            '</div>')
                        .join('\n')),
            ['</div>'])
        .join('\n')
}

module.exports = htmlTable
