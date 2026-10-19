
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuBtn.classList.toggle("open", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const darkModeToggle = document.getElementById("darkModeToggle");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

darkModeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  iconSun.style.display = isDark ? "none" : "block";
  iconMoon.style.display = isDark ? "block" : "none";
});

const typingTarget = document.getElementById("typingTarget");
const typingWords = ["Web Developer", "IT Student", "UI/UX Designer", "Systems Developer"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    charIndex++;
    typingTarget.textContent = currentWord.slice(0, charIndex);
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typingTarget.textContent = currentWord.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 110);
}
typeLoop();

const skillGroups = [
  {
    category: "Programming & Development",
    icon: "M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "PHP", "SQL"]
  },
  {
    category: "Frameworks & Libraries",
    icon: "M3 5h18M3 5v14h18V5M8 12l2 2-2 2M14 16h2",
    items: ["ReactJS", "Angular", "Node.js", "Express"]
  },
  {
    category: "Database & Backend",
    icon: "M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2zM4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6M4 12c0 1.1 3.6 2 8 2s8-.9 8-2",
    items: ["MongoDB", "MySQL", "Firebase", "JWT Authentication"]
  },
  {
    category: "Tools & Platforms",
    icon: "M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4l1.3 1.3 6.3-6.3a1 1 0 011.4 0zM19 12a7 7 0 11-3.5-6.06",
    items: ["Git/GitHub", "Visual Studio 2022", "Visual Studio Code", "Android Studio", "Figma", "Canva"]
  },
  {
    category: "Core Competencies",
    icon: "M12 2l2.4 5 5.6.8-4 4 1 5.6L12 15l-5 2.4 1-5.6-4-4 5.6-.8z",
    items: ["UI/UX Design", "System Development", "Responsive Web Design", "CRUD System Implementation", "Basic Database Design", "Debugging & Troubleshooting", "Role-Based Access Control"]
  },
  {
    category: "Web Technologies",
    icon: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z",
    items: ["HTML", "CSS"]
  },
  {
    category: "Soft Skills",
    icon: "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z",
    items: ["Leadership", "Problem-Solving", "Team Collaboration", "Time Management", "Adaptability", "Initiative"]
  }
];

const skillGrid = document.getElementById("skillGrid");
skillGroups.forEach((group, i) => {
  const card = document.createElement("div");
  const accent = i % 2 === 0 ? "accent-pink" : "accent-sage";
  card.className = `skill-card ${accent}`;
  card.style.setProperty("--reveal-delay", `${i * 70}ms`);
  card.innerHTML = `
    <div class="skill-card-head">
      <span class="skill-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="${group.icon}"></path>
        </svg>
      </span>
      <span class="skill-name">${group.category}</span>
      <span class="skill-count">${group.items.length}</span>
    </div>
    <div class="skill-pills">
      ${group.items.map(item => `<span class="skill-pill">${item}</span>`).join("")}
    </div>
  `;
  skillGrid.appendChild(card);
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("#skillGrid .skill-card").forEach(card => skillObserver.observe(card));

const projects = [
  {
    title: "CZAMS",
    summary: "Led a team of three in developing a full-stack web application for an aircon services company covering customer booking, down payments, and service tracking, while handling client requirements gathering and building the customer-side modules using React, Node.js, Express, MongoDB, and JWT.",
    subtitle: "Cooling Zone Aircon Management System",
    year: "Capstone, 2026",
    tag: "Project Leader",
    role: "Project Leader and Developer · Team of 3",
    situation: "An aircon services company managed bookings, down payments, and service tracking manually, which led to double-booked slots, scattered payment proofs, and no clear record of jobs or warranty claims.",
    task: "Lead the team, gather client requirements, and build the customer-side modules of a full-stack web application, from booking through payment, service reports, and warranty claims.",
    action: "Led a team of 3, conducted requirements gathering with the client, and built the customer-side modules using React, Node.js, Express, MongoDB, and JWT authentication. Coordinated reviews and ran structured audits of each user role against the project paper, then fixed the findings in tested batches.",
    result: "In progress. Core booking and payment modules are working and tested on desktop and mobile, with a double-booking race condition found and fixed. Deployment and user evaluation are underway.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"]
  },
  {
    title: "GovAssist",
    summary: "Developed a full-stack web application centralizing verified government directories, step-by-step service guides, scam protection tools, and emergency response information using React, PHP, SQL, and Firebase.",
    subtitle: "Centralized Government Directory Web Platform",
    year: "2025",
    tag: "Web Developer",
    role: "Web Developer · Team of 2",
    situation: "Many citizens struggle to access verified government websites, service guides, and scam alerts due to scattered and unreliable information sources.",
    task: "Develop a centralized web platform providing verified government directories, step-by-step service guides, scam protection tools, and emergency response information.",
    action: "Built a full-stack application using React, PHP, SQL, and Firebase; implemented CRUD-based directory management, branch-specific office details, structured guides for common services, scam verification and reporting features, and emergency hotline modules.",
    result: "Delivered a centralized assistance platform that improved accessibility to official government services, reduced misinformation risks, and streamlined public service guidance.",
    stack: ["React", "PHP", "SQL", "Firebase"]
  },
  {
    title: "Mobile Loan System Calculator",
    summary: "Built a role-based mobile loan system implementing structured financial computation logic, database integration, authentication, and error handling using Java and Android Studio.",
    subtitle: "Android Loan Computation App",
    year: "2025",
    tag: "Mobile App Developer",
    role: "Mobile App Developer · Team of 3",
    situation: "A cooperative required a mobile-based system capable of handling multiple loan types with structured interest rate rules and approval workflows.",
    task: "Develop a functional Android application supporting member registration, loan computation, and role-based user and admin access.",
    action: "Implemented financial computation logic in a separate Java class, built authentication and database integration, designed a GUI with a navigation drawer, and applied structured error handling.",
    result: "Delivered a functional mobile loan system capable of calculating interest, service charges, take-home loan values, and monthly amortization with role-based control.",
    stack: ["Java", "Android Studio", "SQL"]
  },
  {
    title: "TechLib",
    summary: "Developed a role-based desktop system for laboratory equipment inventory and transaction tracking using C# with structured database integration.",
    subtitle: "Laboratory Equipment Management System",
    year: "2025",
    tag: "Systems Developer",
    role: "Systems Developer · Team of 2",
    situation: "Laboratory equipment borrowing lacked structured monitoring, user tracking, and role-based access control.",
    task: "Develop a desktop-based system to manage equipment inventory, borrowing/return transactions, and user records with Admin and User roles.",
    action: "Designed a database structure with 30+ student records, implemented an Admin module (equipment management, account management, record viewing, password recovery), a borrowing/return module with timestamp tracking, and role-based access using MDI Forms in C#.",
    result: "Delivered a structured laboratory management system, improving inventory control, transaction logging, and access security.",
    stack: ["C#", "MySQL", "MDI Forms"]
  },
  {
    title: "Medical Application UI/UX Case Study",
    summary: "Designed an elderly-friendly healthcare mobile interface prototype in Figma applying accessibility and usability principles.",
    subtitle: "Accessible Healthcare Mobile Interface",
    year: "2024",
    tag: "Frontend Designer",
    role: "Frontend Designer · Team of 4",
    situation: "Elderly users often struggle with complex mobile healthcare interfaces.",
    task: "Design an accessible and user-friendly healthcare mobile interface tailored for elderly users.",
    action: "Created high-fidelity prototypes in Figma, applying accessibility standards, simplified navigation, and usability principles.",
    result: "Produced an intuitive mobile interface prototype optimized for readability and ease of use.",
    stack: ["Figma", "UI/UX Design"]
  }
];

const projectList = document.getElementById("projectList");
const modal = document.getElementById("projectModal");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalYearRole = document.getElementById("modalYearRole");
const modalSituation = document.getElementById("modalSituation");
const modalTask = document.getElementById("modalTask");
const modalAction = document.getElementById("modalAction");
const modalResult = document.getElementById("modalResult");
const modalStack = document.getElementById("modalStack");
const modalClose = document.getElementById("modalClose");

projects.forEach((p, i) => {
  const card = document.createElement("div");
  const accent = i % 2 === 0 ? "accent-pink" : "accent-sage";
  card.className = `project-card ${accent}`;
  card.innerHTML = `
    <span class="tag">${p.tag}</span>
    <h3>${p.title}</h3>
    <p class="project-subtitle">${p.subtitle} · ${p.year}</p>
    <p>${p.summary}</p>
    <div class="card-hint">view details →</div>
  `;
  card.addEventListener("click", () => openModal(i));
  projectList.appendChild(card);
});

function openModal(index) {
  const p = projects[index];
  modalTag.textContent = p.tag;
  modalTitle.textContent = `${p.title} — ${p.subtitle}`;
  modalYearRole.textContent = `${p.role} · ${p.year}`;
  modalSituation.textContent = p.situation;
  modalTask.textContent = p.task;
  modalAction.textContent = p.action;
  modalResult.textContent = p.result;
  modalStack.innerHTML = p.stack.map(t => `<span>${t}</span>`).join("");
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

const experience = [
  {
    title: "Director of Treasury",
    org: "Information Technology Program Council",
    dates: "2025 – 2026",
    points: [
      "Manage financial records and transaction documentation",
      "Monitor inflow and outflow of organizational funds",
      "Ensure structured and accountable financial reporting"
    ]
  },
  {
    title: "Small Business Owner",
    org: "Maart.Chich",
    dates: "2021 – 2025",
    points: [
      "Founded and independently managed a handmade product brand",
      "Oversaw product design, marketing, customer transactions, and logistics",
      "Participated in university bazaars and managed end-to-end operations independently"
    ]
  }
];

const experienceList = document.getElementById("experienceList");
experience.forEach(e => {
  const item = document.createElement("div");
  item.className = "experience-item";
  item.innerHTML = `
    <div class="experience-head">
      <div>
        <h3>${e.title}</h3>
        <p class="experience-org">${e.org}</p>
      </div>
      <span class="experience-dates">${e.dates}</span>
    </div>
    <ul>${e.points.map(pt => `<li>${pt}</li>`).join("")}</ul>
  `;
  experienceList.appendChild(item);
});

/* ---------- 7. Form Validation ---------- */
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMsg = document.getElementById("formMsg");

// Paste your Google Apps Script Web App URL here (see google-apps-script.gs)
const SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw0vYlPBjrr2qStqvITmmuW-0HYR-_z4Ui-SnluGMYP8MKlGPg7KXBV_8KORgXOZooABA/exec";

function setError(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  const field = input.closest(".field");
  if (message) {
    errorEl.textContent = message;
    field.classList.add("invalid");
  } else {
    errorEl.textContent = "";
    field.classList.remove("invalid");
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();

  let valid = true;

  if (nameInput.value.trim().length < 2) {
    setError(nameInput, "nameError", "please enter your name");
    valid = false;
  } else {
    setError(nameInput, "nameError", "");
  }

  if (!isValidEmail(emailInput.value.trim())) {
    setError(emailInput, "emailError", "please enter a valid email");
    valid = false;
  } else {
    setError(emailInput, "emailError", "");
  }

  if (messageInput.value.trim().length < 10) {
    setError(messageInput, "messageError", "message should be at least 10 characters");
    valid = false;
  } else {
    setError(messageInput, "messageError", "");
  }

  if (valid) {
    const submitBtn = contactForm.querySelector("button[type=submit]");
    if (submitBtn) submitBtn.disabled = true;
    formMsg.textContent = "Sending...";
    formMsg.className = "form-msg";

    const body = new URLSearchParams({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    });

    // no-cors: Apps Script doesn't send CORS headers, so the response is opaque
    fetch(SHEET_WEB_APP_URL, { method: "POST", mode: "no-cors", body })
      .then(() => {
        formMsg.textContent = "Message sent successfully. I'll get back to you soon.";
        formMsg.className = "form-msg success";
        contactForm.reset();
      })
      .catch(() => {
        formMsg.textContent = "Something went wrong. Please try again later.";
        formMsg.className = "form-msg fail";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  } else {
    formMsg.textContent = "Please fix the highlighted fields.";
    formMsg.className = "form-msg fail";
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const scrollFill = document.getElementById("scrollFill");
const backToTop = document.getElementById("backToTop");

function onScroll() {
  let current = sections[0] ? sections[0].id : "";
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollFill.style.width = `${progress}%`;

  backToTop.classList.toggle("show", scrollTop > 400);
}

window.addEventListener("scroll", onScroll);
onScroll();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});