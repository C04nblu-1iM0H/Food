window.addEventListener('DOMContentLoaded', ()=>{
    //Create tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }
    hideTabContent();

    function showTabContent(i = 0){
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    showTabContent();

    tabParent.addEventListener('click', (ev)=>{
        const target = ev.target;
        
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target === item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
    //Create timer

    const deadline = '2023-03-28';
    const date = new Date();
    date.setDate(date.getDate() + 2);
    // date.setHours(date.getHours() - 1);
    // date.setMinutes(date.getMinutes() - 1);
    date.setSeconds(date.getSeconds() - 1);
    const deadlineRemaining = date;

    function getTimeRemaining(endTime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());
        
        if(t <= 0 ){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t/1000) % 60); 
        }
        
        return {
            total: t,
            'days' : days,
            'hours'  : hours,
            'minutes': minutes,
            'seconds' : seconds
        };
    }

    function setClock(selector, endTime){
        const timer =document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endTime);

            days.textContent = (t.days < 10)? `0${t.days}`: t.days; //либо сделать функцию которая будет принимать аргумент  t.days и проверять его меньше ли оно 10
            hours.textContent = (t.hours < 10)? `0${t.hours}`: t.hours;
            minutes.textContent = (t.minutes < 10)? `0${t.minutes}`: t.minutes;
            seconds.textContent = (t.seconds < 10)? `0${t.seconds}`: t.seconds;

            if(t.total <=0){
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadlineRemaining);

});