import addMinutes from 'date-fns/add_minutes'
import subMinutes from 'date-fns/sub_minutes'
import format from 'date-fns/format'
import difference from 'lodash.difference'
import filter from 'lodash.filter'
import map from 'lodash.map'
import uniq from 'lodash.uniq'

export default (announcements, now) => {
  const lowerBound = format(subMinutes(now, 55))
  const upperBound = format(addMinutes(now, 85))
  return difference(
    ids(announcements),
    ids(filter(announcements, isTooEarly)),
    ids(filter(announcements, isTooLate))
  ).sort(byAdvertisedTime)

  function isTooEarly(a) {
    return a.AdvertisedTimeAtLocation < lowerBound
  }

  function isTooLate(a) {
    return a.AdvertisedTimeAtLocation > upperBound
  }

  function byAdvertisedTime(leftId, rightId) {
    const left = filter(announcements, { AdvertisedTrainIdent: leftId })

    for (let i = 0; i < left.length; i++) {
      const right = find(announcements, {
        AdvertisedTrainIdent: rightId,
        LocationSignature: left[i].LocationSignature,
        ActivityType: left[i].ActivityType,
      })

      if (right) return compareTimes(left[i], right)
    }
  }
}

function ids(announcements) {
  return uniq(map(announcements, 'AdvertisedTrainIdent'))
}

function compareTimes(a1, a2) {
  const time1 = a1.AdvertisedTimeAtLocation
  const time2 = a2.AdvertisedTimeAtLocation
  if (time1 < time2) return -1
  if (time1 > time2) return 1
  return 0
}
