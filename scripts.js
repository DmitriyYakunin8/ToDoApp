document.addEventListener('DOMContentLoaded', function() {
    
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMenu = document.querySelector('.aside__menu');

    // Cкрытие и появление элемента 
    //(ДОБАВИТЬ ОТРИСОВКУ HTML С ПОМОЩЬЮ 2 АРГУМЕНТА)
    const hideVisibleElements = (elem) => {
      elem.classList.contains('visibility__hidden') ? elem.classList.remove('visibility__hidden') : elem.classList.add('visibility__hidden');
    };

    projectsBtn.addEventListener('click', () => hideVisibleElements(asideMenu));

    // Поиск всех первых классов внутри элемента при помощи рекурсии
    function findAllElemClasses(elem) {
      let arrOfClasses = []
      let classes = new Set();

      function recursion(element) {
        if (element.children.length == 0 && element.classList.length) {
         classes.add(element.classList[0]);
        }
        else {
          classes.add(element.classList[0]);
          for (let i = 0; i < element.children.length; i++) {
            recursion(element.children[i]);
          }
        }
      }
      recursion(elem);

      for (let value of classes) {
        arrOfClasses.push(value);
      }

      return arrOfClasses;
    }

    // НАСТРОЙКА ASIDE MENU
    // Добавление проекта
    let projectIdsArray = [1];

    function addNewProjectFunc() {
      let project__list = document.querySelector('.project__list');
      let addNewProject = document.getElementById('add__new__project');

      addNewProject.addEventListener('click', () => {
        let last = projectIdsArray.at(-1);
        projectIdsArray.push(last + 1);
        projectIdsArray.shift();
        console.log(projectIdsArray[0]);
                  
        project__list.innerHTML += `
                          <div class="project" id="project__${projectIdsArray[0]}">
                              <div class="project__logo">
                                  <img src="/icons/defaultProjectLogo.png" alt="#" class="project__logo__img">
                              </div>
                              <div class="project__inList__name">
                                  Default project name
                              </div>
                              <div class="project__options__btn">
                                  <img class="project__options__btn__img" src="/icons/projectOptionsBtn.png" alt="icon">
                              </div>
                          </div>
                          <div class="project__options visibility__hidden">
                            <div class="project__option remove__btn">Remove</div>
                            <div class="project__option rename__btn">Rename</div>
                            <div class="project__option change__logo__btn">Change logo</div>
                          </div>`

      // Обязательные функции для возможности управления вновь добавленными проектами
      projectsOptions();
      optionsPositioning();
      removeProject();
      renameProject();
      changeProjectLogo();
      })
    }

    addNewProjectFunc();
    
    // Опции проекта
    function projectsOptions() {
      let optionsBtns = document.querySelectorAll('.project__options__btn');

      for(let i = 0; i < optionsBtns.length; i++) {
        optionsBtns[i].addEventListener('click', () => hideVisibleElements(optionsBtns[i].parentElement.nextElementSibling));
      }
    };

    projectsOptions();

    // Позиционирование опций относительно проекта
    function optionsPositioning() {
      let projects = document.querySelectorAll('.project');

      projects.forEach((project) => {
          project.addEventListener('mouseenter', () => {
           let options = project.nextElementSibling;
          
            options.style.top = project.getBoundingClientRect().top + options.getBoundingClientRect().height / 3 + 'px';
            options.style.left = project.getBoundingClientRect().height * 3.9 + 'px';
             })
      });
    }
    
    optionsPositioning();
   
    //Удаление проекта
    function removeProject() {
      let removeBtns = document.querySelectorAll('.remove__btn');
    
      for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', () => {
          removeBtns[i].parentNode.previousElementSibling.remove();
          removeBtns[i].parentNode.remove();
          projectIdsArray[0] = projectIdsArray[0] - 1;
        })
      }
    }
  
    removeProject();  

    // Переименование проекта
    function renameProject() {
      let renameBtns = document.querySelectorAll('.rename__btn');

      for(let i = 0; i < renameBtns.length; i++) {
        renameBtns[i].addEventListener('click', () => {
          let projectInListName = renameBtns[i].parentElement.previousElementSibling.querySelector('.project__inList__name');
          projectInListName.innerHTML = `<input type="text" id="project__${i + 1}__name">`;
          let projectsOptions = renameBtns[i].parentElement;
          hideVisibleElements(projectsOptions);
                    
          let input = document.querySelector(`#project__${i + 1}__name`);
          input.style.backgroundColor = window.getComputedStyle(renameBtns[i]).backgroundColor;
          input.style.color = window.getComputedStyle(renameBtns[i].parentElement.previousElementSibling.querySelector('.project__inList__name')).color;
          input.focus();
                   
          input.addEventListener('blur', () => {
            projectInListName.innerHTML = input.value;
          })
        })
      }
    }

    renameProject();

    //Фокусировка на одном элементе
    function focusOnElement(elem) {
      let content = document.querySelector('.content');
      let newElem = elem.cloneNode(true);
      elem.remove();
      content.after(newElem);
      content.style.filter = 'blur(2px)';
      hideVisibleElements(elem);
    }

    // Возврат фокуса на весь докумен
    function focusAtAll(elem) {
      let content = document.querySelector('.content');
      content.style.filter = 'blur(0px)';
      
    }

    // Изменение логотипа проекта
    function changeProjectLogo() {
      // Центровка элемента с выбором лого посередине окна
      let projectsLogo = document.querySelector('.projects__logo__elem');
      let projectsLogoWidth = parseFloat(window.getComputedStyle(projectsLogo).width);
      let projectsLogoHeight = parseFloat(window.getComputedStyle(projectsLogo).height);
      projectsLogo.style.left = document.documentElement.clientWidth / 2 - projectsLogoWidth / 2 + 'px';
      projectsLogo.style.top = document.documentElement.clientHeight / 2 - projectsLogoHeight / 2 + 'px';
      
      //Убрать/добавить невидимость и фокус на элементе с выбором лого
      let changeLogoBtns = document.querySelectorAll('.change__logo__btn');
      for(let i = 0; i < changeLogoBtns.length; i++) {
        changeLogoBtns[i].addEventListener('click', () => {
          hideVisibleElements(projectsLogo);
          hideVisibleElements(changeLogoBtns[i].parentElement);
          // focusOnElement(document.querySelector('.projects__logo'));
          let lastLogoImg = [];
          //Заменить лого
          let logoImgs = document.querySelectorAll('.project__logo__preview')
          for (let j = 0; j < logoImgs.length; j++) {
            logoImgs[j].addEventListener('click', () => {
            let logo = changeLogoBtns[i].parentElement.previousElementSibling.querySelector('.project__logo__img')
            
            logo.src = logoImgs[j].src
            
            // focusAtAll(document.querySelector('.projects__logo'))
            let projectLogoAccept = document.querySelector('.project__logo__accept')
            projectLogoAccept.classList.remove('visibility__hidden')

          let okBtn = document.querySelector('.logo__ok')
          okBtn.addEventListener('click', () => {
            projectsLogo.classList.add('visibility__hidden')
            projectLogoAccept.classList.add('visibility__hidden')
            lastLogoImg.push(logo.src)
            console.log(lastLogoImg);
            
          })

          let noBtn = document.querySelector('.logo__not__ok')
          noBtn.addEventListener('click', () => {
            console.log(lastLogoImg);
             
             
            
            projectsLogo.classList.add('visibility__hidden')
            projectLogoAccept.classList.add('visibility__hidden')
          })

          })

          }
        })
      
      }

      
      
      //Замена лого на новое

     }

    changeProjectLogo();

    
 
    


 




});

