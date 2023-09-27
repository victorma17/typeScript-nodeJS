
import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const app: Application = express ()

// Possible body received
// a=22&b=22
// {a:1,b:22}

// middleware
app.use(morgan("combined"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req:Request, res:Response, next: NextFunction) => {
    
    res.setHeader("X-Start", new Date().toISOString())
    next();
    
    const datos = {
        body: req.body,
        param: req.query
    }
    res.send(JSON.stringify(datos))
})

app.post("/formulario", async(req, res) => {
    const datos = {
        body: req.body,
        param: req.query
    }
    // access to DB, etc
    res.send(JSON.stringify(datos))
})


app.get("/", (req: Request, res:Response) => {
    res.send("holita")
})



app.listen(4444)
console.log("holaa")