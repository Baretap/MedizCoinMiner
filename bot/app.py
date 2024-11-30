import telebot
import time
import threading

API_TOKEN = '7583368749:AAHPj7C8p_6ovA4pHXlxmXBb98aST8G_zTE'

bot = telebot.TeleBot(API_TOKEN)

# Kaivostoiminnan peruslogiikka
users_mining = {}

def mine_coins(user_id):
    while user_id in users_mining and users_mining[user_id]:
        bot.send_message(user_id, "Olet kaivanut 1 MedizCoin!")
        time.sleep(10)  # Kaivamisen aika

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "Tervetuloa MedizCoin kaivosbotin pariin! Käytä /mine aloittaaksesi kaivostoiminnan.")

@bot.message_handler(commands=['mine'])
def mine(message):
    user_id = message.chat.id
    if user_id not in users_mining:
        users_mining[user_id] = True
        threading.Thread(target=mine_coins, args=(user_id,)).start()
        bot.reply_to(message, "Kaivostoiminta aloitettu!")
    else:
        bot.reply_to(message, "Olet jo käynnistänyt kaivostoiminnan.")

@bot.message_handler(commands=['stop'])
def stop(message):
    user_id = message.chat.id
    if user_id in users_mining:
        users_mining[user_id] = False
        bot.reply_to(message, "Kaivostoiminta lopetettu.")
    else:
        bot.reply_to(message, "Et ole käynnistänyt kaivostoimintaa.")

if __name__ == "__main__":
    bot.polling()
