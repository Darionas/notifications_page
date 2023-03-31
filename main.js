'Use strict';
/*jshint esversion: 8*/

const notifications = document.querySelector('.main__notifications');

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
            results.innerHTML =
                `<img class="main__owner-img" src="${item.owner_img}" alt="${item.owner}" />
                <div class="main__content">
                     <span class="main__content-owner">${item.owner}&#8201;</span>
                     <span class="main__content-action">${item.action}&#8201;</span>
                     <span class="main__content-notice">${item.notice}&#8201;</span>
                     <span class="main__content-group">${item.group}</span>
                     <span class="main__content-mark"></span>
                     <span class="main__content-time">${item.time}</span>
                </div>
                <img class="main__member-img" src="${item.member_img}" onerror="this.style.display='none';" alt="Member" />
                <p class="main__msg">${item.msg}</p>`;
        }
    } catch(error) {
        console.log(error);
    }
}