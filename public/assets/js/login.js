let emailSelector = document.querySelector('#email');
let passwordSelector = document.querySelector('#password');
const submit = document.querySelector('.button');

submit.addEventListener('click', (e) => {
    e.preventDefault(); //prevents loading to /home

    let email = emailSelector.value.toLowerCase();
    let password = passwordSelector.value;

    axios({
        method: 'post',
        url: '/api/users/login',
        data: {
            email,
            password,
        },
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error)
            alert('There was an error processing your request, please refresh the page to try again')
        });
});
