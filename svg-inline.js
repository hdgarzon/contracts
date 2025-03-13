const fs = require('fs');
const path = require('path');
const inline = require('html-inline');
const { optimize } = require('svgo');

// Ruta al archivo HTML generado por el build
const buildPath = path.resolve(__dirname, 'build');
const htmlPath = path.resolve(buildPath, 'index.html');
const outputPath = path.resolve(buildPath, 'all-in-one.html');

// Configuración para optimizar SVGs
const svgoConfig = {
  plugins: [
    { name: 'removeViewBox', active: false },
    { name: 'cleanupAttrs', active: true },
    { name: 'removeDoctype', active: true },
    { name: 'removeComments', active: true },
    { name: 'cleanupNumericValues', active: true },
    { name: 'convertColors', active: true },
    { name: 'removeUselessStrokeAndFill', active: true }
  ]
};

// Función para encontrar todos los archivos SVG en la carpeta build
function findSvgFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findSvgFiles(filePath, fileList);
    } else if (file.endsWith('.svg')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Procesar SVGs - convertirlos a data URLs
async function processSvgs() {
  const svgFiles = findSvgFiles(buildPath);
  const svgMap = {};
  
  for (const svgFile of svgFiles) {
    try {
      // Leer el contenido SVG
      const svgContent = fs.readFileSync(svgFile, 'utf8');
      
      // Optimizar el SVG usando la API actual de SVGO
      const optimizedSvg = optimize(svgContent, {
        path: svgFile,
        ...svgoConfig
      });
      
      // Convertir a data URL
      const dataUrl = `data:image/svg+xml,${encodeURIComponent(optimizedSvg.data)}`;
      
      // Añadir al mapa usando la ruta relativa como clave
      const relativePath = path.relative(buildPath, svgFile).replace(/\\/g, '/');
      svgMap[`/${relativePath}`] = dataUrl;
      svgMap[relativePath] = dataUrl;
    } catch (error) {
      console.error(`Error procesando SVG ${svgFile}:`, error);
    }
  }
  
  return svgMap;
}

// Procesar el HTML final para reemplazar referencias a SVG
async function processHtml(tempHtmlPath) {
  const svgMap = await processSvgs();
  let htmlContent = fs.readFileSync(tempHtmlPath, 'utf8');
  
  // Reemplazar URLs de SVG en el HTML
  for (const [svgPath, dataUrl] of Object.entries(svgMap)) {
    const escapedPath = svgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(["'])([^"']*${escapedPath})["']`, 'g');
    htmlContent = htmlContent.replace(regex, `$1${dataUrl}$1`);
  }
  
  // Reemplazar URLs de SVG en estilos CSS inline
  htmlContent = htmlContent.replace(/url\(['"]?([^'"()]+\.svg)['"]?\)/g, (match, url) => {
    // Si es una URL completa o data URL, mantenerla igual
    if (url.startsWith('data:') || url.startsWith('http')) {
      return match;
    }
    
    // Normalizar la URL
    const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
    
    // Si tenemos esta URL en nuestro mapa de SVG
    if (svgMap[normalizedUrl] || svgMap[url]) {
      return `url("${svgMap[normalizedUrl] || svgMap[url]}")`;
    }
    
    return match;
  });
  
  fs.writeFileSync(outputPath, htmlContent);
  console.log('✅ Se ha creado all-in-one.html con SVGs convertidos a data URLs');
}

// Primero usar html-inline para combinar los recursos
const options = {
  basedir: buildPath,
  inlineScripts: true,
  inlineStyles: true,
  inlineImages: true
};

const tempPath = path.resolve(buildPath, 'temp-inlined.html');

// Ejecutar el proceso
fs.createReadStream(htmlPath)
  .pipe(inline(options))
  .pipe(fs.createWriteStream(tempPath))
  .on('finish', () => {
    console.log('✅ Archivos CSS y JS incrustados correctamente');
    // Una vez combinados CSS y JS, procesar los SVGs
    processHtml(tempPath).then(() => {
      // Eliminar el archivo temporal
      fs.unlinkSync(tempPath);
    });
  });