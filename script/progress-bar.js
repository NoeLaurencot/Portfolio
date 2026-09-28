let progressBar = document.getElementById('progress-bar');
const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

let firstProgress = window.scrollY / maxScrollY;

progressBar.style.width = `${firstProgress * 100}%`;

if (firstProgress < 1) {
    progressBar.style.borderRadius = '0 10px 10px 0';
} else {
    progressBar.style.borderRadius = '0';
}

window.addEventListener('scroll', function () {
    let progress = window.scrollY / maxScrollY;

    progressBar.style.width = `${progress * 100}%`;

    if (progress < 1) {
        progressBar.style.borderRadius = '0 10px 10px 0';
    } else {
        progressBar.style.borderRadius = '0';
    }
});