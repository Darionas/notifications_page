'use strict';
/*jshint esversion: 8*/

const notifications = document.querySelector('.main__notifications');
const num = document.querySelector('.notifications__number');
const unmark = document.querySelector('.header__switch');
const mark = document.getElementsByClassName('main__content-mark');
const container_colored = document.getElementsByClassName('main__container');
let data;

getJSON('data.json');
async function getJSON(file) {
  //fetch data from data.json
    const myObject = await fetch(file);
    try {
        const myData = await myObject.text();
  //place json to localStorage
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('data', myData);
        } else {
            alert('Sorry! No Web Storage support.');
        }
        data = localStorage.getItem('data');
        const get = JSON.parse(data);
        //console.log(get);
        
        for(const item of get) {
            const results = document.createElement('div');
            notifications.appendChild(results);
            //hide alt attribute value when src attribute value is not present 
            //https://stackoverflow.com/questions/36305805/how-to-hide-alt-text-using-css-when-the-image-is-not-present#answer-49105591
            //console.log(item);
            results.innerHTML =
            `<div class="main__container">
              <img class="main__owner-img" src="${item.owner_img}" alt="${item.owner}" />
              <div class="main__content" style="width: 75vw;">
                <a href="#note" class="main__content-img"><img class="img" src="${item.member_img}" onerror="this.style.display='none';" alt="Member" /></a>
                <a href="#note" class="main__content-owner">${item.owner}&#8201;</a>
                <span class="main__content-action">${item.action}&#8201;</span>
                ${item.notice.length > 0 ? `<a href="#note" class="main__content-notice">${item.notice}&#8201;</a>` : `<a href="#" class="main__content-notice" style="display:none">Hello</a>`}
                ${item.group.length > 0 ? `<a href="#note" class="main__content-group">${item.group}&#8201;</a>` : `<a href="#" class="main__content-group" style="display:none">Hello</a>`}
                ${item.mark === true ? `<img class="main__content-mark" src="assets/images/circle.jpg" alt="circle" style="width: 0.5rem;" />` : `<img class="circle" src="/assets/images/circle.jpg" alt="circle" style="display: none;" onerror="this.style.display='none';"/>`}<br/>
                <span class="main__time">${item.time}</span>
              </div>  
              ${item.msg.length > 0 ? `<a href="#note" class="main__msg">${item.msg}&#8201;</a>` : `<a href="#" class="main__msg" style="display:none">Hello</a>`}
            </div>`.trim();

            //color have not read massage
            for(let i=0; i < container_colored.length; i++) {
                if(item.mark === true && item.mark != null && item.mark != undefined) {
                    container_colored[i].classList.add('main__container--colored');
                }
            }

            //get notifications number
            //Get number of true values in object
            //https://stackoverflow.com/questions/51915341/get-count-of-true-values-in-json-with-javascript#answer-51915372
            function readed() {
                const n = Object.keys(get).filter(k => get[k].mark);
                if(n.length < 1) {
                    num.classList.add('notifications__number--hide');
                } else {
                    num.innerHTML = n.length;
                }
            }
            readed();

            //make notice has read
                for(let i=0; i < container_colored.length; i++) {
                    container_colored[i].addEventListener('click', function() {
            //find out if html element has certain class value
            //https://stackoverflow.com/questions/9587070/if-statement-to-find-a-class-in-javascript#answer-9587185
                        if(container_colored[i].classList.contains('main__container--colored')) {
                            container_colored[i].classList.remove('main__container--colored');
                            mark[i].classList.add('main__content-mark--hide');
                        for(let j=0; j < get.length; j++) {
                            get[i].mark = false;
                            localStorage.setItem('data', JSON.stringify(get));
                        }     
                            readed();
                        }    
                    });
                }

            //make all notices have read
            unmark.addEventListener('click', function() {
                for(let i=0; i < container_colored.length; i++) {
                    container_colored[i].classList.remove('main__container--colored');
                    if(mark[i]) {
                        mark[i].classList.add('main__content-mark--hide');
                    }
                }
                for(let i=0; i < get.length; i++) {
                    get[0].mark= false; get[1].mark= false; get[2].mark= false;
                    localStorage.setItem('data', JSON.stringify(get));
                } 
                readed();              
            })
          
        }
       
    } catch(error) {
        console.log(error);
    }
}