if (!global._babelPolyfill) {
	require('babel-polyfill');
}

import './../css/main.css';

import { Workbox } from 'workbox-window';

import '@polymer/paper-card/paper-card';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-toolbar/paper-toolbar';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';

import { showSnackBar } from "./snackBar";
import { sharePage } from "./webShare";
import { 
    isIos,
    isInStandaloneMode,
    getCookie,
    setCookie,
    removeElements,
    findUrlInCache
} from "./util";

const SERVICE_WORKER_SCOPE = '/';
const pageCardLinks = document.querySelectorAll('.page-card-link');
const installPwaCard = document.querySelector('.install-pwa-card');
const installPwaButtons = document.querySelectorAll('.install-pwa-button');
const installPwaDismissButton = document.querySelector('.install-pwa-dismiss-button');
const pageShareButton = document.querySelector('.page-share-button');
const iosInstallBanner = document.querySelector('#ios-install-banner');
const iosInstallBannerDismissButton = document.querySelector('#ios-install-banner-dismiss-button');
const tabbedNavigation = document.querySelector('paper-tabs');

window.addEventListener('load', async () => {
    applyMediaQueriesOnDeviceWidth();
    registerServiceWorker();
    attachEventListeners();
    if (!navigator.onLine) {
        handleOfflineEvent();    
    }
});

// * shows an offline prompt and marks the offline available content
const handleOfflineEvent = () => {
    showSnackBar('You are offline 📴');
    markOfflineAvailableContent();
};
// * shows an online prompt and unmarks offline avaialble content
const handleOnlineEvent = () => {
    showSnackBar('You are back online! 🎉');
    unmarkOfflineAvailableContent();
};

const unmarkOfflineAvailableContent = () => {
    const icons = document.querySelectorAll('.available-offline-icon');
    icons.forEach(icon => icon.hidden = true);
    const pageLinks = document.querySelectorAll('.unavailable-offline');
    pageLinks.forEach(pageLink => pageLink.classList.remove('unavailable-offline'));
}

const markOfflineAvailableContent = () => {
    const pagesArr = Array.from(pageCardLinks);
    pagesArr.map(async page => {
        const url = page.getAttribute('href');
        console.log("showOfflineAvailablePages -> url", url);
        const cachedItems = await findUrlInCache(url);
        console.log("showOfflineAvailablePages -> cachedItems", cachedItems);
        if (cachedItems.length) {
            // * show available offline icon
            page.querySelector('.available-offline-icon').hidden = false;
        } else {
            // * else grey out page link and make it non-clickable
            page.classList.add('unavailable-offline');
        }
    });
};

var workBox;
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        workBox = new Workbox('./service-worker.js', { scope: SERVICE_WORKER_SCOPE });

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
    }
}

const installPwa = async () => {
    // hide install prompt
    dismissInstallPwaButtons();
    deferredPromptEvent.prompt();

    deferredPromptEvent.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome) // 'dismissed' or 'accepted'
        deferredPromptEvent = null;
    });
}

const dismissInstallPwaButtons = () => {
    if (isIos) {
        removeElements(iosInstallBanner);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // * expire in 7 days
        setCookie('IOS_INSTALL_BANNER_DISMISSED', `true;expires=${expiryDate.toGMTString()}`);

    } else {
        removeElements(installPwaCard);

    }
}

const applyMediaQueriesOnDeviceWidth = () => {
    if (window.innerWidth > 767) {
        import('./../css/tablets-and-above.css');
        tabbedNavigation.alignBottom = false;
    }
    if (window.innerWidth > 959) {
        import('./../css/desktops.css');
    }
}

const navigationTabSelected = event => {
    const navigateTo = event.detail.item.getAttribute('data-navigate-to');
    window.history.pushState({}, document.title, navigateTo);
}

const attachEventListeners = () => {
    // ? clicks
    installPwaButtons.forEach(button => button.addEventListener('click', installPwa))
    installPwaDismissButton.addEventListener('click', dismissInstallPwaButtons);
    iosInstallBannerDismissButton.addEventListener('click', dismissInstallPwaButtons)
    pageShareButton.addEventListener('click', sharePage);

    // ? Window
    window.addEventListener('resize', applyMediaQueriesOnDeviceWidth);
    window.addEventListener('offline', handleOfflineEvent);
    window.addEventListener('online', handleOnlineEvent);
    window.onpopstate =  event => {
        // TODO has navigated back
    };

    // ? Navigation
    tabbedNavigation.addEventListener('iron-select', navigationTabSelected);
}

let deferredPromptEvent;
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault(); 
    deferredPromptEvent = e;

    // * Check if should display install popups
    if (!isInStandaloneMode) {
        // * app is not launched as a PWA
        // * show install prompt
        if (!isIos) {
            installPwaCard.hidden = false;
        } else {
            if (getCookie('IOS_INSTALL_BANNER_DISMISSED') !== 'true') {
                iosInstallBanner.hidden = false;
            }
        }
    }
});
