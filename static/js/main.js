window.onGatsbyRouteUpdate = function() {
// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

// Mobile menu
var menuToggle = document.querySelectorAll('.menu-toggle');
var menuToggleThemes = document.querySelectorAll('.menu-toggle-themes');
console.log(menuToggleThemes)
for (var i = 0; i < menuToggle.length; i++) {
  menuToggle[i].addEventListener('click', function(e){
    document.body.classList.toggle('menu--opened');
    e.preventDefault();
  },false);
}

for (var i = 0; i < menuToggleThemes.length; i++) {
  menuToggleThemes[i].addEventListener('click', function(e){
    console.log('click triggered registered');
    document.body.classList.toggle('menu--opened-themes');
    e.preventDefault();
  },false);
}

document.body.classList.remove('menu--opened');
document.body.classList.remove('menu--opened-themes');

window.addEventListener('resize', function () {  
  if (menuToggle[0].offsetParent === null) {
    document.body.classList.remove('menu--opened');
  }
}, true);

window.addEventListener('resize', function () {  
  if (menuToggleThemes[0].offsetParent === null) {
    document.body.classList.remove('menu--opened-themes');
  }
}, true);

// Accordion
var faqAccordions = document.querySelectorAll('.handorgel');
Array.from(faqAccordions).forEach((faqAccordion) => {
  var accordion = new handorgel(faqAccordion, {
    multiSelectable: true
  });
});
};
