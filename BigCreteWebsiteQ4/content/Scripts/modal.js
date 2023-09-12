window.onload = function() {
// Get the modal
    var modal1 = document.getElementById("modal1");
    var modal2 = document.getElementById("modal2");
    var modal3 = document.getElementById("modal3");

// Get the button that opens the modal
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

// Get the <span> element that closes the modal
    var span1 = document.getElementsByClassName("close")[0];
    var span2 = document.getElementsByClassName("close")[1];
    var span3 = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
    btn1.onclick = function () {modal1.style.display = "block";}
    btn2.onclick = function () {modal2.style.display = "block";}
    btn3.onclick = function () {modal3.style.display = "block";}


// When the user clicks on <span> (x), close the modal
    span1.onclick = function () {modal1.style.display = "none";}
    span2.onclick = function () {modal2.style.display = "none";}
    span3.onclick = function () {modal3.style.display = "none";}

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal1 || event.target == modal2 || event.target == modal3) {
            modal1.style.display = "none";
            modal2.style.display = "none";
            modal3.style.display = "none";
        }
    }
}