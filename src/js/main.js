document.addEventListener('DOMContentLoaded', () => {
    let $form = document.querySelector('.consultation__form');

    $form.addEventListener('submit', function (event) {
        alert('meow');
        fetch('mail.json'), {
            method: get
        }
        event.preventDefault();
    });
});