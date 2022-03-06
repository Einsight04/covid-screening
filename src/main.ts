const {readFileSync, writeFileSync} = require('fs');
const puppeteer = require('puppeteer');
const moment = require('moment');


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 414,
            height: 896,
            isMobile: true,
        }
    });

    const {Client, Intents} = require("discord.js");

    function addStr(str: string, index: number, stringToAdd: any) {
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });

    client.on("ready", () => {
        console.log("Now online!");
    })

    client.on("messageCreate", async (message: { content: string; channel: { send: (arg0: { files: string[] }) => void; }; }) => {
        if (message.content.startsWith("covid")) {

            console.log('worked')


            let file = readFileSync('html/boilerplate.html', 'utf-8');

            moment.updateLocale('en', {
                meridiem: function (hour: any, minute: any, isLowercase: any) {
                    if (hour >= 12)
                        return isLowercase ? 'p.m.' : 'P.M.';
                    else
                        return isLowercase ? 'a.m.' : 'A.M.';
                }
            });

            let year: string = moment(new Date()).format('YYYY')
            let month: string = moment(new Date()).format('MMMM')
            let day: string = moment(new Date()).format('D')
            let timeNow: string = moment(new Date()).format('h:mm a')
            let timeEnd: string = moment().add(1, 'hours').format('h:mm a');//

            let date1: string = `Valid ${month} ${day}, ${year}`
            let date2: string = `from ${timeNow} to ${timeEnd}`

            let dateOneLength: number = date1.length

            file = (addStr(file, 93462, date1));
            file = (addStr(file, 93537 + dateOneLength, date2));

            await writeFileSync('html/index.html', file)

            await new Promise(r => setTimeout(r, 25));

            const page = await browser.newPage();
            await page.goto("http://localhost:63342/covid-screening/html/index.html?_ijt=673a5gp7sr6johd04p5uljun3o&_ij_reload=RELOAD_ON_SAVE");
            await page.screenshot({ path: 'screenshots/screenshot.png'});

            message.channel.send({
                files: ['./screenshots/screenshot.png']
            });

            await page.close();

        }
    });

await client.login(process.env.TOKEN);
})();
