# cs290_final_project

##General structure/explanation

**Basic server function files/database**

/package.json

  Contains node.js information, don't edit
  
/place-data.json

  Is the 'database'
  
/server.js

  Server code that is similar to assignment 4


**The .js and css files along with images**

/public/index.js

  javascript file that gets applied to all pages
  
/public/style.css

  css file that gets applied to all pages
  
/public/images

  Folder with images of places


/views/layout/main.handlebars

  Is the base of the html document
  
  Has the title, script, and css call
  
  'Calls' another file for the <body>
  
  
**These are the documents to edit to change the header/footer for all pages**

/views/partials/header.handlebars

  Is the header for all pages, gets 'called" by specific pages
  
/views/partials/footer.handlebars

  Is the footer for all pages, gets 'called" by specific pages
  

**These are the documents to edit to make the website pages**

/views/404-page.handlebars

  The <main> part of the html structure and calls footer/header
  
  404 page
  
/views/index-page.handlebars

  The <main> part of the html structure and calls footer/header
  
  the homepage of the html structure, I copy/pasted what we had previously into this file
  
/views/search-page.handlebars

  The <main> part of the html structure and calls footer/header
  
  Search page
  
/views/place-page.handlebars

  The <main> part of the html structure and calls footer/header
  
  Specific place page, dynamic content will get loaded once design is implemented
