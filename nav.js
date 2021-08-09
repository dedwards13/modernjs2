Array.from(document.querySelectorAll(".hover"), function (el) {
    el.addEventListener("mousemove", function (e) {
        el.style.setProperty("--px", e.clientX - el.offsetLeft);
        el.style.setProperty("--py", e.clientY - el.offsetTop);
    });
});