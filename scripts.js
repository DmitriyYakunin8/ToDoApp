document.addEventListener('DOMContentLoaded', function() {
    
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMenu = document.querySelector('#aside__menu');

    // Функция для скрытия и появления элемента 
    //(ДОБАВИТЬ ОТРИСОВКУ HTML С ПОМОЩЬЮ 2 АРГУМЕНТА)

    const hideVisibleElements = (elem) => {
      if (elem.classList.contains('visibility__hidden')) {
        // asideMenu.innerHTML = "<div class='projects'><h2>Projects</h2><div class='project__list'><div class='project project__1'><img src='#' alt='i' class='project__1__logo'>Default project<button class='project__menu__btn'>1</button></div></div></div>"
        elem.classList.remove('visibility__hidden')
      }
      else {
        elem.classList.add('visibility__hidden')
      }
    };
    
    projectsBtn.addEventListener('click', () => hideVisibleElements(asideMenu));
      





});

