const form = document.querySelector('form');
const idElem = document.querySelector('.id');
const passwordElem = document.querySelector('.password');
const section = document.querySelector('section');
const result = document.querySelector('.result');

function submitHandler(event) {
    event.preventDefault();

    const id = idElem.value;
    const password = passwordElem.value;

    // console.log(id);
    // console.log(password);

    fetch("http://222.99.189.215:3000/sign-up", {
        // fetch("https://127.0.0.1:3000/sign-up", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
    }).then(response => {
        console.log(response);
        if (response.status === 400) {
            result.textContent = '이미 존재하는 아이디입니다.';
        }
        else {
            form.style.display = 'none';
            result.textContent = '회원가입 완료';
        }
    }).catch(response => {
        console.log(response);
    });
}

form.addEventListener('submit', submitHandler);