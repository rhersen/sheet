import keyby from "lodash.keyby"

export default announcements =>
  keyby(
    announcements,
    a => `${a.LocationSignature}${a.AdvertisedTrainIdent}${a.ActivityType}`
  )
