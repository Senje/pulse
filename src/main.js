document.addEventListener('DOMContentLoaded', () => {
    let $form = document.querySelector('.consultation__form');

    $form.addEventListener('submit', function (event) {
        alert('Your message was recived!');
        fetch('mail.json'), {
            method: get
        }
        event.preventDefault();
    });

    $(document).ready(function(){
        $('.carousel__inner').slick({
            infinite: true,
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev"><img src="../assets/img/arrow-left.png" alt="arrow-left"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="../assets/img/arrow-right.png" alt="arrow-right"></button>',
        });
      });
});