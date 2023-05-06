let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
}

export function displayDate(date) {
  const createdAt = new Date(date)
  const dateNow = new Date()
  const timeDif = dateNow.getTime() - createdAt.getTime()
  const daysDif = Math.round(timeDif / (1000 * 60 * 60 * 24))
  if (daysDif === 0) {
    const hoursDif = dateNow.getHours() - createdAt.getHours()
    if (hoursDif === 0) {
      const minutesDif = dateNow.getMinutes() - createdAt.getMinutes()
      if (minutesDif <= 1) return `1 минуту назад`
      if (minutesDif > 1 && minutesDif <= 4) return `${minutesDif} минуты назад`
      if (minutesDif > 4 && minutesDif <= 20) return `${minutesDif} минут назад`
      if (minutesDif === 21) return `21 минуту назад`
      if (minutesDif > 21 && minutesDif <= 24)
        return `${minutesDif} минуты назад`
      if (minutesDif > 24 && minutesDif <= 30)
        return `${minutesDif} минут назад`
      if (minutesDif === 31) return `31 минуту назад`
      if (minutesDif > 31 && minutesDif <= 34)
        return `${minutesDif} минуты назад`
      if (minutesDif > 34 && minutesDif <= 40)
        return `${minutesDif} минут назад`
      if (minutesDif === 41) return `41 минуту назад`
      if (minutesDif > 41 && minutesDif <= 44)
        return `${minutesDif} минуты назад`
      if (minutesDif > 44 && minutesDif <= 50)
        return `${minutesDif} минут назад`
      if (minutesDif === 51) return `51 минуту назад`
      if (minutesDif > 51 && minutesDif <= 54)
        return `${minutesDif} минуты назад`
      if (minutesDif > 54 && minutesDif <= 59)
        return `${minutesDif} минут назад`
    }
    if (hoursDif === 1) return `1 час назад`
    if (hoursDif <= 24)
      return `сегодня в ${createdAt.getHours()}:${createdAt
        .getMinutes()
        ?.toString()
        .padStart(2, '0')}`
    if (hoursDif > 24 && hoursDif <= 48)
      return `вчера в ${createdAt.getHours()}:${createdAt
        .getMinutes()
        ?.toString()
        .padStart(2, '0')}`
  }
  return (
    createdAt.toLocaleString('ru', options) +
    ' в ' +
    `${createdAt.getHours()}:${createdAt
      .getMinutes()
      ?.toString()
      .padStart(2, '0')}`
  )
}

export function displayDateProfile(date) {
  const createdAt = new Date(date)
  return createdAt.toLocaleString('ru', options)
}
