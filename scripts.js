let slideIndex = 1;
let slideInterval;


window.onload = function() {
    showSlides(slideIndex);  // when the page loads ->> show first slide
    startTimer();
  };
  
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer(); 
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}


function showSlides(n) {
 
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

function startTimer() {
  slideInterval = setInterval(() => {
    showSlides(slideIndex += 1);
  }, 3000); // Change every3seconds
}
function resetTimer() {
  // Clear the  interval 
  clearInterval(slideInterval);
  startTimer();
}

window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('header').classList.add('hover-active');
    document.querySelector('header').style.pointerEvents = 'auto';
  }, 2600); 
});

window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.inst-icon').classList.add('hover-active');
    document.querySelector('.inst-icon').style.pointerEvents = 'auto';
  }, 2600); 
});

window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelector('.youtube-icon').classList.add('hover-active');
    document.querySelector('.youtube-icon').style.pointerEvents = 'auto';
  }, 2600); 
});

