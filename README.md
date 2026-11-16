# Shruti Samal - portfolio

Static site: plain HTML, CSS and JavaScript. No build step.

## Files
- `index.html` – page content (edit text, projects, links here)
- `style.css` – all styling and colours (ivory #EAE6DE, blue #226192, coral #EF8557)
- `script.js` – animations, nav, buttons
- `assets/shruti.jpg` – hero photo (keep the 4:3 ratio, or any image; it is cropped to fit)
- `assets/Shruti_Samal_CV.pdf` – the file the "View CV" buttons download (replace it, keep the name)

## Run locally in VS Code
1. File > Open Folder > this folder.
2. Install the "Live Server" extension, right-click `index.html` > Open with Live Server.
   (Or in a terminal: `npx serve .`)

## Deploy on Vercel
1. Push this folder to a new GitHub repository.
2. vercel.com > Add New > Project > import the repository.
3. Framework Preset: Other. Leave Build Command and Output Directory empty. Click Deploy.
4. Every later `git push` redeploys automatically.
