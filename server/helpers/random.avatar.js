function randomAvatar(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

module.exports = randomAvatar
