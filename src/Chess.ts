// chess.ts

function legalMoves(board: any, turn: "white" | "black") {
  let moves = generateAllMoves(board, turn);

  // --- Disable castling ---
  moves = moves.filter((m) => m.type !== "castling");

  // --- Disable en passant ---
  moves = moves.filter((m) => !(m.flags && m.flags.includes("e")));

  return moves;
}
