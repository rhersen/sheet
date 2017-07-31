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
        .concat('<div class="tr">',
            '<div class="tc">',
            '<span class="td">train<br />station</span>',
            map(locations,
                location =>
                    map(activityTypes,
                        activityType =>
                            `<span class="td ${activityType}">${activityType.substr(0, 3)} ${location}</span>`)
                        .join('\n')),
            '</div>',
            map(trainIds, id => `<div class="tc">` +
                `<span class="td">${map(find(announcements, {AdvertisedTrainIdent: id}).ToLocation, 'LocationName')}<br>${id}</span>` +
                map(locations, location =>
                    map(activityTypes,
                        activityType =>
                            `<span class="td ${activityType}">${formatTimes(ts[location + id + activityType])}</span>`)
                        .join('\n'))
                    .join('\n') +
                '</div>'),
            '</div>',
            ['</div>'])
        .join('\n')
}

module.exports = htmlTable