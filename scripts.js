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
    let addNewProject = document.querySelector('.add__new__project');

    addNewProject.addEventListener('click', () => {
      let last = projectIdsArray.at(-1);
      projectIdsArray.push(last + 1);
      projectIdsArray.shift();
   
                
      project__list.innerHTML += `
                        <div class="project" id="project__${projectIdsArray[0]}">
                            <div class="project__logo">
                                <img src="/icons/defaultProjectLogo.png" alt="#" class="project__logo__img">
                            </div>
                            <div class="project__inList__name">
                                Default project name
                            </div>
                            <div class="project__options__btn" id="project__btn">
                                <img class="project__options__btn__img" src="/icons/projectOptionsBtn.png" alt="icon">
                            </div>
                        </div>
                        <div class="project__options" id="project__options">
                          <div class="project__option remove__btn">Remove</div>
                          <div class="project__option rename__btn">Rename</div>
                          <div class="project__option change__logo__btn">Change logo</div>
                        </div>`

    
    
    // Обязательные функции для возможности управления вновь добавленными проектами
    optionsPositioning('.project', 3, 3.9);
    removeProject();
    renameProject();
    changeProjectLogo();
    visibleOptions('project', '#project__btn')
    })
  }

  addNewProjectFunc();
  
  // Отображение/скрытие опций проекта
  function visibleOptions(parentClass, optionsBtn) {
    // Поиск всех нужных элементов
    let allElems = document.querySelectorAll(`.${parentClass}`)

    for (let i = 0; i < allElems.length; i++) {
      // Отображение/скрытие опций
      let btn = allElems[i].querySelector(optionsBtn)
      let elem = allElems[i].nextElementSibling

        btn.addEventListener('click', function(event) {
          event.stopPropagation()
                
          const computedVisibility = window.getComputedStyle(elem).visibility;
  
          if (computedVisibility === "hidden") {
                elem.style.visibility = "visible";
                          
            } else {
                elem.style.visibility = "hidden";
            }
        });
  
        document.addEventListener('click', function(event) {
          if (elem.style.visibility === 'visible' && !elem.contains(event.target) && event.target !== btn) {
            elem.style.visibility = 'hidden'
          }
        })
    }
  }

  visibleOptions('project', '#project__btn')


  // Позиционирование опций относительно проекта
  function optionsPositioning(cssClass, top, left) {
    let projects = document.querySelectorAll(cssClass);

    projects.forEach((project) => {
        project.addEventListener('mouseenter', () => {
         let options = project.nextElementSibling;
        
          options.style.top = project.getBoundingClientRect().top + options.getBoundingClientRect().height / top + 'px';
          options.style.left = project.getBoundingClientRect().height * left + 'px';
           })
    });
  }
  
  optionsPositioning('.project', 3, 3.9);
 
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

  // Возврат фокуса на весь документ
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
    let lastLogoImg = new Set();
    for(let i = 0; i < changeLogoBtns.length; i++) {
      changeLogoBtns[i].addEventListener('click', () => {
        hideVisibleElements(projectsLogo);
        hideVisibleElements(changeLogoBtns[i].parentElement);
        // для фокусировки: focusOnElement(document.querySelector('.projects__logo'));
        
        //Заменить лого
        let logoImgs = document.querySelectorAll('.project__logo__preview')
        for (let j = 0; j < logoImgs.length; j++) {
          logoImgs[j].addEventListener('click', () => {
            let logo = changeLogoBtns[i].parentElement.previousElementSibling.querySelector('.project__logo__img')
            logo.src = logoImgs[j].src
            
            // для фокусировки: focusAtAll(document.querySelector('.projects__logo'))
            let projectLogoAccept = document.querySelector('.project__logo__accept')
            projectLogoAccept.classList.remove('visibility__hidden')

            let okBtn = document.querySelector('.logo__ok')
            okBtn.addEventListener('click', () => {
              projectsLogo.classList.add('visibility__hidden')
              projectLogoAccept.classList.add('visibility__hidden')
              lastLogoImg.add(logo.src)
              
            })
            // Если выбрал
            let noBtn = document.querySelector('.logo__not__ok')
            noBtn.addEventListener('click', () => {
              logo.src = Array.from(lastLogoImg).pop();
              projectsLogo.classList.add('visibility__hidden')
              projectLogoAccept.classList.add('visibility__hidden')
            })
          })
        }
      })
    }
  }

changeProjectLogo();
  
// Позиционирование опций относительно учетной записи
optionsPositioning('.member', 2.1, 3.25);


//Учетные записи 
// Отображение опций учетной записи
visibleOptions('member', '#member__options__btn2')


// Отображение учетных записей в таске
function taskMembersIcons () {
  let taskMembers = document.querySelectorAll('.task__members')

  for (let i = 0; i <= taskMembers.length; i++) {
    if (taskMembers[i]) {
      if (taskMembers[i].children.length == 1) {
        taskMembers[i].children[0].style.left = '0%';
      }
      else if (taskMembers[i].children.length == 2) {
        taskMembers[i].children[0].style.left = '10%';
        taskMembers[i].children[1].style.left = '0%';
      }
      else if (taskMembers[i].children.length == 3) {
        taskMembers[i].children[0].style.left = '20%';
        taskMembers[i].children[1].style.left = '10%';
        taskMembers[i].children[2].style.left = '0%';
      }
      else if (taskMembers[i].children.length == 4) {
        taskMembers[i].children[0].style.left = '30%';
        taskMembers[i].children[1].style.left = '20%';
        taskMembers[i].children[2].style.left = '10%';
        taskMembers[i].children[3].style.left = '0%';
      }
    }



    
  }
}

taskMembersIcons()















});

