#!/usr/bin/env node

const chalk = require("chalk");
const request = require("request");
const Configstore = require("configstore");
const packageJson = require("../package.json");

const config = new Configstore(packageJson.name, { foo: "bar" });

const drinks = [
  "tea",
  "coffee",
  "water",
  "juice",
  "alcohol",
  "hotChocolate",
  "energyDrink",
];

const func = {
  increaseDrink: async function (drinks) {
    let webhook = config.get("webhook");
    let time = new Date().toLocaleTimeString();

    for (let i = 0; i < drinks.length; i++) {
      request(
        {
          method: "POST",
          url: `https://cawfee.dmdboi.me/api/drinks/${webhook}/count?d=${drinks[i]}`,
        },
        function (error, response) {
          if (error) throw new Error(error);
        }
      );
    }

    console.log(
      `[${time}] - You've increased your ${drinks} count by 1. Check your stats at`,
      chalk.blue("https://cawfee.dmdboi.me/account"),
      "Stay hydrated!"
    );
  },
};

async function main(args) {
  //If no drink arg
  if (!args[0]) {
    return console.log(chalk.red("Please enter a drink to increase"));
  }

  for (let i = 0; i < args.length; i++) {
    //If drink not supported
    if (!drinks.includes(args[i])) {
      return console.log(
        chalk.red(`Drink ${i} is not supported. Mission aborted.`)
      );
    }
  }

  await func.increaseDrink(args);
}

main(process.argv.slice(2));
