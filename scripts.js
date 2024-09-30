document.addEventListener('DOMContentLoaded', function() {
    // Выбираем кнопки и блоки
    const projectsBtn = document.querySelector('.projects__btn');
    const asideMain = document.querySelector('#aside__main');

    // Добавляем обработчик события
    projectsBtn.addEventListener('click', function() {
      if (asideMain.classList.contains('visibility__hidden')) {
        asideMain.classList.remove('visibility__hidden')
        asideMain.classList.add('visibility__visible')
      }
      else {
        asideMain.classList.remove('visibility__visible')
        asideMain.classList.add('visibility__hidden')
      }
    });
    
    
    
    
    

});