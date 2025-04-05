document.getElementById('generateColorButton').addEventListener('click', generateRandomColor);
document.getElementById('saveColorButton').addEventListener('click', saveColor);

// Tableau pour stocker les couleurs sauvegardées
let savedColors = JSON.parse(localStorage.getItem('savedColors')) || [];

function generateRandomColor() {
  // Générer une couleur aléatoire
  const randomColor = getRandomColor();

  // Convertir la couleur en RGB
  const rgb = hexToRgb(randomColor);

  // Afficher la couleur
  document.getElementById('colorImage').style.backgroundColor = randomColor;

  // Afficher les informations de la couleur
  document.getElementById('hexCode').textContent = `Code Hex: ${randomColor}`;
  document.getElementById('rgbCode').textContent = `Code RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Tenter de trouver le nom de la couleur
  const colorName = getColorName(randomColor);
  document.getElementById('colorName').textContent = `Nom de la couleur: ${colorName || "Inconnu"}`;

  // Afficher les détails
  document.getElementById('colorDisplay').style.display = 'block';
}

// Fonction pour générer une couleur hexadécimale aléatoire
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Fonction pour convertir le code hex en RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Fonction pour tenter de trouver un nom de couleur
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
    // Ajoutez plus de couleurs ici...
  };
  return colorNames[hex.toUpperCase()] || null;
}

// Sauvegarder la couleur dans le tableau
function saveColor() {
  const color = document.getElementById('colorImage').style.backgroundColor;
  
  if (savedColors.length < 6) {
    savedColors.push(color);
  } else {
    savedColors.shift(); // Supprimer la couleur la plus ancienne
    savedColors.push(color);
  }

  // Sauvegarder dans localStorage
  localStorage.setItem('savedColors', JSON.stringify(savedColors));

  // Mettre à jour l'affichage des couleurs sauvegardées
  displaySavedColors();
}

// Afficher les couleurs sauvegardées
function displaySavedColors() {
  const savedColorsList = document.getElementById('savedColorsList');
  savedColorsList.innerHTML = ''; // Vider la liste avant de l'afficher

  savedColors.forEach((color, index) => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('saved-color-item');
    colorDiv.style.backgroundColor = color;
    
    // Ajouter une fonction pour supprimer la couleur
    colorDiv.addEventListener('click', () => removeColor(index));
    
    savedColorsList.appendChild(colorDiv);
  });
}

// Supprimer une couleur des sauvegardées
function removeColor(index) {
  savedColors.splice(index, 1);
  localStorage.setItem('savedColors', JSON.stringify(savedColors));
  displaySavedColors(); // Mettre à jour l'affichage
}

// Afficher les couleurs sauvegardées au chargement de la page
displaySavedColors();
