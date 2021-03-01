let firstName = document.querySelector('#fname');
let lastName = document.querySelector('#lname');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
const submit = document.querySelector('.button');

submit.addEventListener('click', (e) => {
    e.preventDefault(); //prevents loading to /home

    firstName = firstName.value;
    lastName = lastName.value;
    
    let name = `${firstName} ${lastName}`.trim();
    email = email.value;
    password = password.value;

    axios({
        method: 'post',
        url: '/api/users/create',
        data: {
            name,
            email,
            password,
        },
    })
        .then(function (response) {
            console.log(response);
            window.location.replace('/home')
        })
        .catch(function (error) {
            console.log(error);
            alert('There was an error processing your request, please refresh the page to try again')
        });
});
