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
    }, 5000);
}

export { showSnackBar }