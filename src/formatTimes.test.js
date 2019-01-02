import formatTimes from './formatTimes'

describe('formatTimes', () => {
  it('returns cross given no input', () => {
    expect(formatTimes()).toBe('×')
  })

  it('trims date', () => {
    expect(
      formatTimes({ AdvertisedTimeAtLocation: '2016-09-05T21:22:23' })
    ).toBe('21:22:23')
  })

  it('trims leading zero from hour', () => {
    expect(
      formatTimes({ AdvertisedTimeAtLocation: '2016-09-05T09:23:00' })
    ).toBe('9:23')
    expect(
      formatTimes({ AdvertisedTimeAtLocation: '2016-09-05T09:23:21' })
    ).toBe('9:23:21')
  })

  it('shows estimated if no actual exists', () => {
    expect(
      formatTimes({
        AdvertisedTimeAtLocation: '2016-09-05T21:23:00',
        EstimatedTimeAtLocation: '2016-09-05T21:24:00',
      })
    ).toBe('<i>21:24</i>/23')
  })

  it('does not show estimated if actual exists', () => {
    expect(
      formatTimes({
        AdvertisedTimeAtLocation: '2016-09-05T21:23:00',
        TimeAtLocation: '2016-09-05T21:25:00',
      })
    ).toBe('<b>21:25</b>/23')
  })

  it('cuts off hours correctly even if they are one-digit', () => {
    expect(
      formatTimes({
        AdvertisedTimeAtLocation: '2016-09-05T09:23:00',
        TimeAtLocation: '2016-09-05T09:25:00',
      })
    ).toBe('<b>9:25</b>/23')
  })

  it('does not show advertised if actual is same', () => {
    expect(
      formatTimes({
        AdvertisedTimeAtLocation: '2016-09-05T21:23:00',
        TimeAtLocation: '2016-09-05T21:23:00',
      })
    ).toBe('<b>21:23</b>')
  })

  it('does not show advertised if activity type is ankomst', () => {
    expect(
      formatTimes({
        ActivityType: 'Ankomst',
        AdvertisedTimeAtLocation: '2016-09-05T21:23:00',
        TimeAtLocation: '2016-09-05T21:22:00',
      })
    ).toBe('<b>21:22</b>')
  })

  it('shows advertised if activity type is ankomst', () => {
    expect(
      formatTimes({
        ActivityType: 'Ankomst',
        EstimatedTimeAtLocation: '2016-09-05T21:24:00',
        AdvertisedTimeAtLocation: '2016-09-05T21:23:00',
      })
    ).toBe('<i>21:24</i>/23')
  })
})
