const { Telegraf } = require("telegraf")
const TOKEN = "7361626549:AAGmEoJkeCCVRZC2JVG5MNDcfa6_9JsExlQ"
const bot = new Telegraf(TOKEN)

const web_link = "http://localhost:3000"

bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err)
})

bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: web_link}]]
    },
  })
)

bot.launch()