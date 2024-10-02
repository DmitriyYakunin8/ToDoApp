document.addEventListener('DOMContentLoaded', function() {
    
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMenu = document.querySelector('.aside__menu');

    // Функция для скрытия и появления элемента 
    //(ДОБАВИТЬ ОТРИСОВКУ HTML С ПОМОЩЬЮ 2 АРГУМЕНТА)

    const hideVisibleElements = (elem) => {
      elem.classList.contains('visibility__hidden') ? elem.classList.remove('visibility__hidden') : elem.classList.add('visibility__hidden');
    };

    //projectsBtn.addEventListener('click', () => hideVisibleElements(asideMenu));
      
    // Добавление нового проекта
    let addNewProject = document.getElementById('add__new__project')

    addNewProject.addEventListener('click', () => {
      let project__list = document.querySelector('.project__list')
      project__list.innerHTML += ' <div class="project project__new"><img src="#" alt="i" class="project__1__logo">New project<button class="project__menu__btn">1</button></div>'
    })
    


});

