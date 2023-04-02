'Use strict';
/*jshint esversion: 8*/

const notifications = document.querySelector('.main__notifications');
let mark;

getJSON('data.json');

async function getJSON(file) {
    const myObject = await fetch(file);
    try {
        const myData = await myObject.text();
        const get = JSON.parse(myData);
        
        
        for(const item of get) {
            const results = document.createElement('div');
            notifications.appendChild(results);
            //hide alt attribute value when src attribute value is not present 
            //https://stackoverflow.com/questions/36305805/how-to-hide-alt-text-using-css-when-the-image-is-not-present#answer-49105591
            console.log(item);
            results.innerHTML =
            `<div class="main__container">
              <img class="main__owner-img" src="${item.owner_img}" alt="${item.owner}" />
              <div class="main__content" style="width: 75vw;">
                <img class="main__content-img" src="${item.member_img}" onerror="this.style.display='none';" alt="Member" />
                <span class="main__content-owner">${item.owner}&#8201;</span>
                <span class="main__content-action">${item.action}&#8201;</span>
                ${item.notice.length > 0 ? `<span class="main__content-notice">${item.notice}&#8201;</span>` : `<span class="main__content-notice main__txt" style="display:none">Hello</span>`}
                ${item.group.length > 0 ? `<span class="main__content-group">${item.group}&#8201;</span>` : `<span class="main__content-group main__txt" style="display:none">Hello</span>`}
                ${item.mark === true ? `<img class="main__content-mark" src="assets/images/circle.jpg" alt="circle" style="width: 0.5rem;" />` : `<img class="circle" src="/assets/images/circle.jpg" alt="circle" style="display: none" />`}<br/>
                <span class="main__time">${item.time}</span>
              </div>  
              ${item.msg.length > 0 ? `<span class="main__msg">${item.msg}&#8201;</span>` : `<span class="main__msg main__txt" style="display:none">Hello</span>`}
            </div>`.trim();

        }
       

    } catch(error) {
        console.log(error);
    }
}