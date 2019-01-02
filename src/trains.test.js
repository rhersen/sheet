import trains from './trains'

describe('trains', () => {
  it('returns list of AdvertisedTrainIdent', () => {
    expect(
      trains(
        [
          {
            ActivityType: 'Ankomst',
            AdvertisedTimeAtLocation: '2016-09-05T21:22:00',
            AdvertisedTrainIdent: '2768',
            LocationSignature: 'Tul',
            ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-05T21:22:00',
            AdvertisedTrainIdent: '2768',
            LocationSignature: 'Tul',
            ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Ankomst',
            AdvertisedTimeAtLocation: '2016-09-05T21:25:00',
            AdvertisedTrainIdent: '2768',
            LocationSignature: 'Flb',
            ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-05T21:25:00',
            AdvertisedTrainIdent: '2768',
            LocationSignature: 'Flb',
            ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          },
        ],
        '2016-09-05T21:25:00'
      )
    ).toEqual(['2768'])
  })

  it('sorts on AdvertisedTimeAtLocation', () => {
    expect(
      trains(
        [
          {
            ActivityType: 'Ankomst',
            AdvertisedTimeAtLocation: '2016-09-21T06:04:00',
            AdvertisedTrainIdent: '2507',
            LocationSignature: 'Spå',
            ToLocation: [{ LocationName: 'Vhe', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T06:04:00',
            AdvertisedTrainIdent: '2507',
            LocationSignature: 'Spå',
            ToLocation: [{ LocationName: 'Vhe', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Ankomst',
            AdvertisedTimeAtLocation: '2016-09-21T05:54:00',
            AdvertisedTrainIdent: '2305',
            LocationSignature: 'Sub',
            ToLocation: [{ LocationName: 'Nyh', Priority: 1, Order: 0 }],
            TimeAtLocation: '2016-09-21T05:53:00',
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T05:54:00',
            AdvertisedTrainIdent: '2305',
            LocationSignature: 'Sub',
            ToLocation: [{ LocationName: 'Nyh', Priority: 1, Order: 0 }],
            TimeAtLocation: '2016-09-21T05:54:00',
          },
          {
            ActivityType: 'Ankomst',
            AdvertisedTimeAtLocation: '2016-09-21T06:09:00',
            AdvertisedTrainIdent: '2507',
            LocationSignature: 'Sub',
            ToLocation: [{ LocationName: 'Vhe', Priority: 1, Order: 0 }],
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T06:09:00',
            AdvertisedTrainIdent: '2507',
            LocationSignature: 'Sub',
            ToLocation: [{ LocationName: 'Vhe', Priority: 1, Order: 0 }],
          },
        ],
        '2016-09-21T06:09:00'
      )
    ).toEqual(['2305', '2507'])
  })

  it('removes trains with activities an hour before now', () => {
    expect(
      trains(
        [
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T05:54:00',
            AdvertisedTrainIdent: '2305',
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T06:09:00',
            AdvertisedTrainIdent: '2507',
          },
        ],
        '2016-09-21T07:00:00'
      )
    ).toEqual(['2507'])
  })

  it('removes trains with activities 1.5 hours after now', () => {
    expect(
      trains(
        [
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T05:54:00',
            AdvertisedTrainIdent: '2305',
          },
          {
            ActivityType: 'Avgang',
            AdvertisedTimeAtLocation: '2016-09-21T06:39:00',
            AdvertisedTrainIdent: '2507',
          },
        ],
        '2016-09-21T05:00:00'
      )
    ).toEqual(['2305'])
  })
})
