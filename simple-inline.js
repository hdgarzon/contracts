const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Función para leer el contenido de un archivo
const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return '';
  }
};

// Función para leer archivo binario y convertirlo a base64
const readFileAsBase64 = (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    return buffer.toString('base64');
  } catch (error) {
    console.error(`Error al leer el archivo binario ${filePath}:`, error);
    return '';
  }
};

// Ruta al build
const buildPath = path.resolve(__dirname, 'build');

// Crear un nuevo archivo HTML
let html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tu Aplicación</title>
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
  <style>
`;

// Buscar y agregar todos los archivos CSS
const cssFolder = path.join(buildPath, 'static/css');
if (fs.existsSync(cssFolder)) {
  fs.readdirSync(cssFolder).forEach(file => {
    if (file.endsWith('.css')) {
      let cssContent = readFile(path.join(cssFolder, file));
      
      // Procesar referencias a SVG en el CSS
      cssContent = cssContent.replace(/url\(['"]?([^'"()]+)['"]?\)/g, (match, url) => {
        // Si es una URL externa o data URL, mantenla igual
        if (url.startsWith('http') || url.startsWith('data:')) {
          return match;
        }
        
        // Si es una referencia a un SVG local
        if (url.endsWith('.svg')) {
          // Primero intenta buscar el SVG en relación al CSS (static/css)
          let svgPath = path.resolve(cssFolder, url);
          
          // Si no existe, intenta buscar en relación a la carpeta build
          if (!fs.existsSync(svgPath)) {
            svgPath = path.resolve(buildPath, url.startsWith('/') ? url.slice(1) : url);
          }
          
          // Si existe el SVG, conviértelo a data URL
          if (fs.existsSync(svgPath)) {
            const mimeType = mime.lookup(svgPath) || 'image/svg+xml';
            const svgBase64 = readFileAsBase64(svgPath);
            return `url(data:${mimeType};base64,${svgBase64})`;
          }
        }
        
        // Si no se pudo procesar, mantener la URL original
        return match;
      });
      
      html += cssContent + '\n';
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

// Buscar y agregar todos los archivos JS
const jsFolder = path.join(buildPath, 'static/js');
if (fs.existsSync(jsFolder)) {
  const jsFiles = fs.readdirSync(jsFolder)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => {
      // Asegurarse de que los archivos chunk y main estén en el orden correcto
      if (a.includes('runtime') || a.includes('chunk')) return -1;
      if (b.includes('runtime') || b.includes('chunk')) return 1;
      if (a.includes('main')) return 1;
      if (b.includes('main')) return -1;
      return 0;
    });
  
  jsFiles.forEach(file => {
    let jsContent = readFile(path.join(jsFolder, file));
    
    // Procesar referencias a archivos SVG en el JS
    jsContent = jsContent.replace(/"([^"]+\.svg)"/g, (match, url) => {
      // Si es una ruta absoluta, conviértela a relativa a la carpeta build
      const svgPath = path.resolve(buildPath, url.startsWith('/') ? url.slice(1) : url);
      
      if (fs.existsSync(svgPath)) {
        // Si es un SVG, intenta leerlo como texto para incluir el código SVG directamente
        try {
          const svgContent = readFile(svgPath);
          if (svgContent.includes('<svg')) {
            // Escapar las comillas y reemplazar la URL con el contenido SVG
            const escapedSvg = svgContent
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/\n/g, ' ');
            return `"data:image/svg+xml,${encodeURIComponent(svgContent)}"`;
          }
        } catch (e) {
          // Si falla al leer como texto, convertir a base64
          const mimeType = mime.lookup(svgPath) || 'image/svg+xml';
          const svgBase64 = readFileAsBase64(svgPath);
          return `"data:${mimeType};base64,${svgBase64}"`;
        }
      }
      
      // Si no se pudo procesar, mantener la URL original
      return match;
    });
    
    html += jsContent + '\n';
  });
}

html += `
  </script>
</body>
</html>
`;

// Escribir el nuevo archivo HTML
fs.writeFileSync(path.join(buildPath, 'all-in-one.html'), html);
console.log('✅ Se ha creado all-in-one.html con todo el contenido incrustado');