function toggleMenu() {
    const menu = document.querySelector(".menu-links"); //on click, we target the menu-links div...
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open") //adds/removes the "open" class from the html file 
    icon.classList.toggle("open")
}

//thus we can put the "open" class in and out of teh page by calling this function