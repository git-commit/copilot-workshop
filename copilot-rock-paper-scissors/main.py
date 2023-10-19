# Write a rock, paper, scissors game
import random

from typing import Literal

Choice = Literal["rock", "paper", "scissors", "lizard", "spock"]
choices: list[Choice] = ["rock", "paper", "scissors", "lizard", "spock"]

# define win conditions mapping and reason for win
win_conditions: dict[Choice, tuple[list[Choice], str]] = {
    "rock": (
        ["scissors", "lizard"],
        "rock beats scissors and lizard, because rock crushes scissors and crushes lizard",
    ),
    "paper": (
        ["rock", "spock"],
        "paper beats rock and spock, because paper covers rock and disproves spock",
    ),
    "scissors": (
        ["paper", "lizard"],
        "scissors beats paper and lizard, because scissors cut paper and decapitate lizard",
    ),
    "lizard": (
        ["spock", "paper"],
        "lizard beats spock and paper, because lizard poisons spock and eats paper",
    ),
    "spock": (
        ["scissors", "rock"],
        "spock beats scissors and rock, because spock smashes scissors and vaporizes rock",
    ),
}


def get_user_choice() -> Choice:
    # We want a terminal interface that allows to provide the choice easily via a number.
    try:
        print(
            "Choose your option (1 - rock, 2 - paper, 3 - scissors, 4 - lizard, 5 - spock): "
        )
        # Get user choice, validate, and convert to integer
        user_choice = int(input())
        # Subtract 1 from user choice to get the index
        user_choice_index = user_choice - 1
        # Get user choice from choices list
        return choices[user_choice_index]
    except (ValueError, IndexError):
        print("Invalid choice. Please try again.")
        return get_user_choice()


def generate_computer_choice():
    """Generate computer choice - the computer should always win"""
    return random.choice(choices)


def play(player_choice: Choice, computer_choice: Choice):
    # Determine winner with win conditions
    if player_choice == computer_choice:
        print("It's a tie!")
    elif computer_choice in win_conditions[player_choice][0]:
        print(f"You win! {win_conditions[player_choice][1]}")
    else:
        print(f"You lose! {win_conditions[computer_choice][1]}")


def main():
    # Welcome message
    print("Welcome to Rock, Paper, Scissors (Lizard, Spock)!")
    player_choice = get_user_choice()
    computer_choice = generate_computer_choice()

    # Print choices:
    print(f"You chose {player_choice}")
    print(f"Computer chose {computer_choice}")

    play(player_choice, computer_choice)

    # Print goodbye message
    print("Thanks for playing. Please play again!")


if __name__ == "__main__":
    main()
