import conditions from "./conditions.js";
// console.log(conditions);
const apiKey = '461316ab8b3e4950980103213231902'

// const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`

// fetch(query).then((response) => {
//     return response.json()
// }).then((data) => {
// console.log(data);
// })

//делаю так чтобы значение города который мы вводим - подставлялось в api
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity')
const header = document.querySelector('.header')


//

//теперь надо добавить прослушку введенного значения
form.onsubmit = function (e) {
    //отмена перезагрузки
    e.preventDefault();
    //trim обрезает пробелы а инпут значение выводит
    let city = input.value.trim();
    // теперь надо сделать запрос на сервак, чтобы получить запрос
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}` //адрес запроса
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data); //теперь в косоль выводятся города и можно видеть погоду для них
        console.log(data.location.name);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);
        console.log(data.current.condition.code);

        const info = conditions.find(function (obj) {
            if (obj.code === data.current.condition.code) return true
        })
        console.log(info);
        console.log(info.languages[23]['day_text']);


        const filePath = './img' + '/';
        const fileName = (data.current.condition.text) + '.png';
        const imgPath = filePath + fileName;
        console.log('filePath', filePath + fileName);

        //теперь добавлю отображение выведеных элементов в карточку, просто подставляя значения 
        //карточка
        const html = `<div class="card">
    <h2> <div class="card-city">${data.location.name}</div> </h2>
    <div class="card-weather">
        <div class="card-value">${data.current.temp_c}<sup>°с</sup> </div>
        <img class="card-img" src="${imgPath}" alt="sun">
    </div>
    <div class="card-description">${info.languages[23]['day_text']}</div>
    </div>`;

        //отображение карточки на странице после шапки
        header.insertAdjacentHTML('afterend', html);


        // поиск перевода по цифре 
        // const info = conditions.find(function (obj) {
        //     if (obj.code === data.current.condition.code) return true
        // })
        // // console.log(info);
        // console.log(info.languages[23]['day_text']);
        
    })
};
