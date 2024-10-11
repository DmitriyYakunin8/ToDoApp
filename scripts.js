document.addEventListener('DOMContentLoaded', function() {
    
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMenu = document.querySelector('.aside__menu');

    // Функция для скрытия и появления элемента 
    //(ДОБАВИТЬ ОТРИСОВКУ HTML С ПОМОЩЬЮ 2 АРГУМЕНТА)

    const hideVisibleElements = (elem) => {
      elem.classList.contains('visibility__hidden') ? elem.classList.remove('visibility__hidden') : elem.classList.add('visibility__hidden');
    };

    projectsBtn.addEventListener('click', () => hideVisibleElements(asideMenu));

    // НАСТРОЙКА ASIDE MENU
      
    // Добавление проекта

    let projectIdsArray = [1];

    function addNewProjectFunc() {
      let project__list = document.querySelector('.project__list')
      let addNewProject = document.getElementById('add__new__project')

      addNewProject.addEventListener('click', () => {
        let last = projectIdsArray.at(-1);
        projectIdsArray.push(last + 1)
        projectIdsArray.shift()
        console.log(projectIdsArray[0]);
                  
        project__list.innerHTML += `
                          <div class="project" id="project__${projectIdsArray[0]}">
                              <div class="project__logo">
                                  <img src="/icons/defaultProjectLogo.png" alt="#" id="project__logo">
                              </div>
                              <div class="project__inList__name">
                                  Default project name
                              </div>
                              <div class="project__options__btn">
                                  <img id="project__options__btn__img" src="/icons/projectOptionsBtn.png" alt="icon">
                              </div>
                          </div>
                          <div class="visibility__hidden project__options">
                              <div class="project__option remove__btn">Remove</div>
                              <div class="project__option">Rename</div>
                              <div class="project__option">Change logo</div>
                          </div>`

      // Обязательные функции для возможности управления вновь добавленными проектами

      projectsOptions()
      optionsPositioning()
      removeProject()  
      })
    }

    addNewProjectFunc()
    
    // Опции проекта
    
    function projectsOptions() {
      let optionsBtns = document.querySelectorAll('.project__options__btn')

      for(let i = 0; i < optionsBtns.length; i++) {
        optionsBtns[i].addEventListener('click', () => hideVisibleElements(optionsBtns[i].parentElement.nextElementSibling))
      }
    };

    projectsOptions();

    // Позиционирование опций относительно проекта

    function optionsPositioning() {
      const projects = document.querySelectorAll('.project');

      projects.forEach((project) => {
          project.addEventListener('mouseenter', () => {
           let options = project.nextElementSibling
          
            // options.style.left = project.getBoundingClientRect().left + options.getBoundingClientRect().width + 'px'
            options.style.top = project.getBoundingClientRect().top + options.getBoundingClientRect().height / 3 + 'px'

            const valueInPx = parseFloat(window.getComputedStyle(options).getPropertyValue('left'));
            const fontSize = parseFloat(window.getComputedStyle(project, null).getPropertyValue("font-size"));
            const conversionFactor = valueInPx / fontSize;
            const valueInEm = conversionFactor * (fontSize || 16);
        
            options.style.left = valueInEm
            console.log(window.getComputedStyle(options).getPropertyValue('left'));
            

          })
      });
    }
    
    optionsPositioning()
   
    //Удаление проекта

    function removeProject() {
      let removeBtns = document.querySelectorAll('.remove__btn')
    
      for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', () => {
         
          removeBtns[i].parentNode.previousElementSibling.remove()
          removeBtns[i].parentNode.remove()
          projectIdsArray[0] = projectIdsArray[0] - 1
        })
      }
    }
  
    removeProject();  
















});

