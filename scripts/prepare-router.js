const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appDir = path.join(root, "app");
const routerDir = path.join(appDir, "router");
const resourcesDir = path.join(routerDir, "resources");

fs.rmSync(resourcesDir, { recursive: true, force: true });
fs.mkdirSync(resourcesDir, { recursive: true });

function copyDirectory(source, destination) {
  if (fs.existsSync(source) && fs.statSync(source).isDirectory()) {
    fs.cpSync(source, destination, { recursive: true });
    return true;
  }
  return false;
}

function copyFile(source, destination) {
  if (fs.existsSync(source) && fs.statSync(source).isFile()) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
    return true;
  }
  return false;
}

copyFile(path.join(appDir, "fiori-apps.html"), path.join(resourcesDir, "fiori-apps.html"));
copyDirectory(path.join(appDir, "_i18n"), path.join(resourcesDir, "_i18n"));
copyDirectory(path.join(appDir, "appconfig"), path.join(resourcesDir, "appconfig"));

for (const entry of fs.readdirSync(appDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const webappDir = path.join(appDir, entry.name, "webapp");
  if (fs.existsSync(webappDir)) {
    copyDirectory(webappDir, path.join(resourcesDir, entry.name, "webapp"));
  }
}

function rewriteLinks(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      rewriteLinks(filePath);
      continue;
    }
    if (!/\.(html|json|js|xml)$/.test(entry.name)) continue;

    let content = fs.readFileSync(filePath, "utf8");
    content = content
      .replace(/("url"\s*:\s*")(?!\/)((?:browse|admin-authors|admin-books|genres)\/webapp[^"]*")/g, '$1/$2')
      .replace(/((?:source|src)=")(?!\/|https?:|#)((?:browse|admin-authors|admin-books|genres)\/[^"]+")/g, '$1/$2')
      .replace(/("url"\s*:\s*"\/)(\/)/g, '$1');

    fs.writeFileSync(filePath, content, "utf8");
  }
}

rewriteLinks(resourcesDir);

console.log(`Prepared ${path.relative(root, resourcesDir)} from ${path.relative(root, appDir)} static files.`);
