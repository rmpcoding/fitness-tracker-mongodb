let firstName = document.querySelector('#fname');
let lastName = document.querySelector('#lname');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
const submit = document.querySelector('.button');

submit.addEventListener('click', (e) => {
    e.preventDefault(); //prevents loading to /home

    console.log(firstName.value);
    console.log(lastName.value);
    console.log(email.value);
    console.log(password.value);

    firstName = firstName.value;
    lastName = lastName.value;
    
    let name = `${firstName} ${lastName}`;
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
        })
        .catch(function (error) {
            console.log('hi');
            console.log(error);
        });
});
