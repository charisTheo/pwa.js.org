import { showSnackBar } from "./snackBar";

export const sharePage = async () => {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: '👉 PWA Wiki: Everything about PWAs is here! 👈',
            url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Web Share API not found!
        // copy link to clipboard
        copyToClipboard(window.location.href);
    }
}

export const copyToClipboard = function(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showSnackBar('Link copied to clipboard!')
};
