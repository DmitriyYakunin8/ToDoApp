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
    let project__list = document.querySelector('.project__list')
    let addNewProject = document.getElementById('add__new__project')

    let projectsArray = [1];

    addNewProject.addEventListener('click', () => {
      let last = projectsArray.at(-1);
      projectsArray.push(last + 1)
      projectsArray.shift()
      console.log(projectsArray[0]);
                
      project__list.innerHTML += `
                        <div class="project" id="project__${projectsArray[0]}">
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
    removeProject()  
    projectsOptions()
    })
    
    //Удаление проекта

    function removeProject() {
      let removeBtns = document.querySelectorAll('.remove__btn')
    
      for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', () => {
          removeBtns[i].parentNode.parentNode.remove()
          projectsArray[0] = projectsArray[0] - 1
        })
      }
    }
  
    removeProject();  

    // Опции проекта
    
    function projectsOptions() {
      let optionsBtns = document.querySelectorAll('.project__options__btn')

      for(let i = 0; i < optionsBtns.length; i++) {
        optionsBtns[i].addEventListener('click', () => hideVisibleElements(optionsBtns[i].parentElement.nextElementSibling))
      }
    };

    projectsOptions();

    const projects = document.querySelectorAll('.project');

    projects.forEach((project) => {
        project.addEventListener('mouseenter', function() {
            const projectId = this.id;
            console.log(this.id);
            
            const projectOptions = document.querySelector(`#${projectId} .project__options`);
            
            if (!projectOptions.classList.contains('visibility__hidden')) return;
            
            projectOptions.classList.remove('visibility__hidden');
            projectOptions.style.top = `${this.offsetHeight}px`;
        });

        project.addEventListener('mouseleave', function() {
            const projectId = this.id;
            const projectOptions = document.querySelector(`#${projectId} .project__options`);
            
            if (projectOptions.classList.contains('visibility__hidden')) return;
            
            projectOptions.classList.add('visibility__hidden');
            projectOptions.style.top = '100%';
        });
    });
});

