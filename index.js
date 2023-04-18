'use strict';
/*jshint esversion: 8*/

const notifications = document.querySelector('.main__notifications');
const num = document.querySelector('.notifications__number');
const unmark = document.querySelector('.header__switch');
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
                <img class="main__content-img" src="${item.member_img}" onerror="this.style.display='none';" alt="Member" />
                <span class="main__content-owner">${item.owner}&#8201;</span>
                <span class="main__content-action">${item.action}&#8201;</span>
                ${item.notice.length > 0 ? `<span class="main__content-notice">${item.notice}&#8201;</span>` : `<span class="main__content-notice" style="display:none">Hello</span>`}
                ${item.group.length > 0 ? `<span class="main__content-group">${item.group}&#8201;</span>` : `<span class="main__content-group" style="display:none">Hello</span>`}
                ${item.mark === true ? `<img class="main__content-mark" src="assets/images/circle.jpg" alt="circle" style="width: 0.5rem;" />` : `<img class="circle" src="/assets/images/circle.jpg" alt="circle" style="display: none;" onerror="this.style.display='none';"/>`}<br/>
                <span class="main__time">${item.time}</span>
              </div>  
              ${item.msg.length > 0 ? `<span class="main__msg">${item.msg}&#8201;</span>` : `<span class="main__msg" style="display:none">Hello</span>`}
            </div>`.trim();

            //color not have read massage
            const container_colored = document.getElementsByClassName('main__container');
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
            const mark = document.getElementsByClassName('main__content-mark');
            /*const container_uncolor = document.getElementsByClassName('main__container');
                for(let i=0; i < container_uncolor.length; i++) {
                    container_uncolor[i].addEventListener('click', function(e) {
                        container_uncolor[i].classList.remove('main__container--colored');
                        mark[i].classList.add('main__content-mark--hide');
                       
                       
                    });
                }*/

            //make all notices have read
            //const container_uncolor_all = document.querySelectorAll('.main__container');
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