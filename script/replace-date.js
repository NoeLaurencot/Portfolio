// age calc
let ageSpan = document.querySelectorAll(".age-calc");
let today = new Date;
let birthDate = new Date("2004-08-29");
let age = today.getFullYear() - birthDate.getFullYear();
let m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}

ageSpan.forEach(element => {
    element.innerHTML = age;
});