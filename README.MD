import random

def start_game():
    words = ["python", "machine", "learning", "bridge", "software"]

    secret_word = random.choice(words)
    
    display_word = ["_"] * len(secret_word)

    print("Welcome to the Word Guessing Game!")
    
    attempts = 6
    guessed_letters = []

  
    while attempts > 0:
        print(f"\nWord: {' '.join(display_word)}")
        print(f"Attempts left: {attempts}")
        print(f"Guessed letters: {', '.join(guessed_letters)}")

        user_input = input("Guess a letter: ").lower()

        if len(user_input) != 1 or not user_input.isalpha():
            print("Error: Please enter only a single letter.")
            continue

        if user_input in guessed_letters:
            print(f"You already guessed '{user_input}'. Try a different one.")
            continue

        guessed_letters.append(user_input)

        if user_input in secret_word:
            print(f"Good job! '{user_input}' is in the word.")
        
            for i in range(len(secret_word)):
                if secret_word[i] == user_input:
                    display_word[i] = user_input
        else:
            print(f"Sorry, '{user_input}' is not there.")
            attempts -= 1

        if "_" not in display_word:
            print(f"\nCongratulations! You guessed the word: {secret_word}")
            break
    else:
        print(f"\nGame Over! You ran out of attempts. The word was: {secret_word}")