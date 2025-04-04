document.getElementById('generateColorButton').addEventListener('click', generateRandomColor);

function generateRandomColor() {
  const randomColor = getRandomColor();

  const rgb = hexToRgb(randomColor);

  document.getElementById('colorImage').style.backgroundColor = randomColor;

  document.getElementById('hexCode').textContent = `Code Hex: ${randomColor}`;
  document.getElementById('rgbCode').textContent = `Code RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const colorName = getColorName(randomColor);
  document.getElementById('colorName').textContent = `Nom de la couleur: ${colorName || "Inconnu"}`;

  document.getElementById('colorDisplay').style.display = 'block';
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function getColorName(hex) {
  const colorNames = {
    '#FF0000': 'Rouge',
    '#00FF00': 'Vert',
    '#0000FF': 'Bleu',
    '#FFFF00': 'Jaune',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#000000': 'Noir',
    '#FFFFFF': 'Blanc',
    '#808080': 'Gris',
    // d'autres couleurs vont être ajoutées plus tard
  };

  return colorNames[hex.toUpperCase()] || null;
}
