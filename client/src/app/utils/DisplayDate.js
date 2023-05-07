export function displayDate(date) {
  const createdAt = new Date(date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Europe/Moscow'
  }
  const formatter = new Intl.DateTimeFormat('ru', options)
  const formattedDate = formatter.format(createdAt)

  const dateNow = new Date()
  const timeDif = dateNow.getTime() - createdAt.getTime()
  const daysDif = Math.round(timeDif / (1000 * 60 * 60 * 24))

  if (daysDif === 0) {
    const minutesDif = Math.round(timeDif / (1000 * 60))

    if (minutesDif < 60) {
      if (minutesDif === 0) {
        return 'сейчас'
      }
      if (minutesDif % 10 === 1) return `${minutesDif} минуту назад`
      if (
        (minutesDif % 10 === 2 && minutesDif !== 12) ||
        (minutesDif % 10 === 3 && minutesDif !== 13) ||
        (minutesDif % 10 === 4 && minutesDif !== 14)
      ) {
        return `${minutesDif} минуты назад`
      }
      return `${minutesDif} минут назад`
    }
    return `сегодня в ${createdAt.getHours()}:${createdAt
      .getMinutes()
      ?.toString()
      .padStart(2, '0')}`
  } else if (daysDif === 1) {
    return `вчера в ${createdAt.getHours()}:${createdAt
      .getMinutes()
      ?.toString()
      .padStart(2, '0')}`
  } else {
    return formattedDate
  }
}

export function displayDateProfile(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
    timeZone: 'Europe/Moscow'
  }
  const createdAt = new Date(date)
  return createdAt.toLocaleString('ru', options)
}
