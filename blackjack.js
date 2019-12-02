var deck = new Array();
var playerHand = new Array();
var computerHand = new Array();
var playerPoints = 0;
var computerPoints = 0;
var bet = 0;
var oldCredits = 0;

function createDeck()
{
    var value;
    var rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    for (let i = 0 ; i < rank.length; i++)
    {
        if ((rank[i] === "J") || (rank[i] === "Q") || (rank[i] === "K"))
        {
          value = 10;
        }

        else if (rank[i] === "A")
        {
          value = 1;
        }

        else
        {
          value = parseInt(rank[i]);
        }

        var cardHeart = {Rank: rank[i], Suit: "Hearts", Weight: value};
        deck.push(cardHeart);
        var cardDiamond = {Rank: rank[i], Suit: "Diamonds", Weight: value};
        deck.push(cardDiamond);
        var cardSpade = {Rank: rank[i], Suit: "Spades", Weight: value};
        deck.push(cardSpade);
        var cardClub = {Rank: rank[i], Suit: "Clubs", Weight: value};
        deck.push(cardClub);
    }
}

function shuffle()
{
  for (let i = deck.length - 1; i > 0; i--)
  {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function initializeHands()
{
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
  playerHand.push(deck.pop());
  computerHand.push(deck.pop());
}

function calculatePoints(hand)
{
  var points = 0;

  for(let i = 0; i < hand.length; i++)
  {
      points += hand[i].Weight;
  }

  return points
}

function play()
{
  bet = parseInt(document.getElementById("bet").value);
  oldCredits = parseInt(document.getElementById("credits").value);
  document.getElementById("credits").value = oldCredits - bet;
  $('#hitMe, #stay').show();
  $('#hitMe').attr("disabled", false);
  $('#stay').attr("disabled", false);
  document.getElementById("outcome").innerHTML = "";
  deck = new Array();
  playerHand = new Array();
  computerHand = new Array();
  createDeck();
  shuffle();
  initializeHands();
  playerPoints = calculatePoints(playerHand);
  computerPoints = calculatePoints(computerHand);
  document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + ".";
}

function deal()
{
  if (deck.length === 0)
  {
    return;
  }

  playerHand.push(deck.pop());
  playerPoints = calculatePoints(playerHand);

  if (playerPoints > 21)
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + ".";
    document.getElementById("outcome").innerHTML = "YOU LOST! Better luck next time!";
    document.getElementById("hitMe").disabled = true;
    document.getElementById("stay").disabled = true;
  }
  else
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + ".";
  }
}

function stay()
{
  if (computerPoints <= 17)
  {
    computerHand.push(deck.pop());
    computerPoints = calculatePoints(computerHand);
    stay();
  }

  else if (computerPoints > 21)
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + " and your opponent's hand value is " + computerPoints + ".";
    document.getElementById("outcome").innerHTML = "YOU WON! Another match?";
    document.getElementById("hitMe").disabled = true;
    document.getElementById("stay").disabled = true;
    oldCredits = parseInt(document.getElementById("credits").value);
    document.getElementById("credits").value = oldCredits + (2 * bet);
  }

  else if (computerPoints > playerPoints)
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + " and your opponent's hand value is " + computerPoints + ".";
    document.getElementById("outcome").innerHTML = "YOU LOST! Better luck next time!";
    document.getElementById("hitMe").disabled = true;
    document.getElementById("stay").disabled = true;
  }

  else if (playerPoints > computerPoints)
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + " and your opponent's hand value is " + computerPoints + ".";
    document.getElementById("outcome").innerHTML = "YOU WON! Another match?";
    document.getElementById("hitMe").disabled = true;
    document.getElementById("stay").disabled = true;
    oldCredits = parseInt(document.getElementById("credits").value);
    document.getElementById("credits").value = oldCredits + (2 * bet);
  }

  else if (playerPoints == computerPoints)
  {
    document.getElementById("player").innerHTML = "Your hand value is " + playerPoints + " and your opponent's hand value is " + computerPoints + ".";
    document.getElementById("outcome").innerHTML = "TIE! Another match?";
    document.getElementById("hitMe").disabled = true;
    document.getElementById("stay").disabled = true;
    oldCredits = parseInt(document.getElementById("credits").value);
    document.getElementById("credits").value = oldCredits + bet;
  }
}
