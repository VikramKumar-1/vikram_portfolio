const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'projects');

// Ensure the directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(destDir, filename));
    
    // We use a user-agent to prevent the screenshot API from blocking the request
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    };

    https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(path.join(destDir, filename), () => {});
      reject(err);
    });
  });
};

console.log("Downloading screenshots from your live sites...");

// Using a free screenshot API to capture your live websites
const site1 = "https://image.thum.io/get/width/1200/crop/800/noanimate/https://www.globalwebify.com/";
const site2 = "https://image.thum.io/get/width/1200/crop/800/noanimate/https://stopshop-v2.vercel.app/";

Promise.all([
  downloadImage(site1, 'project1.png'),
  downloadImage(site2, 'project2.png')
])
.then(() => {
  console.log("✅ Success! The screenshots have been saved as project1.png and project2.png in your public/projects folder!");
})
.catch(err => {
  console.error("❌ Error downloading screenshots:", err.message);
});
