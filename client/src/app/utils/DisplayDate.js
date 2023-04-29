let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
}

export function displayDate(date) {
  const createdAt = new Date(date)
  const dateNow = new Date()
  const yearDif = dateNow.getFullYear() - createdAt.getFullYear()
  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - createdAt.getDay()
    if (dayDif === 0) {
      const hoursDif = dateNow.getHours() - createdAt.getHours()
      if (hoursDif === 0) {
        const minutesDif = dateNow.getMinutes() - createdAt.getMinutes()
        if (minutesDif >= 0 && minutesDif < 2) return '1 минуту назад'
        if (minutesDif >= 2 && minutesDif < 3) return '2 минуту назад'
        if (minutesDif >= 3 && minutesDif < 4) return '3 минуту назад'
        if (minutesDif >= 4 && minutesDif < 5) return '4 минуту назад'
        if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад'
        if (minutesDif >= 10 && minutesDif < 30) {
          return '10 минут назад'
        }
        return '30 минут назад'
      }
      return (
        'сегодня в ' +
        `${createdAt.getHours()}:${createdAt
          .getMinutes()
          ?.toString()
          .padStart(2, '0')}`
      )
    }
    return (
      'вчера в ' +
      `${createdAt.getHours()}:${createdAt
        .getMinutes()
        ?.toString()
        .padStart(2, '0')}`
    )
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
