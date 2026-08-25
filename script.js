/* =========================================================
   DR. R.K. GUPTA — INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------------
       MOBILE MENU
    ------------------------------------------------------- */

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");
            menuButton.classList.toggle("active");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("mobile-open");
                menuButton.classList.remove("active");
            });

        });
    }


    /* -------------------------------------------------------
       NAVBAR SHADOW ON SCROLL
    ------------------------------------------------------- */

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    /* -------------------------------------------------------
       SCROLL REVEAL
    ------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".section-label, .section-heading, .about-text, " +
        ".services-header, .service-card, .reviews-heading, " +
        ".appointment-content, .appointment-card, .contact-box"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* -------------------------------------------------------
       SERVICE CARD STAGGER
    ------------------------------------------------------- */

    document.querySelectorAll(".service-card").forEach((card, index) => {

        card.style.transitionDelay = `${index * 80}ms`;

    });


    /* -------------------------------------------------------
       HERO CARD MOUSE MOVEMENT
       VERY SUBTLE — NOT AI-GIMMICKY
    ------------------------------------------------------- */

    const doctorCard = document.querySelector(".doctor-card");

    if (doctorCard && window.innerWidth > 900) {

        doctorCard.addEventListener("mousemove", event => {

            const rect = doctorCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -2;

            const rotateY =
                ((x / rect.width) - 0.5) * 2;

            doctorCard.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-3px)`;

        });


        doctorCard.addEventListener("mouseleave", () => {

            doctorCard.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";

        });

    }


    /* -------------------------------------------------------
       CURRENT YEAR
    ------------------------------------------------------- */

    const year = document.querySelector(".footer-right span");

    if (year) {

        year.textContent =
            `© ${new Date().getFullYear()} Dr. R.K. Gupta`;

    }
/* -------------------------------------------------------
   APPOINTMENT FORM → WHATSAPP
------------------------------------------------------- */

const appointmentForm =
    document.querySelector("#appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.querySelector("#patientName").value.trim();

        const phone =
            document.querySelector("#patientPhone").value.trim();

        const date =
            document.querySelector("#visitDate").value;

        const message =
            document.querySelector("#message").value.trim();


        const whatsappMessage =
`Hello, I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Preferred date: ${date || "Not specified"}

Message:
${message || "No additional message."}`;


        const whatsappURL =
            `https://wa.me/919331926111?text=${encodeURIComponent(whatsappMessage)}`;


        window.open(whatsappURL, "_blank");

    });

}
});