import moment from 'moment'

function formatUnixTimestamp (seconds) {
  if (seconds) {
    return moment.unix(seconds).format('dddd, MMMM Do YYYY, h:mm a')
  }
  return ''
}

export { formatUnixTimestamp }
