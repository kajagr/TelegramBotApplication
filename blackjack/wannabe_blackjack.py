import random
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# WannabeBlackjack token
TOKEN = '7314904722:AAF4I53N0va3GRqKwLCs2zHK4aTITWEzPu4'

# Game state management (using a dictionary to store user states)
user_data = {}


# Helper functions to manage the Blackjack game
# Creates a standard deck of 52 cards
def create_deck():
    suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    deck = [(rank, suit) for suit in suits for rank in ranks]
    random.shuffle(deck)
    return deck


# Deal a card from the deck
def deal_card(deck):
    return deck.pop()


# Calculate the value of the player's hand
def calculate_hand_value(hand):
    value = 0
    aces = 0
    for rank, _ in hand:
        if rank in ['J', 'Q', 'K']:
            value += 10
        elif rank == 'A':
            aces += 1
            value += 11
        else:
            value += int(rank)

    # Adjust for aces if value exceeds 21
    while value > 21 and aces:
        value -= 10
        aces -= 1
    
    return value


# Command Handlers
# Send a welcome message when the /start command is issued
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_data[update.effective_chat.id] = {
        'balance': 10
    }
    await update.message.reply_text(
        "Welcome to Blackjack Bot! You start with 10 coins.\n\n"
        "Here are the commands you can use:\n\n"
        "/bet <bet_amount> - Place a bet to start a new game. You must specify the amount you want to bet, for example, /bet 5.\n"
        "/hit - Draw another card to add to your hand. Use this if you want to increase your hand value.\n"
        "/stand - End your turn and let the dealer play. After you stand, the dealer will draw cards, and the winner will be determined.\n"
        "/add <amount> - Add more coins to your balance. Use this command if you run out of coins, for example, /add 10.\n"
        "/balance - Check your current balance. This command will tell you how many coins you currently have.\n\n"
        "Good luck, and may the odds be in your favor! Type /bet <bet_amount> to start a new game."
    )
    

# Start a new game, deal the initial cards and resolve bet
async def bet(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    try:
        bet = int(context.args[0])  
    except (IndexError, ValueError):
        await update.message.reply_text("Please specify a valid bet amount using the format: /bet <bet_amount>")
        return

    user_state = user_data.get(update.effective_chat.id)
    if user_state['balance'] < bet:
        await update.message.reply_text("You don't have enough coins to place that bet.")
        return
    
    balance_value = user_state['balance'] - bet
    deck = create_deck()
    player_hand = [deal_card(deck), deal_card(deck)]
    dealer_hand = [deal_card(deck), deal_card(deck)]
    
    user_data[update.effective_chat.id] = {
        'deck': deck,
        'player_hand': player_hand,
        'dealer_hand': dealer_hand,
        'bet': bet,
        'balance': balance_value
    }

    await update.message.reply_text(
        f"Your hand: {player_hand}, value: {calculate_hand_value(player_hand)}\n"
        f"Dealer's hand: [{dealer_hand[0]}, ('X', 'X')]\n"
        f"Your current balance: {balance_value} coins\n"
        "Type /hit to draw another card, or /stand to end your turn."
    )

# Handle the hit command, allowing the player to draw another card
async def hit(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_state = user_data.get(update.effective_chat.id)
    if not user_state['bet']:
        await update.message.reply_text("You need to bet first! Use /bet <bet_amount> to start a game.")
        return
    
    player_hand = user_state['player_hand']
    deck = user_state['deck']
    player_hand.append(deal_card(deck))
    
    hand_value = calculate_hand_value(player_hand)
    await update.message.reply_text(
        f"Your hand: {player_hand}, value: {hand_value}"
    )
    
    if hand_value > 21:
        await update.message.reply_text("You lose. Type /bet <bet_amount> to play again.")
        user_state['bet'] = None


# Handle the stand command, ending the player's turn and resolving the game
async def stand(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_state = user_data.get(update.effective_chat.id)
    if not user_state['bet']:
        await update.message.reply_text("You need to bet first! Use /bet <bet_amount> to start a game.")
        return
    
    player_hand = user_state['player_hand']
    dealer_hand = user_state['dealer_hand']
    deck = user_state['deck']
    bet_amount = user_state['bet']
    
    while calculate_hand_value(dealer_hand) < 17:
        dealer_hand.append(deal_card(deck))
    
    player_value = calculate_hand_value(player_hand)
    dealer_value = calculate_hand_value(dealer_hand)
    
    if dealer_value > 21 or player_value > dealer_value:
        result = "You win!"
        user_state['balance'] += 2 * bet_amount
    elif player_value < dealer_value:
        result = "You lose!"
    else:
        result = f"It's a tie! Your bet of {bet_amount} coins is returned."
        user_state['balance'] += bet_amount
    
    await update.message.reply_text(
        f"Dealer's hand: {dealer_hand}, value: {dealer_value}\n"
        f"Result: {result}\n"
        f"Your current balance: {user_state['balance']} coins\n"
        "Type /bet <bet_amount> to play again."
    )
    user_state['bet'] = None


# Handle the add command, add coins to balance value
async def add(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_state = user_data.get(update.effective_chat.id)

    try:
        deposit = int(context.args[0])
        user_state['balance'] += deposit
    except (IndexError, ValueError):
        await update.message.reply_text("Please specify a valid deposit amount using the format: /add <deposit_amount>")
        return
    
    await update.message.reply_text(
        f"Your current balance: {user_state['balance']} coins\n"
        "Type /bet <bet_amount> to play."
    )

# Handle the add command, add coins to balance value
async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_state = user_data.get(update.effective_chat.id)
    await update.message.reply_text(
        f"Your current balance: {user_state['balance']} coins\n"
        "Type /bet <bet_amount> to play."
    )

# Main function to set up the bot
def main() -> None:
    # Create the Application and pass it your bot's token
    application = Application.builder().token(TOKEN).build()

    # Register command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("bet", bet))
    application.add_handler(CommandHandler("hit", hit))
    application.add_handler(CommandHandler("stand", stand))
    application.add_handler(CommandHandler("add", add))
    application.add_handler(CommandHandler("balance", balance))

    # Run the bot until you stop it with Ctrl+C
    application.run_polling()

if __name__ == '__main__':
    main()
