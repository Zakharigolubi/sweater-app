const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))

  const indexPath = path.join(__dirname, 'client', 'index.html')

  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
}

// else {
//   console.log('Development')
// }

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {})
    console.log(chalk.blue(`MongoDB Connected`))
    app.listen(PORT, () => {
      console.log(chalk.green(`Server started on port ${PORT}`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }
}
start()
