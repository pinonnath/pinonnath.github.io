/* Navigation Menu */

(() =>{
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect(){
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() =>{
      document.querySelector(".fade-out-effect").classList.remove("active");
    },300)
  }

  // Attach an Event Handler to document
  document.addEventListener("click", (event) =>{
    if(event.target.classList.contains('link-item')){
      /* Make sure event.target.hash has a value before overriding default behaviour */
      if(event.target.hash !==""){
        // prevent default anchor click behaviour
        event.preventDefault();
        const hash = event.target.hash;

        // deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        //Activate New 'Section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        //Deactivate Existing active Navigation menu 'link-item
        document.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
        document.querySelector(".active").classList.remove("active","inner-shadow");

        /* If clicked 'link-item is contained withing the navigation Menu */
        if(navMenu.classList.contains("open")){

          //Activate New Navigation Menu 'link-item'
          event.target.classList.add("active","inner-shadow");
          event.target.classList.remove("outer-shadow","hover-in-shadow");

          // Hide Navigation Menu
          hideNavMenu();

        }
        else{
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) =>{
            if(hash === item.hash){
              //Activate new navigation menu 'Link-item'
              item.classList.add("active","inner-shadow");
              item.classList.remove("outer-shadow","hover-in-shadow");
            }
          })
          fadeOutEffect();
        }
        // add hash (#) to url
        window.location.hash = hash;

      }
    }
    
  })
})();


/* About Section Tabs */
(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{
        /* If Event target contains 'tab-item' class and not contains 'active' class */
        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")){
          const target = event.target.getAttribute("data-target");

          /* deactivate existing active 'tab-item' */
          tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");

          /* Activate New 'Tab item' */
          event.target.classList.add("active","outer-shadow");

          /* deactivate existing active 'tab-content' */
          aboutSection.querySelector(".tab-content.active").classList.remove("active");

          /* Activate New 'Tab Content' */
          aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle(){
  document.body.classList.toggle("hidden-scrolling");
}
/* Portfolio Filter And Popup */
(() =>{

  const filterContainer = document.querySelector(".portfolio-filter"),
  portfolioItemsContainer = document.querySelector(".portfolio-items"),
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  popup = document.querySelector(".portfolio-popup"),
  prevBtn = popup.querySelector(".pp-prev"),
  nextBtn = popup.querySelector(".pp-next"),
  closeBtn = popup.querySelector(".pp-close"),
  projectDetailsContainer = popup.querySelector(".pp-details"),
  projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /* Filter Portfolio Item */
  filterContainer.addEventListener("click", (event)=> {
    if(event.target.classList.contains("filter-item") &&
    !event.target.classList.contains("active")){
      /* deactivate existing active 'filter-item' */
      filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
      /* Activate new 'filter-item' */
      event.target.classList.add("active","outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) =>{
        if(target === item.getAttribute("data-category") || target ==='all' ){
          item.classList.remove("hide");
          item.classList.add("show");
        }
        else{
          item.classList.remove("show");
          item.classList.add("hide");
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) =>{
    if(event.target.closest(".portfolio-item-inner")){
      const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
      /* Get portfolioItem Index */
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem);
      screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
      /* Convert Screenshots into array */
      screenshots = screenshots.split(",");
      if(screenshots.length === 1){
        prevBtn.style.display="none";
        nextBtn.style.display="none";
      }
      else{
        prevBtn.style.display="block";
        nextBtn.style.display="block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  })

  closeBtn.addEventListener("click", ()=>{
    popupToggle();
    if(projectDetailsContainer.classList.contains("active")){
      popupDetailsToggle();
    }
  })

  function popupToggle(){
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow(){
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    /* Activate Loader Until the popupImg loaded*/
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      /* Deactivate loader after the popupImg loaded */
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
  }

  /* Next Slide */
  nextBtn.addEventListener("click", () => {
    if(slideIndex === screenshots.length-1){
      slideIndex = 0;
    }
    else{
      slideIndex++;
    }
    popupSlideshow();
  })

  /* Prev Slide */
  prevBtn.addEventListener("click", () =>{
    if(slideIndex === 0){
      slideIndex = screenshots.length-1;
    }
    else{
      slideIndex--;
    }
    popupSlideshow();
  })

  function popupDetails(){
    // if portfolio-item-details not exists
    if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
      projectDetailsBtn.style.display="none";
      return; /* End Function Execution */
    }
    projectDetailsBtn.style.display="block";
    /* Get the project Details */
    const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    /* Set the project details */
    popup.querySelector(".pp-project-details").innerHTML = details;
    /* Get the project title */
    const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    /* set the project title */
    popup.querySelector(".pp-title h2").innerHTML = title;
    /* Get the project category */
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    /* Set the project category */
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

  projectDetailsBtn.addEventListener("click",() =>{
    popupDetailsToggle();
  })

  function popupDetailsToggle(){
    if(projectDetailsContainer.classList.contains("active")){
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 +"px";
    }
    else{
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
  }
})();

/* Testiomonai Slider */
(() =>{
  const sliderContainer = document.querySelector(".testi-slider-container"),
  slides = sliderContainer.querySelectorAll(".testi-item"),
  slideWidth = sliderContainer.offsetWidth,
  prevBtn = document.querySelector(".testi-slider-nav .prev"),
  nextBtn = document.querySelector(".testi-slider-nav .next");
  activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

  /* Set Width of all Slides */
  slides.forEach((slide) =>{
    slide.style.width = slideWidth + "px";
  })

  /* Set Width for slider container */
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () =>{
    if(slideIndex === slides.length-1){
      slideIndex = 0;
    }
    else{
      slideIndex++;
    }
    slider();
  })

  prevBtn.addEventListener("click", () =>{
    if(slideIndex === 0){
      slideIndex = slides.length-1;
    }
    else{
      slideIndex--;
    }
    slider();

  })

  function slider(){
    /* Deactivate Existing Active Slides */
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    /* Activate New Slide */
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
  }
  slider();

})();


/* Hide all sections except active */

(() =>{
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if(!section.classList.contains("active")){
      section.classList.add("hide");
    }
  })
})();


window.addEventListener("load", ()=> {
  //preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() =>{
  document.querySelector(".preloader").style.display="none";
  }, 600)
})



/* For Form Submission */

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.innerHTML = "Thanks for your Response!";
        document.querySelector("#status").classList.add("success");
        form.reset()
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
        document.querySelector("#status").classList.add("error");
      });
    }
    form.addEventListener("submit", handleSubmit)