document.addEventListener('DOMContentLoaded', function() {
    
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMenu = document.querySelector('#aside__menu');

    // Скрытие и появление подменю
    projectsBtn.addEventListener('click', function() {
      if (asideMenu.classList.contains('visibility__hidden')) {
        asideMenu.innerHTML = "<div class='projects'><h2>Projects</h2><div class='project__list'><div class='project project__1'><img src='#' alt='i' class='project__1__logo'>Default project<button class='project__menu__btn'>1</button></div></div></div>"
        asideMenu.classList.remove('visibility__hidden')
        asideMenu.classList.add('visibility__visible')
        
      }
      else {
        asideMenu.classList.remove('visibility__visible')
        asideMenu.classList.add('visibility__hidden')
      }
    });
    
    
    
    
    

});