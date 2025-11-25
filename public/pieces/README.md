# Chess Piece Assets

## Required Files

Place your exported chess piece SVG or PNG files in this directory with the following names:

### White Pieces
- `white-king.svg`
- `white-queen.svg`
- `white-rook.svg`
- `white-bishop.svg`
- `white-knight.svg`
- `white-pawn.svg`

### Black Pieces
- `black-king.svg`
- `black-queen.svg`
- `black-rook.svg`
- `black-bishop.svg`
- `black-knight.svg`
- `black-pawn.svg`

## Exporting from Figma

1. Open the Figma file: https://www.figma.com/community/file/971870797656870866
2. Click "Duplicate" to add it to your drafts
3. Select each piece you want to use
4. In the right panel, go to "Export" section
5. Choose format:
   - **SVG** (recommended) - Scalable, smaller file size
   - **PNG** - Use 2x or 3x resolution (e.g., 128x128 or 192x192)
6. Export each piece with the naming convention above
7. Place all exported files in this `public/pieces/` directory

## Alternative Sources

If you prefer other chess piece designs:
- **Lichess pieces**: https://github.com/lichess-org/lila/tree/master/public/piece
- **Chess.com pieces**: Search for "chess piece SVG" or "chess piece PNG"
- **Custom designs**: Create your own in Figma, Illustrator, or other design tools

## Fallback Behavior

If image files are not found, the app will automatically fall back to Unicode chess symbols (♔♕♖♗♘♙).
