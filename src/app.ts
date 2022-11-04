const express = require('express');
const cors = require('cors')
const logger = require("morgan")
import {router} from "./routes/index"

export const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/',router)