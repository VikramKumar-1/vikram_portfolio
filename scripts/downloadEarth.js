const fs = require('fs');
const https = require('https');
const path = require('path');

const dest = path.join(__dirname, '..', 'public', 'earth.jpg');

// Ensure the public directory exists before writing
if (!fs.existsSync(path.dirname(dest))) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
}

const file = fs.createWriteStream(dest);

console.log("Downloading Earth texture...");

https.get("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg", function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download complete! Texture saved to public/earth.jpg");
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error("Error downloading texture:", err.message);
});
