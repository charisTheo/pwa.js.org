const snackBar = document.getElementById('snackbar');

var hideSnackBarTimeout;
const showSnackBar = message => {
    if (hideSnackBarTimeout) {
        clearTimeout(hideSnackBarTimeout);
    } 
    if (snackBar.innerHTML !== '') {
        snackBar.innerHTML += '\n' + message;
    } else {
        snackBar.innerHTML = message;
    }

    snackBar.classList.add('show');
    snackBar.classList.add('sans');
    hideSnackBarTimeout = setTimeout(() => {
        snackBar.classList.remove('show');
        snackBar.innerHTML = '';
    }, 3000);
}

const copyToClipboard = function(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showSnackBar('Link copied to clipboard!');
}

export { showSnackBar, copyToClipboard }