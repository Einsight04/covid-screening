"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
var puppeteer = require('puppeteer');
var moment = require('moment');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function addStr(str, index, stringToAdd) {
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }
    var browser, _a, Client, Intents, client;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({
                    headless: true,
                    defaultViewport: {
                        width: 414,
                        height: 896,
                        isMobile: true,
                    }
                })];
            case 1:
                browser = _b.sent();
                _a = require("discord.js"), Client = _a.Client, Intents = _a.Intents;
                client = new Client({
                    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
                });
                client.on("ready", function () {
                    console.log("Now online!");
                });
                client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
                    var file, year, month, day, timeNow, timeEnd, date1, date2, dateOneLength, page;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!message.content.startsWith("covid")) return [3 /*break*/, 7];
                                console.log('worked');
                                file = readFileSync('html/boilerplate.html', 'utf-8');
                                moment.updateLocale('en', {
                                    meridiem: function (hour, minute, isLowercase) {
                                        if (hour >= 12)
                                            return isLowercase ? 'p.m.' : 'P.M.';
                                        else
                                            return isLowercase ? 'a.m.' : 'A.M.';
                                    }
                                });
                                year = moment(new Date()).format('YYYY');
                                month = moment(new Date()).format('MMMM');
                                day = moment(new Date()).format('D');
                                timeNow = moment(new Date()).format('h:mm a');
                                timeEnd = moment().add(1, 'hours').format('h:mm a');
                                date1 = "Valid ".concat(month, " ").concat(day, ", ").concat(year);
                                date2 = "from ".concat(timeNow, " to ").concat(timeEnd);
                                dateOneLength = date1.length;
                                file = (addStr(file, 93462, date1));
                                file = (addStr(file, 93537 + dateOneLength, date2));
                                return [4 /*yield*/, writeFileSync('html/index.html', file)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 25); })];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, browser.newPage()];
                            case 3:
                                page = _a.sent();
                                return [4 /*yield*/, page.goto("http://localhost:63342/covid-screening/html/index.html?_ijt=673a5gp7sr6johd04p5uljun3o&_ij_reload=RELOAD_ON_SAVE")];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, page.screenshot({ path: 'screenshots/screenshot.png' })];
                            case 5:
                                _a.sent();
                                message.channel.send({
                                    files: ['./screenshots/screenshot.png']
                                });
                                return [4 /*yield*/, page.close()];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, client.login(process.env.TOKEN)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=main.js.map