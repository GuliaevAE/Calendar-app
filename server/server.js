const express = require('express');
const app = express()
const cors = require('cors');


app.use(
    cors()
)

app.get("data", (req, res)=>{
    res.json({name: "k", favoritefood:"rice"})

    
})


const port = 5000

app.listen(port,() => {
    console.log(`[Server] server has been started on port: ${port}`);
})