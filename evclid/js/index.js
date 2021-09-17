window.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#list__item__burger').addEventListener('click', function(){
        document.querySelector('#menu').classList.toggle('is-active')
    });

    const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: false,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: 'true',
        },
      });

    document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn){
        tabsBtn.addEventListener('click', function(event){
            const path = event.currentTarget.dataset.path
            console.log(path)

            document.querySelectorAll('.tab__content').forEach(function(tabContent){
                tabContent.classList.remove('tab__content-active')
            })
            document.querySelector(`[data-target="${path}"]`).classList.add('tab__content-active')
        })
    })

    $( function() {
        $( "#accordion" ).accordion({
            collapsible: true,
            animate: 200,
            icons: { "header": false, "activeHeader": false },
            heightStyle: "content"
        });
      } );
})