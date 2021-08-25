require('dotenv').config()

const express = require('express')
const app = express()
const router = require("./router")
const cookiesParser = require('cookie-parser')


app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(express.static("public"))
app.use(cookiesParser())

app.set("views", "views")
app.set("view engine", "hbs")

app.use("/", router)

app.listen(process.env.PORT, ()=>
{
    console.log(`Server run to http://localhost:${process.env.PORT}`)
})