#!/usr/bin/env node

const chalk = require("chalk");
const request = require("request");
const Configstore = require("configstore");
const packageJson = require("../package.json");

const config = new Configstore(packageJson.name, { foo: "bar" });

const func = {
  sendHelp: async function () {
    console.log(chalk.underline.bold("--- Commands ---"));
    console.log("-d => Increases the given drink count. e.g -d water");
    console.log("-w => Sets your webhook URL. e.g -w 123456-678910 ");
    console.log("-h => List of commands");
  },

  increaseDrink: async function (drink) {
    let webhook = config.get("webhook");
    let time = new Date().toLocaleTimeString()

    request(
      {
        method: "POST",
        url: `https://cawfee.dmdboi.me/api/drinks/${webhook}/count?d=${drink}`,
      },
      function (error, response) {
        if (error) throw new Error(error);
        console.log(
          `[${time}] - You've increased your ${drink} count by 1. Check your stats at`,
          chalk.blue("https://cawfee.dmdboi.me/account"),
          "Stay hydrated!"
        );
      }
    );
  },

  setWebhook: async function (webhook) {
    config.set("webhook", webhook);
    console.log(chalk.green("Your webhook has been set. Change it any time using -w again."))
  },
};

async function main(args) {
  if (!args[0]) {
    return func.sendHelp();
  }

  switch (args[0]) {
    case "-h":
      await func.sendHelp();
      break;
    case "-d":
      if (!args[1]) {
        return console.log(chalk.red("Please enter a drink to increase"));
      }
      await func.increaseDrink(args[1]);
      break;
    case "-w":
      if (!args[1]) {
        return console.log(chalk.red("Please enter your webhook key to set it"));
      }
      await func.setWebhook(args[1]);
      break;
    case "rocket":
      console.log("Buy the dip.");
      break;
    default:
      await func.sendHelp();
  }
}

main(process.argv.slice(2));
