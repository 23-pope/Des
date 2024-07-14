document.addEventListener('DOMContentLoaded', () => {
  const puzzleContainer = document.getElementById('puzzle');
  const puzzleSize = 3;
  const pieces = [];
  const imageSrc = "https://static.bandainamcoent.eu/high/naruto/naruto-storm-connections/00-page-setup/NSC-header-mobile.jpg"; // Update with your image path
  const imageSize = 300; // The size of the image in pixels (assumed to be a square)

  // Generate pieces
  for (let i = 0; i < puzzleSize * puzzleSize; i++) {
      pieces.push(i);
  }

  // Shuffle pieces
  pieces.sort(() => Math.random() - 0.5);

  // Create puzzle pieces
  pieces.forEach((piece, index) => {
      const pieceElement = document.createElement('div');
      pieceElement.classList.add('puzzle-piece', 'w-24', 'h-24', 'flex', 'items-center', 'justify-center', 'bg-blue-500', 'text-white', 'text-xl', 'font-bold');
      pieceElement.dataset.index = index;

      // Calculate background position
      const row = Math.floor(piece / puzzleSize);
      const col = piece % puzzleSize;
      pieceElement.style.backgroundImage = `url(${imageSrc})`;
      pieceElement.style.backgroundSize = `${imageSize}px ${imageSize}px`;
      pieceElement.style.backgroundPosition = `-${col * (imageSize / puzzleSize)}px -${row * (imageSize / puzzleSize)}px`;

      // Add click event to swap pieces
      pieceElement.addEventListener('click', () => {
          const emptyPiece = document.querySelector('.empty-piece');
          if (emptyPiece) {
              swapPieces(pieceElement, emptyPiece);
              checkWinCondition();
          }
      });

      puzzleContainer.appendChild(pieceElement);
  });

  // Make the last piece the empty one
  const lastPiece = document.querySelector(`[data-index="${pieces.length - 1}"]`);
  lastPiece.classList.add('empty-piece', 'bg-transparent', 'border-none');
  lastPiece.style.backgroundImage = 'none';

  function swapPieces(piece1, piece2) {
      const tempBg = piece1.style.backgroundImage;
      const tempPos = piece1.style.backgroundPosition;

      piece1.style.backgroundImage = piece2.style.backgroundImage;
      piece1.style.backgroundPosition = piece2.style.backgroundPosition;

      piece2.style.backgroundImage = tempBg;
      piece2.style.backgroundPosition = tempPos;

      piece1.classList.toggle('empty-piece');
      piece2.classList.toggle('empty-piece');
  }

  function checkWinCondition() {
      const currentOrder = Array.from(puzzleContainer.children).map(piece => piece.dataset.index);
      if (currentOrder.every((num, index) => num == index)) {
          alert('Congratulations! You solved the puzzle!');
      }
  }
});

 