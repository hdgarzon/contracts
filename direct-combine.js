const fs = require('fs');
const path = require('path');

// Ruta al build
const buildPath = path.resolve(__dirname, 'build');
const outputPath = path.resolve(buildPath, 'all-in-one.html');

// Función para convertir archivo a base64
const fileToBase64 = (filePath) => {
  return fs.readFileSync(filePath).toString('base64');
};

// Crear un nuevo archivo HTML desde cero
let html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tu Aplicación</title>
  <style>
`;

// Añadir todos los CSS
const cssFolder = path.join(buildPath, 'static/css');
if (fs.existsSync(cssFolder)) {
  fs.readdirSync(cssFolder).forEach(file => {
    if (file.endsWith('.css')) {
      html += fs.readFileSync(path.join(cssFolder, file), 'utf8') + '\n';
    }
  });
}

html += `
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
`;

// Añadir todos los JS en orden correcto
const jsFolder = path.join(buildPath, 'static/js');
if (fs.existsSync(jsFolder)) {
  // Obtener todos los archivos JS
  const jsFiles = fs.readdirSync(jsFolder)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => {
      // Asegurar que runtime viene primero, luego chunks, y main al final
      if (a.includes('runtime')) return -1;
      if (b.includes('runtime')) return 1;
      if (a.includes('chunk')) return -1;
      if (b.includes('chunk')) return 1;
      if (a.includes('main')) return 1;
      if (b.includes('main')) return -1;
      return 0;
    });
  
  // Leer y añadir cada archivo en orden
  jsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(jsFolder, file), 'utf8');
    
    // Procesar SVGs en el código JS
    let processedContent = content.replace(/"[^"]*\.svg"/g, (match) => {
      const svgPath = match.slice(1, -1);
      if (svgPath.startsWith('/static/media/')) {
        const relativePath = svgPath.replace(/^\//, '');
        const fullPath = path.join(buildPath, relativePath);
        
        if (fs.existsSync(fullPath)) {
          try {
            return `"data:image/svg+xml;base64,${fileToBase64(fullPath)}"`;
          } catch (e) {
            return match;
          }
        }
      }
      return match;
    });
    
    html += processedContent + '\n';
  });
}

html += `
  </script>
</body>
</html>
`;

// Escribir el archivo final
fs.writeFileSync(outputPath, html);
console.log('✅ Se ha creado all-in-one.html con todo el contenido incrustado');