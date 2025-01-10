# Hanming Code

I once came across such a puzzle and attempted to find the answer myself without looking at the solution. However, I couldn't solve it at that time and eventually forgot about it. Recently, while studying memory error correction algorithms, I was inspired and found a solution. Unfortunately, the original source of this puzzle is nowhere to be found now.

## Puzzle

The puzzle can be described roughly as follows:
There is an 8x8 black and white chessboard with a hidden compartment beneath each square that can hold a gem. Two players participate in this puzzle.

1. Player B is blindfolded, and Player A can observe.
2. First, the puzzle setter places a gem in one of the hidden compartments on the chessboard in front of Player A. The chessboard is then filled with 64 pieces (each piece being either black or white entirely at random).
3. Player A cannot communicate with Player B but can flip exactly one piece on the board. (Each piece has a black and white side, and Player A is allowed to flip only one piece.)
4. Player B is then allowed to observe the chessboard and must guess the location of the gem.

These are the game rules. Before the game begins, the two players are allowed to discuss their strategy. How can they design a strategy so that Player B can successfully guess the location of the gem?

## Solution

Treat the black pieces as 1 and the white pieces as 0. Clearly, this problem can be considered a coding problem: finding a 64-bit to 6-bit encoding scheme such that any original code with a Hamming distance of 1 (all 64 possibilities) maps to one of 64 possible target codes (2^6 = 64). The Hamming error correction code provides a perfect solution.

We use binary representation for the 64 address bits, starting from 0:

```
000000, 000001, ..., 111111
```

Addresses with exactly one bit set to 1 are used as parity check bits, while the rest are treated as data bits. Thus, there are six parity check bits:

```
000001, 000010, 000100, 001000, 010000, 100000
```

In decimal, these correspond to 1, 2, 4, 8, 16, and 32. If a data bit's address has a 1 in a particular position, it participates in that corresponding parity check calculation. For example, the data bit at address 50 (binary 110010) participates in the parity checks at addresses 32, 16, and 2 ($50 = 32 + 16 + 2$).

Thus, one can obtain an expected 6-bit parity result. Comparing this expected result with the actual parity bits and performing an XOR operation yields a syndrome, which may point to any address.

Here comes the remarkable part: since Player A can choose to flip any piece, Player A’s task is to flip a piece such that the new syndrome points to the gem's location. Which piece should Player A flip?

Flipping any bit will flip its associated parity check bit, meaning:

$$
current\_syndrome \bigoplus flip\_location = new\_syndrome
$$

We aim to have the new syndrome point to the gem’s location:

$$
current\_syndrome \bigoplus flip\_location = gem\_location
$$

Using properties of the XOR function, it follows that:

$$
current\_syndrome \bigoplus current\_syndrome \bigoplus flip\_location = current\_syndrome \bigoplus gem\_location
$$

$$
flip\_location = current\_syndrome \bigoplus gem\_location
$$

Thus, the answer is apparent: simply XOR the gem's location with the current syndrome!

Attentive readers may notice that the piece at address 0 is unused in calculations. Indeed, it is only used when the current syndrome already matches the gem's address, in which case flipping it changes nothing. Consequently, the board could technically be one position short (totaling 63) if Player A is allowed not to flip any piece.

Importantly, this game doesn't require an 8x8 board; it merely requires the total number of pieces to be a power of 2.

> This solution draws on memory error correction algorithms, specifically Hamming code.

## Code

I implemented this algorithm, and more interesting stuff can be found [here](https://github.com/caoqiming/gem-and-chessboard-puzzle).
