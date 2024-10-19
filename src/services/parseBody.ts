export default function ParseBody(req, res, next) {
    let bodyData = []

    req.on("data", chunk => {
        bodyData.push(chunk)
    })

    req.on("end", () => {
        req.body = Buffer.concat(bodyData).toString()
        if (req.headers["content-type"] === "application/json"){
            req.body = JSON.parse(req.body)
        }
        next(req, res)
    })
}