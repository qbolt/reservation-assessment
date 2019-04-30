import moment from 'moment'

export function formatDate (date: Date, format: string = 'L', locale: string = 'en') {
  return moment(date)
    .locale(locale)
    .format(Array.isArray(format) ? format[0] : format)
}

export function parseDate (str: string, format: string = 'L', locale: string = 'en'): Date | undefined {
  const m = moment(str, format, locale, true)
  if (m.isValid()) {
    return m.toDate()
  }
  return undefined
}
