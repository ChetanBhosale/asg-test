const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is healthy and working"
    })
})

app.get('/hard', (req, res) => {
    const instanceId = process.env.pm_id ?? 'unknown'
    console.log(`Instance ${instanceId} started hardTask`)

    console.time(`hardTask_${instanceId}`)

    let count = 0
    for (let i = 0; i < 100000000; i++) {
        count += i
    }

    console.timeEnd(`hardTask_${instanceId}`)
    console.log(`Instance ${instanceId} completed hardTask`)

    res.status(200).json({
        message: `Hard task completed by instance ${instanceId}`,
        result: count
    })
})


const port = 8080
app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT : ${port}`)
})
