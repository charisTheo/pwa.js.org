// TODO:
{/* <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<!-- ! Download Google fonts only if launched in the browser -> Else use system fonts -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet" media="all and (display-mode: browser)" />

<div id="ios-install-banner" hidden>
    Install this application on your iPhone by tapping 
    <img class="share-ios" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA1CAYAAAAtf5mbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTZCQTRBN0Q2OTdDMTFFNzhCMEZDMTIwMUI0RkQzNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTZCQTRBN0U2OTdDMTFFNzhCMEZDMTIwMUI0RkQzNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NkJBNEE3QjY5N0MxMUU3OEIwRkMxMjAxQjRGRDM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NkJBNEE3QzY5N0MxMUU3OEIwRkMxMjAxQjRGRDM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn8R4UYAAAELSURBVHja7NhLCsIwFAXQRLoQF6SORMGB4BYEQXDgwIEgFJfhxJE7ElfhN75AAg9N2gT7o94LF0VJOKZJKQqllPA1Mil1LopKQbC9nsp00RQYR9ku64ZZ1JWhXuZ1VReMo3oMNqM+zPt11bBPlGAwnSnDbaqCcVSfT8VgOhOG25YN86FcMJ0x9W4+35UF46iBayoHTGdIvZnv0lBXEvEbzgY1op4ixh2pT+qBeinrUnazpvKsWMjYr8is0yeljNoVdlgRN/6OaGgAi43M2bB5Y0P2mGrViiXstiF/PJWhKxt0urH5AQMMMMAAAwwwwBryoFjDAyEuJWCAAQYYYIABBlhL/4P9zxV7CzAARnAcTBPSXp8AAAAASUVORK5CYII="/>
    and then Add to Home Screen 
    <div class="add-ios-container">
        <img class="add-ios" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODUwRjVBMTA2OTdDMTFFNzhCMEZDMTIwMUI0RkQzNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODUwRjVBMTE2OTdDMTFFNzhCMEZDMTIwMUI0RkQzNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NkJBNEE3RjY5N0MxMUU3OEIwRkMxMjAxQjRGRDM2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NkJBNEE4MDY5N0MxMUU3OEIwRkMxMjAxQjRGRDM2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv9MYnYAAABJSURBVHja7NYxDgAgCANA6v//jKthc9PkukMusDTdXTNJ6iLngqvBmVUPBQYGBgYGBuYXTEYfcZk336R2wsDAwMDAwHyO2QIMANn2CUO4LuDBAAAAAElFTkSuQmCC"/>
    </div>
    <a class="focus-outline" id="ios-install-banner-dismiss-button">Got it</a>
</div> */}

const addDocumentLanguage = () => {
  document.querySelector("html").setAttribute("lang", "en");
};

const injectMetaTags = () => {
  document.head.innerHTML += `
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1">
      <meta name="theme-color" content="#212121">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta charset="UTF-8">
    `;
};

const injectStyles = () => {
  const css = `
      :root {
        --color-dark-100: #000000;
        --color-dark-90: #212121;
        --color-dark-80: #303030;
        --color-dark-70: #424242;
        --color-light-100: #ffffff;
        --color-light-90: #fafafa;
        --color-light-80: #f5f5f5;
        --color-light-70: #e0e0e0;
    
        --background-color: var(--color-light-70);
        --text-color: var(--color-dark-90);
        --heading-color: var(--color-dark-80);
      }
        body {
        background-color: var(--background-color);
        color: var(--text-color);
      }
      h1, h2, h3, h4, h5, h6 {
        color: var(--heading-color);    
      }
      nav > ul > li {
        list-style: none;
      }
      @media (prefers-color-scheme: dark) {
            :root {
            --background-color: var(--color-dark-90);
            --text-color: var(--color-light-90);
            --heading-color: var(--color-light-80);
        }
      }
  
      article {
        padding: 15px;
      }
      details {
        color: #ffffff;
      }
      figure.callout {
        background: rgba(255, 235, 59, 0.2);
      }
      pre.code {
        margin: 0 auto;
        overflow: auto;
      }
      ::-webkit-scrollbar {
       width: 5px;
       height: 5px;
       opacity: 0.35;
       -webkit-transition: all 0.35s;
       -moz-transition: all 0.35s;
       -ms-transition: all 0.35s;
       -o-transition: all 0.35s;
       transition: all 0.35s;
      }
      *::-webkit-scrollbar-track {
         background-color: #151515; 
      }
      *::-webkit-scrollbar-thumb {
         background: #aa00ff;
      }
      /* HighlightJS Dracula styles */
      .hljs{display:block;overflow-x:auto;padding:.5em;background:#282a36}.hljs-keyword,.hljs-link,.hljs-literal,.hljs-section,.hljs-selector-tag{color:#8be9fd}.hljs-function .hljs-keyword{color:#ff79c6}.hljs,.hljs-subst{color:#f8f8f2}.hljs-addition,.hljs-attribute,.hljs-bullet,.hljs-name,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#f1fa8c}.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote{color:#6272a4}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type{font-weight:700}.hljs-emphasis{font-style:italic}
    `;

  const style = document.createElement("style");

  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.append(style);
};

const injectManifest = () => {
  const linksData = [
    { rel: "shortcut icon", href: "./favicon/favicon.ico" },
    { rel: "apple-touch-icon", href: "./favicon/apple-touch-icon.png" },
    { rel: "manifest", href: "./manifest.json" }
  ];
  linksData.map(data => {
    const link = document.createElement("link");
    link.rel = data.rel;
    link.href = data.href;
    document.head.append(link);
  });
};

const injectScripts = () => {
  // dracula highlighting styles are inlined above
  const hljsScript = document.createElement("script");
  hljsScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js";
  document.head.append(hljsScript);

  const urls = [
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/htmlbars.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/javascript.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/languages/css.min.js"
  ];
  const scripts = [];
  urls.map(url => {
    const script = document.createElement("script");
    script.src = url;
    script.defer = true;
    document.body.append(script);
  });

  const serviceWorkerScript = document.createElement("script");
  serviceWorkerScript.type = "module";
  serviceWorkerScript.text = `import { showSnackBar } from './js/snackBar.js';
              // import {  } from './js/util.js';
              import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs';
              var workBox;
  
        hljs.initHighlightingOnLoad();
  
              if ('serviceWorker' in navigator) {
                  workBox = new Workbox('./service-worker.js', { scope: '/' });
                  workBox.addEventListener('controlling', () => {
                      window.location.reload();
                  });
                  workBox.addEventListener('waiting' , () => {
                      var updateServiceWorker = event => {
                          workBox.messageSW({ type: 'NEW_VERSION'});
                      };
                      window.updateServiceWorker = updateServiceWorker;
          
                      setTimeout(() => 
                          showSnackBar('A new version is available <span style="font-size:17px;margin-left:5px">👉</span><a href="#" onclick="updateServiceWorker();" class="snackbar-refresh-button">&#x21BB;</a>')
                          , 0
                      );
                  });
                  workBox.register();
              }`;
  document.body.append(serviceWorkerScript);
};

const injectHTML = () => {
  const snackBar = document.createElement("div");
  snackBar.id = "snackbar";
  document.body.append(snackBar);
};

const renameHeadingLinks = () => {
  const links = document.querySelectorAll(".table_of_contents-link");
  links.forEach(link => {
    // make each link non-focusable
    // link.setAttribute("tabIndex", "-1");
    const heading = document.getElementById(link.hash.split("#")[1]);
    const newId = heading.textContent
      .split(" ")
      .join("-")
      .trim();
    heading.id = newId;
    link.href = "#" + newId;
  });
};

const makeNavigationAccessible = () => {
  const nav = document.querySelector("nav");
  const navList = document.createElement("ul");
  const navItems = Array.from(
    document.querySelectorAll(".table_of_contents-item")
  );

  nav.classList.remove("block-color-gray");

  navItems.map(navItem => {
    navItem.remove();
    const listItem = document.createElement("li");
    listItem.appendChild(navItem);
    navList.appendChild(listItem);
  });

  nav.appendChild(navList);
};

const logAnyManualChangesLeft = () => {
  console.warn(
    "\nTODO #1: Insert document declaration into all html files",
    "<!DOCTYPE html>"
  );

  findAndLogImagesWithoutAlt();

  findAndLogLocalPagesLinks();
};

const findAndLogImagesWithoutAlt = () => {
  const images = document.querySelectorAll("img");
  const imagesToLog = [];

  images.forEach(image => {
    if (image.getAttribute("alt") === null) {
      if (image.src.match(/pwa\.logo\.png/)) {
        image.alt = "The unofficial PWA logo";
      } else {
        imagesToLog.push(image);
      }
    }
  });

  if (!!imagesToLog.length) {
    console.warn("\nTODO #2: Found images without an 'alt' attribute!");
    console.table({ Images: imagesToLog });
  }
};

const findAndLogLocalPagesLinks = () => {
  // link.href.match(/^((?!#|http:\/\/|https:\/\/).)*$/)
  const links = document.querySelectorAll(".link-to-page a");
  if (!!links.length) {
    console.warn(
      "\nTODO #3: Found links to pages. Run snippet in these as well!"
    );
    console.table({ Links: links });
  }
};

addDocumentLanguage();

injectMetaTags();

injectStyles();

injectManifest();

injectScripts();

injectHTML();

renameHeadingLinks();

makeNavigationAccessible();

logAnyManualChangesLeft();
