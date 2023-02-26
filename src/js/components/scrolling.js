const scrolling = () => {
    let links = document.querySelectorAll('[href^="#"]');
    let speed = 0.2;
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const upBtn = document.querySelector('.arrow-up__btn');
            if (window.innerWidth > 768) {
                upBtn.setAttribute('href', '#top-info');
            } else {
                upBtn.setAttribute('href', '#header');
            }
            e.preventDefault;
            let widthTop = document.documentElement.scrollTop;
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }
                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) :
                    Math.min(widthTop + progress / speed, widthTop + toBlock));
                document.documentElement.scrollTo(0, r);
                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
};

export default scrolling;
