const expect = require('chai').expect

const htmlTable = require('../htmlTable')

describe('htmlTable', function() {
  it('returns object with composite keys', function() {
    const actual = htmlTable(
      [
        {
          ActivityType: 'Ankomst',
          AdvertisedTimeAtLocation: '2016-09-08T22:18:00',
          AdvertisedTrainIdent: '2772',
          LocationSignature: 'Tu',
          ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          TimeAtLocation: '2016-09-08T22:17:00',
        },
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2016-09-08T22:18:00',
          AdvertisedTrainIdent: '2772',
          LocationSignature: 'Tu',
          ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
          TimeAtLocation: '2016-09-08T22:18:00',
        },
        {
          ActivityType: 'Ankomst',
          AdvertisedTimeAtLocation: '2016-09-08T22:22:00',
          AdvertisedTrainIdent: '2772',
          LocationSignature: 'Tul',
          ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
        },
        {
          ActivityType: 'Avgang',
          AdvertisedTimeAtLocation: '2016-09-08T22:22:00',
          AdvertisedTrainIdent: '2772',
          LocationSignature: 'Tul',
          ToLocation: [{ LocationName: 'Mr', Priority: 1, Order: 0 }],
        },
      ],
      ['Tu', 'Tul']
    )

    expect(actual).to.match(/<span class="td station Ankomst">Ank Tu<.span>/)
  })
})
