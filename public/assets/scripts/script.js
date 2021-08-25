let sidenav = document.querySelector('.sidenav').style
let body = document.querySelector('body').style

function openNav()
{
  sidenav.width = "15vw";
  sidenav.transition= "0.5s";

  body.width = "85vw";
  body.transition = "0.5s";
}

function closeNav()
{
  sidenav.width = "0";
  sidenav.transition= "0.5s";

  body.width = "100vw";
  body.transition = "0.5s";
}


