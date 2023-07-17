require("dotenv").config();
require('./config/modelConfig')

let express = require('express')
const commonRouter = require("./routes/mainRoutes");
const cron = require('node-cron');

let app = express()

app.use(express.json())
app.use('/', commonRouter)

app.get("/send", async (req, res) => {
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email Sent Successfully" + info.response);
        }
    });
});

// cron.schedule("* * * * * *", function() {
//     console.log("running a task in every 10 second");
//     // transporter.sendMail(mailOption, (error, info) => {
//     //     if (error) {
//     //         console.log(error);
//     //     }
//     //     else {
//     //         console.log("Email Sent Successfully" + info.response);
//     //     }
//     // });
// })

app.listen(process.env.PORT, (req, res) => {
    console.log(`The server is running on port: ${process.env.PORT}`)
})
