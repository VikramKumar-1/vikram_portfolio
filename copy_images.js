const fs = require('fs');
const path = require('path');

const src1 = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\1cd34a4a-e151-4fe9-90b6-7a46d902cd53\\global_webify_1783491200714.png";
const src2 = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\1cd34a4a-e151-4fe9-90b6-7a46d902cd53\\ecommerce_platform_1783491212105.png";
const src3 = "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\1cd34a4a-e151-4fe9-90b6-7a46d902cd53\\coordinator_dashboard_1783491224529.png";

const destDir = path.join(__dirname, 'public', 'projects');

// Create the directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src1, path.join(destDir, 'project1.png'));
fs.copyFileSync(src2, path.join(destDir, 'project2.png'));
fs.copyFileSync(src3, path.join(destDir, 'project3.png'));

console.log("Mockup images successfully copied to public/projects!");
