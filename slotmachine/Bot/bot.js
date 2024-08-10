const { Telegraf } = require("telegraf")
const TOKEN = "7361626549:AAGmEoJkeCCVRZC2JVG5MNDcfa6_9JsExlQ"
const bot = new Telegraf(TOKEN)

const web_link = "https://sage-cobbler-d2cd33.netlify.app"

bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err)
})

bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: {url: web_link}}]]
    },
  })
)

bot.launch()