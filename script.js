const skills = [
  {
    category: "Data & business",
    items: [
      "Data analysis",
      "Accounting",
      "Microsoft Excel",
      "Microsoft Office",
      "Power Query",
      "Power BI",
    ],
  },
  {
    category: "Programming & development",
    items: ["Python", "JavaScript", "HTML", "CSS", "SQL", "React", "Next.js"],
  },
  {
    category: "Professional skills",
    items: ["Communication", "Problem-solving"],
  },
];
const services = [
  {
    icon: "⌁",
    title: "Website development",
    copy: "Modern, responsive, user-friendly websites and web applications designed around real people and real business goals.",
    items: [
      "Responsive website development",
      "Front-end development",
      "Interactive web interfaces",
      "Business websites",
      "Web application development",
    ],
  },
  {
    icon: "▦",
    title: "Data analysis",
    copy: "Turning raw information into useful insights that make business decisions clearer, faster, and more confident.",
    items: [
      "Data cleaning",
      "Data analysis",
      "Excel-based analysis",
      "SQL data analysis",
      "Reports and dashboards",
      "Business-focused data insights",
    ],
  },
];
const skillsList = document.querySelector("#skills-list");
skillsList.innerHTML = skills
  .flatMap((group) =>
    group.items.map(
      (skill, index) =>
        `<article class="skill-card"><small>${String(index + 1).padStart(2, "0")} / ${group.category}</small><h3>${skill}</h3><p>Hands-on learning in progress.</p></article>`,
    ),
  )
  .join("");
document.querySelector("#services-list").innerHTML = services
  .map(
    (service) =>
      `<article class="service-card"><span class="service-icon">${service.icon}</span><h3>${service.title}</h3><p>${service.copy}</p><ul>${service.items.map((item) => `<li>${item}</li>`).join("")}</ul></article>`,
  )
  .join("");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
document
  .querySelectorAll(".nav-link")
  .forEach((link) =>
    link.addEventListener("click", () => navMenu.classList.remove("open")),
  );
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      }
    }),
  { rootMargin: "-35% 0px -55% 0px" },
);
sections.forEach((section) => sectionObserver.observe(section));
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("vivek-theme");
if (storedTheme === "light") document.body.classList.add("light");
function updateThemeLabel() {
  const light = document.body.classList.contains("light");
  themeToggle.querySelector(".theme-label").textContent = light
    ? "Dark mode"
    : "Light mode";
  themeToggle.setAttribute(
    "aria-label",
    light ? "Switch to dark mode" : "Switch to light mode",
  );
}
updateThemeLabel();
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "vivek-theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
  updateThemeLabel();
});

const emailjsConfig = {
  publicKey: "9zrupuw0itsN6zN38",
  serviceId: "service_flnthnb",
  templateId: "template_bp8ds3q",
};
const form = document.querySelector("#contact-form");
const status = form.querySelector(".form-status");
const submitButton = form.querySelector('button[type="submit"]');
function setFormStatus(message, state = "") {
  status.textContent = message;
  status.classList.remove("success", "error");
  if (state) status.classList.add(state);
}
const emailjsReady =
  window.emailjs &&
  !Object.values(emailjsConfig).some((value) => value.startsWith("YOUR_"));

if (emailjsReady) window.emailjs.init({ publicKey: emailjsConfig.publicKey });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = String(data.get("email"));
  if (!data.get("name") || !data.get("message") || !email.includes("@")) {
    setFormStatus("Please complete each field with valid details.", "error");
    return;
  }

  if (window.location.protocol === "file:") {
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${email}\n\n${data.get("message")}`,
    );
    setFormStatus("Opening your email app to send the message.", "success");
    window.location.href = `mailto:vivekmagar700@gmail.com?subject=${subject}&body=${body}`;
    return;
  }

  if (!emailjsReady) {
    setFormStatus("Email service is not configured yet.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "...";
  setFormStatus("Sending your message...");

  try {
    await window.emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      {
        name: data.get("name"),
        email,
        message: data.get("message"),
        reply_to: email,
      },
    );
    setFormStatus("Thanks, Vivek will be in touch soon.", "success");
    form.reset();
  } catch (error) {
    const errorMessage = String(error?.text || error?.message || "");
    const templateMissing =
      error?.status === 400 && errorMessage.toLowerCase().includes("template");
    setFormStatus(
      templateMissing
        ? "Email template not found. Please email me directly."
        : "Something went wrong while sending. Please email me directly.",
      "error",
    );
    console.error("EmailJS submission failed", error);
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "↗";
  }
});
const glow = document.querySelector(".cursor-glow");
window.addEventListener(
  "pointermove",
  (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  },
  { passive: true },
);

