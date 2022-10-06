document.addEventListener('DOMContentLoaded', () => {
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".promo"));

    if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function (lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }

    let $form = document.querySelector('.consultation__form');

    $form.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Your message was recived!');
        fetch('mail.json'), {
            method: get
        }
    });

    let slider = tns({
        container: '.carousel__inner',
        items: 1,
        controlsText: [
            '<img src="./assets/img/arrow-left.png" alt="arrow-left">',
            '<img src="./assets/img/arrow-right.png" alt="arrow-right">'
        ],
        autoplay: true,
        autoplayButtonOutput: false,
        nav: false,
        mouseDrag: true,
    });
});