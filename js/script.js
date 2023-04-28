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

    
    //create modal window
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal(){
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(idModalTime);
    }

    function closeModal(modal){
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }


    function clickBtns(btns){
        btns.forEach( btn => {
            btn.addEventListener('click', openModal)
        });
    }
    clickBtns(modalTrigger);

    function close(btnCls, modal){
        btnCls.addEventListener('click', () => {
            closeModal(modal);
        })
    }
    close(modalCloseBtn, modal);

    function Background(modal){
        modal.addEventListener('click', (ev)=> {
            if(ev.target === modal){
                closeModal(modal);
            }
        })
    }
    Background(modal);

    function ModalESC(modal) {
        document.addEventListener('keyup', (e) =>{
            if(e.type == 'keyup' && e.code == 'Escape' && modal.classList.contains('show')){
                closeModal(modal);
            }
        })
    }
    ModalESC(modal);

    // const idModalTime = setInterval(openModal, 6000);


    function showModalScroll(){
        let scrollModal = document.documentElement;
        if(Math.floor(scrollModal.scrollHeight - scrollModal.scrollTop) === scrollModal.clientHeight){
            openModal();
            document.removeEventListener('scroll', showModalScroll); 
        } 
    }
    document.addEventListener('scroll', showModalScroll);



    class MenuCard {
        constructor(src, alt, titel, description, price, perentSelector){
            this.src = src;
            this.alt = alt;
            this.titel = titel;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(perentSelector);
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const div = document.createElement('div'),
                  img = document.createElement('img'),
                  h3  = document.createElement('h3'),
                  description = document.createElement('div'),
                  divider = document.createElement('div'),
                  price = document.createElement('div'),
                  cost = document.createElement('div'),
                  total = document.createElement('div');

            div.classList.add("menu__item");
            h3.classList.add("menu__item-subtitle");
            description.classList.add("menu__item-descr");
            divider.classList.add("menu__item-divider");
            price.classList.add("menu__item-price");
            cost.classList.add("menu__item-cost");
            total.classList.add("menu__item-total");
            img.getAttribute("src");
            img.getAttribute("alt");
            img.setAttribute("src", this.src);
            img.setAttribute("alt", this.alt);

            h3.textContent = this.titel;
            description.textContent = this.description;
            cost.textContent = "Цена:";
            total.innerHTML = `<span>${this.price}</span> грн/день`;

            let messiv = [img, h3, description, divider, price, [cost, total]];

            const addElementsPage = (mess) =>{
                mess.map(i => (Array.isArray(i))? price.append(...i) : div.append(i));
            }
            addElementsPage(messiv);
            this.parent.append(div);

        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню “Фитнес”', 
        'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '10', 
        '.menu .container'
        ).render();
    new MenuCard(
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '20', 
        '.menu .container'
        ).render();
    new MenuCard(
        'img/tabs/post.jpg', 
        'post', 
        'Меню “Постное”', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '16', 
        '.menu .container'
        ).render();
});