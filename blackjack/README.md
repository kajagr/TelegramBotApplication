# Telegram Blackjack Bot

This is a simple Blackjack bot for Telegram, implemented in Python using the `python-telegram-bot` library. The bot allows users to play a game of Blackjack with betting functionality.

## Features

- Start a new game with a specified bet amount.
- Hit to draw additional cards.
- Stand to end your turn and let the dealer play.
- Check your current balance.
- Add more coins if you run out.

## Live Bot

You can interact with the live bot on Telegram: [Click Here to Open the Bot](https://t.me/wannabe_blackjack_bot)

## Installation

git clone git@github.com:kajagr/TelegramBotApplication.git
cd TelegramBotApplication

pip install -r requirements.txt

Replace 'YOUR_TOKEN_HERE' in the wannabe_blackjack.py file with your actual Telegram bot token obtained from BotFather.
TOKEN = 'YOUR_TOKEN_HERE'

Run the bot locally
python wannabe_blackjack.py

## Deployment

heroku create wannabeblackjack

git push heroku main

heroku ps:scale worker=1 
