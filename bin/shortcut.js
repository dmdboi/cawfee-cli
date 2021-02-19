#!/usr/bin/env node

const chalk = require("chalk");
const request = require("request");
const Configstore = require("configstore");
const packageJson = require("../package.json");

const config = new Configstore(packageJson.name, { foo: "bar" });

const drinks = ["tea", "coffee", "water", "juice", "alcohol", "hotChocolate", "energyDrink"]

const func = {
  increaseDrink: async function (drink) {
    let webhook = config.get("webhook");
    let time = new Date().toLocaleTimeString();

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
};

async function main(args) {
  //If no drink arg
  if (!args[0]) {
    return console.log(chalk.red("Please enter a drink to increase"));
  }

  //If drink not supported
  if (!drinks.includes(args[0])) {
    return console.log(chalk.red("This drink isn't supported"));
  }

  await func.increaseDrink(args[0]);
}

main(process.argv.slice(2));
