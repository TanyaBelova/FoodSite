"use strict";

window.addEventListener('DOMContentLoaded', () => {


    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                // item.style.display = 'none';
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            // tabsContent[i].style.display = 'block';
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')){
                tabs.forEach((item, i) => {
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

        //Timer

        const deadline = '2021-12-01T00:00';
        console.log(deadline);

        function getTimeRemaining(endtime){
            const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t/(1000*60*60) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

            return{
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function getZero(num){
            if (num >=0 && num < 10){
                return `0${num}`;
            } else{
                return num;
            }
        }

        function setClock (selector, endtime){
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock(){
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0){
                    clearInterval(timeInterval);
                }
            }

        }

        setClock('.timer', deadline);

        //Modal

        const modalBtns = document.querySelectorAll('[data-modal]'),
                modalForData = document.querySelector('.modal'),
                btnClose = document.querySelector('[data-close]');
                



        modalBtns.forEach((element, i) => {
            // element.addEventListener('click', ()=>{
            //     // modalForData.style.display = 'block';
               
            // });
            element.addEventListener('click', showModal);
        });

    function closeModal(){
        modalForData.classList.remove('show');
        modalForData.classList.add('hide');
        document.body.style.overflow = '';
    }

    function showModal(){
        modalForData.classList.add('show');
        modalForData.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

        // btnClose.addEventListener('click', ()=>{
        //     // modalForData.style.display = 'none';
        // });

        btnClose.addEventListener('click', closeModal);

        modalForData.addEventListener('click', (e)=>{
            if(e.target === modalForData && modalForData.classList.contains('show')){
                closeModal();
            }
        });

        document.addEventListener('keydown', (e)=>{
            if (e.code === "Escape"){
                closeModal();
            }
        });

        // const modalTimerId = setTimeout(showModal, 5000);

        function showModalByScroll() {
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                showModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);


        // Классы для карточек


        class FoodCard{
            constructor(img, alt, subtitle, descr, price, parent){
                this.img = img;
                this.alt = alt;
                this.subtitle = subtitle;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parent);
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH(){
                this.price *= this.transfer;
            }

            createCard(){
                const div = document.createElement('div');
                div.innerHTML = `                
                <div class="menu__item">
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`;
                this.parent.append(div);
            }
        }

        new FoodCard(
            "img/tabs/vegy.jpg", 
            "vegy", 
            'Меню "Фитнес"', 
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
            9, 
            '.menu .container'
            ).createCard();

        new FoodCard(
            "img/tabs/elite.jpg", 
            "elite", 
            'Меню “Премиум”', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
            15, 
            '.menu .container'
            ).createCard();
    
        new FoodCard(
            "img/tabs/post.jpg", 
            "post", 
            'Меню "Постное"', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
            12, 
            '.menu .container'
            ).createCard();
});