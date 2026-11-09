# Student Portfolio & Academic Management Website
COS 106 – Introduction to Web Technologies (Term Project)

## Folder layout
```
index.html      Homepage
about.html      About Me page
projects.html   Projects page
planner.html    Academic Planner page
contact.html    Contact page
css/style.css   The one external stylesheet
js/main.js      Mobile menu, greeting, footer year (every page)
js/planner.js   Add / complete / delete tasks
js/contact.js   Contact form validation
images/         Your photo and project screenshots
media/          (create this) your intro video: intro.mp4
```

## How to find things in the code
Press **Ctrl + F** in your editor and search for:
- `PDF REQUIREMENT` : every place a requirement from the lab PDF is met
- `EDIT ME` : every place you should put your own details (name, bio, photo, links)

## Requirement checklist
| PDF requirement | Where it is done |
|---|---|
| Name and photograph | index.html, hero section |
| Welcome message | index.html, hero section, plus the greeting in main.js |
| Navigation menu | top of every page (`<nav>`) |
| Brief biography | index.html, "A short bio" |
| Professional layout | index.html, plus the grid layout in style.css section 6 |
| Educational background | about.html, the table |
| Career aspirations, skills, hobbies | about.html |
| 3 projects, descriptions, images, links | projects.html |
| Add, complete and delete tasks | planner.html + js/planner.js |
| Contact form (name, email, phone, message) | contact.html |
| No empty field, valid email, digits-only phone | js/contact.js |
| Semantic HTML | header, nav, main, section, article, aside, footer |
| Forms | contact.html, planner.html |
| Tables | about.html |
| Images | index.html, projects.html |
| Hyperlinks | nav, buttons, project links |
| Lists | nav, skills, hobbies, task list |
| Multimedia | about.html `<video>` |
| External CSS | css/style.css |
| Responsive / mobile-friendly | style.css section 13 (`@media`) |
| Flexbox and Grid | style.css (search "FLEXBOX" / "CSS GRID") |
| Navigation styling | style.css section 3 |
| Animations / transitions | style.css section 12 + hover effects |
| Consistent colour scheme | style.css section 1 (`:root` colours) |
| Event handling, DOM manipulation, validation, dynamic updates, arrays and functions | js files (search "PDF REQUIREMENT") |

## Hosting on GitHub Pages
1. Create a new repository on GitHub and upload all these files.
2. Go to **Settings → Pages**, choose branch `main` and folder `/ (root)`, then click Save.
3. After about a minute your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. Submit that link along with the repository link.
