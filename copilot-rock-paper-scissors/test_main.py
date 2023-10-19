# we want to achieve 100% coverage with pytest-cov
#
# # Let's start with the imports
from unittest.mock import patch
import pytest
from main import get_user_choice, generate_computer_choice, main, win_conditions, play


# We want to test the get_user_choice function
def test_get_user_choice():
    # Define the expected outputs for each input
    expected_outputs = ["rock", "paper", "scissors", "lizard", "spock"]
    # Loop through each input and expected output
    for i, expected_output in enumerate(expected_outputs):
        # Mock the input function to return the current input value
        with patch("builtins.input", return_value=str(i + 1)):
            # Call the get_user_choice function
            user_choice = get_user_choice()
            # Check that the user choice matches the expected output
            assert user_choice == expected_output


# test the full main loop with a mock for random.choice and input
# use pytest.parametrize to test all possible outcomes
@patch("random.choice")
@patch("builtins.input")
@pytest.mark.parametrize(
    "computer_choice, user_choice, expected_output",
    [
        ("rock", "rock", "It's a tie!"),
        (
            "paper",
            "rock",
            "You lose! paper beats rock and spock, because paper covers rock and disproves spock",
        ),
        (
            "scissors",
            "rock",
            "You win! rock beats scissors and lizard, because rock crushes scissors and crushes lizard",
        ),
        (
            "lizard",
            "rock",
            "You win! rock beats scissors and lizard, because rock crushes scissors and crushes lizard",
        ),
        (
            "spock",
            "rock",
            "You lose! spock beats scissors and rock, because spock smashes scissors and vaporizes rock",
        ),
        (
            "rock",
            "paper",
            "You win! paper beats rock and spock, because paper covers rock and disproves spock",
        ),
        ("paper", "paper", "It's a tie!"),
        (
            "scissors",
            "paper",
            "You lose! scissors beats paper and lizard, because scissors cut paper and decapitate lizard",
        ),
        (
            "lizard",
            "paper",
            "You lose! lizard beats spock and paper, because lizard poisons spock and eats paper",
        ),
        (
            "spock",
            "paper",
            "You win! paper beats rock and spock, because paper covers rock and disproves spock",
        ),
        (
            "rock",
            "scissors",
            "You lose! rock beats scissors and lizard, because rock crushes scissors and crushes lizard",
        ),
        (
            "paper",
            "scissors",
            "You win! scissors beats paper and lizard, because scissors cut paper and decapitate lizard",
        ),
        ("scissors", "scissors", "It's a tie!"),
        (
            "lizard",
            "scissors",
            "You win! scissors beats paper and lizard, because scissors cut paper and decapitate lizard",
        ),
        (
            "spock",
            "scissors",
            "You lose! spock beats scissors and rock, because spock smashes scissors and vaporizes rock",
        ),
        (
            "rock",
            "lizard",
            "You lose! rock beats scissors and lizard, because rock crushes scissors and crushes lizard",
        ),
        (
            "paper",
            "lizard",
            "You win! lizard beats spock and paper, because lizard poisons spock and eats paper",
        ),
        (
            "scissors",
            "lizard",
            "You lose! scissors beats paper and lizard, because scissors cut paper and decapitate lizard",
        ),
        ("lizard", "lizard", "It's a tie!"),
        (
            "spock",
            "lizard",
            "You win! lizard beats spock and paper, because lizard poisons spock and eats paper",
        ),
        (
            "rock",
            "spock",
            "You win! spock beats scissors and rock, because spock smashes scissors and vaporizes rock",
        ),
        (
            "paper",
            "spock",
            "You lose! paper beats rock and spock, because paper covers rock and disproves spock",
        ),
        (
            "scissors",
            "spock",
            "You win! spock beats scissors and rock, because spock smashes scissors and vaporizes rock",
        ),
        (
            "lizard",
            "spock",
            "You lose! lizard beats spock and paper, because lizard poisons spock and eats paper",
        ),
        ("spock", "spock", "It's a tie!"),
    ],
)
def test_play(
    mock_input, mock_choice, computer_choice, user_choice, expected_output, capsys
):
    choice_number = {
        "rock": 1,
        "paper": 2,
        "scissors": 3,
        "lizard": 4,
        "spock": 5,
    }
    # Mock the input function to return the current input value
    mock_input.return_value = str(choice_number[user_choice])
    # Mock the random.choice function to return the current computer choice
    mock_choice.return_value = computer_choice
    # Call the play function
    main()

    # Check that the output matches the expected output
    mock_input.assert_called_once()
    mock_choice.assert_called_once()
    mock_input.assert_called_with()
    assert mock_input.call_count == 1
    assert mock_choice.call_count == 1

    # assert via capsys
    captured = capsys.readouterr()
    assert expected_output in captured.out
