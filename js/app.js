// Define Global Variables

// getting all sections in the document
let sections = Array.from(document.querySelectorAll("section"));
// button to add sections dynamically
let addSectionButton = document.createElement("button");
// getting the wrapper of list items which is <ul></ul>
let navList = document.querySelector("#navbar__list");
// getting the hamburger button used for making the navmenue responsive
let hamburger = document.querySelector(".hamburger");
// fetching the menu anchors
let navItems = Array.from(document.querySelectorAll("#navbar__list ul li"));
// End Global Variables

// Start Helper Functions

// setup a function to get the current active section
function getCurrentActive(sections) {
  let active = null;
  sections.forEach((section) => {
    if (section.classList.contains("active")) {
      active = section;
    }
  });
  return active;
}

// setup a function to create a new section
function createSection() {
  let section = document.createElement("section");
  section.setAttribute("id", `section${sections.length + 1}`);
  section.setAttribute("data-nav", `section ${sections.length + 1}`);
  section.innerHTML = `<div class='landing__container'><h2>${section.getAttribute(
    "data-nav"
  )}</h2><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod. </p> <p> Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non. </p> </div>`;
  document.querySelector("main").appendChild(section);
  sections.push(section);
  return section;
}

// setup a function to create a list item anchor
function createListItem(id, data) {
  let item = document.createElement("li");
  item.innerHTML = data;
  item.setAttribute("section", id);
  // item.innerHTML = `<a href="#${id}">${data}</a>`; // disable anchor to scroll to the target section
  navItems.push(item);
  return item;
}

// setup a function to determine the current viewport section
function inViewPort(section) {
  const rectangle = section.getBoundingClientRect();
  return (
    rectangle.top >= 0 &&
    rectangle.left >= 0 &&
    rectangle.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rectangle.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// End Helper Functions

// Begin Main Functions

// build the nav
function buildNav(sections) {
  sections.forEach((section) => {
    // create the list item
    let listItem = createListItem(section.id, section.getAttribute("data-nav"));
    // append the list item to the wrapper <ul></ul>
    navList.appendChild(listItem);
  });
}
buildNav(sections);
// End Main Functions

// Begin Events

// Add class 'active' to section when near top of viewport
window.addEventListener("scroll", () => {
  // if the section is in the viewport, then it's active
  sections.forEach((section) => {
    if (inViewPort(section)) {
      // remove the active from the current class
      getCurrentActive(sections).classList.remove("active");
      // add the active to the one that appeared in its full height
      section.classList.add("active");
      let items = document.querySelectorAll("li");
      items.forEach((item) => {
        item.classList.remove("active");
        if (item.innerText.includes(section.getAttribute("data-nav"))) {
          item.classList.add("active");
        }
      });
    }
  });
});

// making the button creates new sections
document.querySelector(".btn").addEventListener("click", () => {
  let section = createSection();
  let item = createListItem(section.id, section.getAttribute("data-nav"));
  navList.appendChild(item);
});

// Scroll to anchor ID using scrollTO event

document.querySelector("#up").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// scroll into instead of scrolling by anchor IDs

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    let sectionTd = "#" + item.getAttribute("section");
    let section = document.querySelector(sectionTd);
    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
});
// responsinve nave menue
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("show");
  navList.classList.toggle("show");
});
// remove the classes after any anchor is clicked
navItems.forEach((item) =>
  item.addEventListener("click", () => {
    navItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    // hamburger.classList.remove("show");
    // navList.classList.remove("show");
  })
);
