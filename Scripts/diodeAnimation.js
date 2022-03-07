let scrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY;

    if(scrollY < 110)
        document.getElementById('Schottky').style.marginTop = (scrollY - 124).toString() + "px";
    else
        document.getElementById('Schottky').style.marginTop = "-15px";

    if(scrollY > 109) {
        document.getElementById("entranceText").innerHTML = "<br> Hitting the Crete";

        setTimeout(() => {
            window.location.href = "main.html";
        }, 1250);
    }
})