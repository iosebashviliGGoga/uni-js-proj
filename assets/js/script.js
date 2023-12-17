'use strict'


    ; (function () {


        function tourDetails() {
            if (!document.querySelector('.tour-card')) {
                return
            }

            // First, get the body element without the specific class
            const bodyWithoutClass = document.querySelector('body:not(.withoutCardFunction)');

            // Then, find .tour-card elements within that body element
            const tourCards = bodyWithoutClass.querySelectorAll('.tour-card');




            tourCards.forEach((card) => {

                card.addEventListener('click', (e) => {
                    //    console.log(e.target.tagName)
                    //   console.log(e.target.classList)
                    /*  if (!e.target.classList.contains('tour-card-action') && !e.target.tagName == 'H2' && !e.target.classList.contains('d-flex')) {
                          return
                      } */
                    if (!e.target.classList.contains('tour-card-action') && !e.target.parentElement.classList.contains('tour-card__description--services')) {
                        return
                    }
                    const tourDetails = card.querySelector('.tour-card__details')
                    const tourDetailsHeight = tourDetails.scrollHeight
                    card.classList.toggle('superactive')
                    card.classList.remove('active')

                    if (card.classList.contains('superactive')) {
                        tourDetails.style.height = tourDetailsHeight + 'px'
                    } else {
                        tourDetails.style.height = 0
                    }
                })

                const cardImages = card.querySelectorAll('.tour-card__image--hoverable, .tour-card__details');

                cardImages.forEach((element) => {
                    element.addEventListener('mouseenter', (e) => {
                        const card = e.currentTarget.closest('.tour-card');
                        if (!card) return;

                        const tourDetails = card.querySelector('.tour-card__details');
                        const tourDetailsHeight = tourDetails.scrollHeight;
                        card.classList.add('active');

                        if (card.classList.contains('active') || card.classList.contains('superactive')) {
                            tourDetails.style.height = tourDetailsHeight + 'px';
                        } else {
                            tourDetails.style.height = 0;
                        }
                    });




                    element.addEventListener('mouseleave', (e) => {
                        const card = e.currentTarget.closest('.tour-card');
                        if (!card) return;

                        // Check if element.parentNode.parentNode contains the class "superactive"
                        if (!element.parentNode.parentNode.classList.contains('superactive')) {
                            //console.log(element.parentNode.parentNode.classList);

                            const tourDetails = card.querySelector('.tour-card__details');
                            const tourDetailsHeight = tourDetails.scrollHeight;
                            card.classList.remove('active');

                            if (card.classList.contains('active') || card.classList.contains('superactive')) {
                                tourDetails.style.height = tourDetailsHeight + 'px';
                            } else {
                                tourDetails.style.height = 0;
                            }
                        }
                    });


                });


            })
        }

        tourDetails()


    })()



var swiper2 = new Swiper('.swiper-container2', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 2500, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',
    loop: true,

});

var swiper3 = new Swiper('.swiper-container3', {

    slidesPerView: 1,
    speed: 2000,
    autoplay: {
        delay: 3000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',

    allowTouchMove: false, // Disable touch events

});


var swiper4 = new Swiper('.swiper-container4', {

    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 2000, // Time between slide transitions (in milliseconds)
        disableOnInteraction: false // Allow manual interaction (click/drag) without stopping the autoplay
    },
    effect: 'fade',

    allowTouchMove: false, // Disable touch events

});




let citiesHTML = document.querySelectorAll('.news__board__container span.text-green')

const apiKey = "1959e040254d474d9ad120238232109";
const cities = ["Tbilisi", "Batumi", "Yerevan", "Gyumri", "Baku", "Ganja",];

const fetchWeatherData = async (city) => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

const fetchWeatherForCities = async () => {
    try {
        const promises = cities.map(city => fetchWeatherData(city));
        const results = await Promise.all(promises);

        // console.log(results)
        citiesHTML.forEach((city, i) => {

            results.forEach((result, j) => {
                if (i == j) {
                    city.innerHTML = `${Math.round(result.current.feelslike_c)} °C`
                }
            })

        })
    } catch (error) {
        console.error("Error:", error);
    }
};

fetchWeatherForCities();


let lariTOusd = document.querySelector('.lariTOusd')
let lariTOeuro = document.querySelector('.lariTOeuro')
let dramTOusd = document.querySelector('.dramTOusd')
let dramTOeuro = document.querySelector('.dramTOeuro')
let manatTOusd = document.querySelector('.manatTOusd')
let manatTOeuro = document.querySelector('.manatTOeuro')


const apiUrl = "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {

        //  console.log(data[0].currencies)
        const currenciesArray = data[0].currencies

        const usdCurrency = currenciesArray.find(currency => currency.code === 'USD');
        const euroCurrency = currenciesArray.find(currency => currency.code === 'EUR');
        const manatCurrency = currenciesArray.find(currency => currency.code === 'AZN');
        const dramCurrency = currenciesArray.find(currency => currency.code === 'AMD');



        lariTOusd.innerHTML = (1 / usdCurrency.rate).toFixed(2)
        lariTOeuro.innerHTML = (1 / euroCurrency.rate).toFixed(2)

        // console.log(Math.round((dramCurrency.rate) / (euroCurrency.rate * 1000)))
        dramTOusd.innerHTML = ((dramCurrency.rate / 1000) / (usdCurrency.rate)).toFixed(3)
        dramTOeuro.innerHTML = ((dramCurrency.rate / 1000) / (euroCurrency.rate)).toFixed(3)

        manatTOusd.innerHTML = ((manatCurrency.rate) / usdCurrency.rate).toFixed(2)
        manatTOeuro.innerHTML = ((manatCurrency.rate) / euroCurrency.rate).toFixed(2)

    })
    .catch(error => {

        console.error("Error:", error);
    });




let moreCards = document.querySelectorAll('article.card--more');
let additionalCard = document.querySelector('.card.twice--text')

moreCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
        moreCards.forEach((carded) => {
            carded.style.display = 'none';
        });
        additionalCard.style.display = 'block';
    });
});
additionalCard.addEventListener('mouseleave', function () {
    moreCards.forEach((carded) => {
        carded.style.display = 'flex';
    });
    additionalCard.style.display = 'none';
});







document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.caucasus__container .card');


    function handleClick(event) {
        const card = event.currentTarget;
        event.preventDefault();

        const hasGeorgiaNumber = card.querySelector('.number--georgia') !== null;

        cards.forEach(card => {
            card.classList.remove('activated', 'activated--left', 'activated--right');
        });

        if (hasGeorgiaNumber) {
            card.classList.add('activated', 'activated--left');

        } else {
            card.classList.add('activated', 'activated--right');

        }

        const areas = document.querySelectorAll('area');
        // console.log(event.target)
        let src;
        event.target.childElementCount > 1 ? src = event.target.childNodes[1].attributes[0].nodeValue : src = event.target.attributes[0].nodeValue
        // console.log(src)
        // console.log(event.target.childNodes[1].attributes[0].nodeValue)
        // console.log(areas[2].attributes[6].nodeValue)

        // console.log(areas)
        areas.forEach((ar) => {

            if (src == ar.attributes[6].nodeValue) {
                console.log(ar)
                ar.click()
                console.log('yeeey, found')
            }
        })


    }


    cards.forEach(card => {

        card.addEventListener('click', handleClick);
    });
});







function handleClick(event) {
    event.preventDefault();
    let floaters = document.querySelectorAll('.floaterCircle')
    floaters.forEach((flo) => {
        flo.remove()
    })
    // console.log(event.target.getAttribute('coords').split(','))
    let xCoord = event.target.getAttribute('coords').split(',')[0];
    let yCoord = event.target.getAttribute('coords').split(',')[1];

    //   console.log('x: ' + xCoord)
    // console.log('y: ' + yCoord)
    //add new circle
    let floater = document.createElement('div')
    floater.textContent = event.target.getAttribute('alt')
    floater.classList.add('floaterCircle')
    floater.classList.add(`number--${event.target.getAttribute('country')}`)
    floater.style.left = `${parseInt(xCoord) + 65}px`;
    floater.style.top = `${yCoord}px`;
    document.querySelector('.caucasus').appendChild(floater)


    const clickedNumber = event.target.getAttribute('alt');
    const N = parseInt(clickedNumber) - 1;
    //   console.log(N)
    const divsWithNumber = document.querySelectorAll('.bottom-left-logo');
    //   console.log(divsWithNumber)




    const country = event.target.getAttribute('country');
    // console.log(divsWithNumber)
    divsWithNumber.forEach(div => {
        //  console.log(div.parentNode.parentNode.parentNode)
        div.parentNode.parentNode.parentNode.classList.remove('activated', 'activated--right', 'activated--left');
    });
    const filteredDivs = document.querySelectorAll(`span.number--${country}`);
    // console.log(filteredDivs)
    filteredDivs.forEach((div, index) => {
        const number = parseInt(div.innerText.trim()) - 1;
        //  console.log(number)
        if (country == 'georgia' && number == N) {

            div.parentNode.parentNode.parentNode.classList.add('activated', 'activated--left');
        } else {
            if (number == N) {
                div.parentNode.parentNode.parentNode.classList.add('activated', 'activated--right');
            }
        }

    });

}


const areas = document.querySelectorAll('area');
areas.forEach(area => {
    area.addEventListener('click', handleClick);
});



function updateTimes() {
    const georgiaTime = new Date();
    georgiaTime.setUTCHours(georgiaTime.getUTCHours() + 0);

    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formattedTimeGeorgia = georgiaTime.toLocaleDateString('en-US', options);

    document.getElementById('georgian-time').textContent = formattedTimeGeorgia;
    document.getElementById('armenian-time').textContent = formattedTimeGeorgia;
    document.getElementById('azerbaijan-time').textContent = formattedTimeGeorgia;




    const currentDate = new Date();


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();


    const formattedDate = `${year}, ${month} ${day}, ${hours}:${minutes}`;
    // console.log(formattedDate)
    document.querySelector('.full-date').textContent = formattedDate
    setTimeout(updateTimes, 60000);
}


updateTimes();






if (window.innerWidth < 992) {
    let burgerbtn = document.querySelector('.burger-button')
    let nav = document.querySelector('.site-navigation')
    let navHeight = document.querySelector('.site-menu').clientHeight
    let innerMenus = document.querySelectorAll('header .site-menu .menu-item')
    let entireHeight = 0;
    if (burgerbtn) {
        burgerbtn.addEventListener('click', function () {
            nav.classList.toggle('dropped')
            if (nav.classList.contains('dropped')) {

                nav.style.height = `${navHeight}px`;
                entireHeight = navHeight;
            } else {
                nav.style.height = `0`;
                entireHeight = 0;
            }
            innerMenus.forEach((menu) => {
                if (menu.innerHTML.includes('dropdown__content')) {
                    menu.classList.add('withDropdown')
                }
                menu.addEventListener('click', function () {
                    menu.classList.toggle('inner--dropped')
                    let dropdown = menu.querySelector('.dropdown__content');
                    let dropdownUL = dropdown.querySelector('ul');

                    // Check if the dropdown is currently visible
                    let computedStyles = window.getComputedStyle(dropdown);
                    let isDropdownVisible = computedStyles.maxHeight !== '0px';

                    // Toggle the visibility of the dropdown
                    if (isDropdownVisible) {
                        dropdown.style.maxHeight = '0px';
                        nav.style.height = `${navHeight}px`; // Assuming navHeight is the original height
                    } else {
                        dropdown.style.maxHeight = `${dropdownUL.clientHeight}px`;
                        nav.style.height = `${navHeight + dropdownUL.clientHeight}px`;
                    }
                });
            });
        })
    }

}















