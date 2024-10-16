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
                            <div class="project__option rename__btn">Rename</div>
                            <div class="project__option change__logo__btn">Change logo</div>
                          </div>`

      // Обязательные функции для возможности управления вновь добавленными проектами
      projectsOptions()
      optionsPositioning()
      removeProject() 
      renameProject()
      changeProjectLogo()
      focusOnElement(document.querySelector('.projects__logo'))
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
      let projects = document.querySelectorAll('.project');

      projects.forEach((project) => {
          project.addEventListener('mouseenter', () => {
           let options = project.nextElementSibling
          
            options.style.top = project.getBoundingClientRect().top + options.getBoundingClientRect().height / 3 + 'px'
            options.style.left = project.getBoundingClientRect().height * 3.9 + 'px'
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

    // Переименование проекта
    function renameProject() {
      let renameBtns = document.querySelectorAll('.rename__btn')

      for(let i = 0; i < renameBtns.length; i++) {
        renameBtns[i].addEventListener('click', () => {
          let projectInListName = renameBtns[i].parentElement.previousElementSibling.querySelector('.project__inList__name')
          projectInListName.innerHTML = `<input type="text" id="project__${i + 1}__name">`
          let projectsOptions = renameBtns[i].parentElement
          hideVisibleElements(projectsOptions)
                    
          let input = document.querySelector(`#project__${i + 1}__name`)
          input.style.backgroundColor = window.getComputedStyle(renameBtns[i]).backgroundColor
          input.style.color = window.getComputedStyle(renameBtns[i].parentElement.previousElementSibling.querySelector('.project__inList__name')).color;
          input.focus()
                   
          input.addEventListener('blur', () => {
            projectInListName.innerHTML = input.value;
          })
        })
      }
    }

    renameProject()

    // Изменение логотипа проекта
    function changeProjectLogo() {
      let projectsLogo = document.querySelector('.projects__logo')
      let projectsLogoWidth = parseFloat(window.getComputedStyle(projectsLogo).width);
      let projectsLogoHeight = parseFloat(window.getComputedStyle(projectsLogo).height);
      projectsLogo.style.left = document.documentElement.clientWidth / 2 - projectsLogoWidth / 2 + 'px'
      projectsLogo.style.top = document.documentElement.clientHeight / 2 - projectsLogoHeight / 2 + 'px'
      
      let changeLogoBtns = document.querySelectorAll('.change__logo__btn')

      for(let i = 0; i < changeLogoBtns.length; i++) {
        changeLogoBtns[i].addEventListener('click', () => {
          hideVisibleElements(projectsLogo)
          hideVisibleElements(changeLogoBtns[i].parentElement)
          // focusOnElement(document.querySelector('.projects__logo'))
          // console.log(document.querySelector('.projects__logo').classList);
        })
      }
      
      
      
    }

    changeProjectLogo()


    // Фокус на элементе
    // function focusOnElement(elem) {
    //   let projectsLogo = document.querySelector('.content:not(.projects__logo):not(.project__logo__preview):not(.projects__logo__text):not(.project__logo__images)')

    //   if(elem.classList.contains('visibility__hidden') == false) {
    //     elem.style.zIndex = 999;
    //     projectsLogo.style.filter = 'blur(5px)';
    //     }
    // }
    
     function focusOnElement(hiddenElem) {
      // let projectsLogo = document.querySelector('.content:not(.projects__logo):not(.project__logo__preview):not(.projects__logo__text):not(.project__logo__images)')

      let htmlText = "document.querySelector('.content:not("

      // for(let i = 0; i < focusElems.length; i++) {
      //   if (i < focusElems.length - 1) {
      //     htmlText += `${focusElems[i]}):not(`
      //   }
      //   else {
      //     htmlText += `${focusElems[i]})`
      //   }
      // }

      
      
      let elem = document.querySelector(`${hiddenElem}`)
      // Костыль, работает только по первому классу, исправить в будущем
      if(elem.children) {
        htmlText += `${elem.classList[0]}):not(`
        for(let i = 0; i < elem.children.length; i++) {
          htmlText += `${elem.children[i].className}):not(`
        }
      }
      
      console.log(htmlText);
      

      

      // if(hiddenElem.classList.contains('visibility__hidden') == false) {
      //   hiddenElem.style.zIndex = 999;
      //   projectsLogo.style.filter = 'blur(5px)';
      //   }
    }

      focusOnElement('.projects__logo')







});

