import times from "./times"

describe("times", () => {
  it("returns object with composite keys", () => {
    const actual = times([
      {
        ActivityType: "Ankomst",
        AdvertisedTimeAtLocation: "2016-09-08T22:18:00",
        AdvertisedTrainIdent: "2772",
        LocationSignature: "Tu",
        ToLocation: [{ LocationName: "Mr", Priority: 1, Order: 0 }],
        TimeAtLocation: "2016-09-08T22:17:00",
      },
      {
        ActivityType: "Avgang",
        AdvertisedTimeAtLocation: "2016-09-08T22:18:00",
        AdvertisedTrainIdent: "2772",
        LocationSignature: "Tu",
        ToLocation: [{ LocationName: "Mr", Priority: 1, Order: 0 }],
        TimeAtLocation: "2016-09-08T22:18:00",
      },
      {
        ActivityType: "Ankomst",
        AdvertisedTimeAtLocation: "2016-09-08T22:22:00",
        AdvertisedTrainIdent: "2772",
        LocationSignature: "Tul",
        ToLocation: [{ LocationName: "Mr", Priority: 1, Order: 0 }],
      },
      {
        ActivityType: "Avgang",
        AdvertisedTimeAtLocation: "2016-09-08T22:22:00",
        AdvertisedTrainIdent: "2772",
        LocationSignature: "Tul",
        ToLocation: [{ LocationName: "Mr", Priority: 1, Order: 0 }],
      },
    ])

    expect(actual.Tu2772Ankomst.AdvertisedTimeAtLocation).toBe(
      "2016-09-08T22:18:00"
    )
    expect(actual.Tu2772Avgang.AdvertisedTimeAtLocation).toBe(
      "2016-09-08T22:18:00"
    )
    expect(actual.Tul2772Ankomst.AdvertisedTimeAtLocation).toBe(
      "2016-09-08T22:22:00"
    )
    expect(actual.Tul2772Avgang.AdvertisedTimeAtLocation).toBe(
      "2016-09-08T22:22:00"
    )
  })
})
