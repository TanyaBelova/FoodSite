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

        const deadline = '2022-06-15T00:00';
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

        // Modal

        const modalBtns = document.querySelectorAll('[data-modal]'),
                modalForData = document.querySelector('.modal');
                



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


        modalForData.addEventListener('click', (e)=>{
            if(e.target === modalForData || e.target.getAttribute('data-close') == ''){
                closeModal();
            }
        });

        document.addEventListener('keydown', (e)=>{
            if (e.code === "Escape" && modalForData.classList.contains('show')){
                closeModal();
            }
        });

        const modalTimerId = setTimeout(showModal, 50000);

        function showModalByScroll() {
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                showModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);


        // Классы для карточек


        class FoodCard{
            constructor(img, alt, subtitle, descr, price, parent, ...classes){
                this.img = img;
                this.alt = alt;
                this.subtitle = subtitle;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parent);
                this.classes = classes;
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH(){
                this.price *= this.transfer;
            }

            createCard(){
                const div = document.createElement('div');
                if (this.classes.length === 0){
                    this.div = 'menu__item';
                    div.classList.add(this.div);
                } else {
                    this.classes.forEach(className => div.classList.add(className));
                }

                div.innerHTML = `                
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
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
            '.menu .container',
            'menu__item',
            'big'
            ).createCard();

        new FoodCard(
            "img/tabs/elite.jpg", 
            "elite", 
            'Меню “Премиум”', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
            15, 
            '.menu .container',
            'menu__item'
            ).createCard();
    
        new FoodCard(
            "img/tabs/post.jpg", 
            "post", 
            'Меню "Постное"', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
            12, 
            '.menu .container',
            'menu__item'
            ).createCard();


        //Forms
        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

        forms.forEach(item =>{
            postData(item);
        });

        function postData(form){
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Добавление картинки загрузки
                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);

                const formData = new FormData(form);
                const object = {};
                formData.forEach((value, key)=>{
                    object[key] = value;
                });

                fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(responce => responce.text())
                .then(responce => {
                        console.log(responce);
                        showThanksModal(message.success);
                        statusMessage.remove();
                    }).catch(()=>{
                        showThanksModal(message.failure);
                    }).finally(()=> {
                        form.reset();
                    });
                

                // fetch('server.php', {
                //     method: 'POST',
                //     // headers: {
                //     //     'Content-type': 'application/json'
                //     // },
                //     body: formData
                // })
                // .then(responce => responce.text())
                // .then(responce => {
                //         console.log(responce);
                //         showThanksModal(message.success);
                //         statusMessage.remove();
                //     }).catch(()=>{
                //         showThanksModal(message.failure)
                //     }).finally(()=> {
                //         form.reset();
                //     });
                

                // request.addEventListener('load', ()=>{
                //     if(request.status === 200){
                //         console.log(request.response);
                //         showThanksModal(message.success);
                //         form.reset();
                //         statusMessage.remove();
                //     }else{
                //         showThanksModal(message.failure);
                //     }
                // });
            });
        }

        function showThanksModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            showModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class = "modal__content">
                    <div class = "modal__close" data-close>×</div>
                    <div class = "modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(()=>{
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);
        }


        //Работа с json-server
        fetch(' http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
});