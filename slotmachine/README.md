# Slot Machine Mini-App

## Overview

The Slot Machine Mini-App is a simple web application that allows users to purchase virtual tickets using Stripe for payment processing. The application integrates with a Telegram bot, enabling users to interact with the app both through the web interface and via the Telegram bot.

## Running the Application

There are three ways to run the application, because I was unable to finish my app in time, so frontend and backend are not connected:

### 1. Deployed Application 

You can access the deployed version of the application at the following URL:

[https://sage-cobbler-d2cd33.netlify.app](https://sage-cobbler-d2cd33.netlify.app)

This version is hosted online (online purchesing does not work).

### 2. Running the Telegram Bot Locally

To interact with the Telegram bot locally, follow these steps:

1. Clone the repository from GitHub.
2. Navigate to the `Bot` folder in your terminal:
   ```bash
   cd slotmachine/Bot
3. Run the bot:
    ```bash
    node bot.js
4. Open the Telegram app and search for the user @wannabe_slot_machine_bot.
5. Start a chat with the bot to begin interacting with the application.

### Running the Application Locally (Including Stripe Integration)

To run the entire application locally, including the backend server for Stripe integration, follow these steps:

1. Clone the repository from GitHub.
2. Navigate to the server folder
3. Start the backend server:
    ```bash
    node server.js
4. Open a new terminal window and navigate to the slotmachine folder:
5. Start the React frontend application:
    ```bash
    npm start

## Improvements

Unfortunately, due to time constraints, I wasn't able to fully integrate the backend and frontend for deployment. I was also unable to complete success and cancel page after payment, however, the project was fun and I will finish it in my own pace :)


