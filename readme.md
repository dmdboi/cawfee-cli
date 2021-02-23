# Introduction

This is a small CLI tool for logging your coffee consumption to [Cawfee](https://cawfee.dmdboi.me/).

## Commands


``cawfee -d drink`` => Increases your ``drink`` parameter count.


``cawfee -s drink`` => Returns stats for ``drink`` parameter.


``cawfee -w webhook`` => Sets your webhook endpoint. This is in your ``/settings`` page


``cawfee -h`` => Lists available commands

### Shortcuts

``drink [drink]`` => Increases your ``drink`` parameter count

*multi-drink support*

``drink [drink] [drink]`` => Increases each ``drink`` parameter count

## Supported Drink Parameters

- coffee
- tea
- water
- juice
- alcohol
- hotChocolate
- energyDrink