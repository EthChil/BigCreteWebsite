let scrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY;

    document.getElementById('Schottky').style.marginTop = (scrollY - 124).toString() + "px";

    console.log(scrollY)

    if(scrollY > 109)
        window.location.href = "main.html";
})