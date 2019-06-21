// console.log('client side js is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then(({ address, location: place, temp, precip, error } = {}) => {
        if (error) {
            messageOne.textContent = error;
            return console.log(error);
        }
        // console.log(`Address input: ${address}`)
        // console.log(`The temp for ${place} is ${temp} with a precipitation of ${precip}%`);
        messageOne.textContent = `Address input: ${address}`;
        messageTwo.textContent = `The temperature for ${place} is ${temp} with a ${precip}% chance of rain`;
    })
})
})









// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });