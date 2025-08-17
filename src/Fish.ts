// fish.ts

// Define piece values
const pieceValues: Record<string, number> = {
  q: 9,
  r: 5,
  b: 3,
  n: 3,
  p: 1,
};

// Track scores
let scores = { white: 0, black: 0 };

// Track move history for Free Hit logic
let moveHistory: any[] = [];
let freeHitGranted = false;

// Called whenever a move is played
function handleMove(move: any, board: any, turn: "white" | "black") {
  const captured = move.capturedPiece;
  const promotion = move.promotion;

  // --- Capture Scoring ---
  if (captured) {
    scores[turn] += pieceValues[captured.toLowerCase()] || 0;
  }

  // --- Promotion Bonus ---
  if (promotion) {
    scores[turn] += (pieceValues[promotion.toLowerCase()] || 0) - 1;
  }

  // Save move for later foul capture check
  moveHistory.push({ move, turn });

  // --- Free Hit Logic ---
  if (moveHistory.length === 12 && turn === "black") {
    if (isFoulCapture(move, board)) {
      freeHitGranted = true;
    }
  }
}

// Checkmate = instant win
function checkMateDetected(winner: "white" | "black") {
  alert(`${winner} wins instantly by checkmate!`);
  endGame(winner);
}

// Custom foul capture check
function isFoulCapture(move: any, board: any): boolean {
  // Case 1: Black captures but White can mate next move
  if (move.capturedPiece && willBeMateNext(board, "white")) return true;

  // Case 2: Exchange is unfavorable for Black
  if (isBadExchange(move, board)) return true;

  // Case 3: Black promotes to queen and White can capture it
  if (move.promotion === "q" && canBeCapturedNext(board, "q", "black")) return true;

  return false;
}

// Utility placeholders (you’ll implement with Stockfish eval or simple board scan)
function willBeMateNext(board: any, turn: string): boolean {
  return false; // TODO: hook into Stockfish eval
}

function isBadExchange(move: any, board: any): boolean {
  return false; // TODO: calculate net material on capture square
}

function canBeCapturedNext(board: any, piece: string, color: string): boolean {
  return false; // TODO: check if new queen can be taken
}
