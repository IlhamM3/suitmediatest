import App from '../view/app';
import '../styles/index.scss';

const app = new App({ content: document.getElementById('content') });
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a');

  const activeLinkIndex = sessionStorage.getItem('activeLink');

  if (activeLinkIndex !== null) {
    navLinks[activeLinkIndex].classList.add('active');
  }

  navLinks.forEach((item, index) => {
    item.addEventListener('click', () => {
      navLinks.forEach((menuItem) => {
        menuItem.classList.remove('active');
      });

      item.classList.add('active');

      sessionStorage.setItem('activeLink', index.toString());
    });
  });

  // header scroll action
  let divheader = document.querySelector('header');
  window.addEventListener('scroll', ()=>{
    divheader.classList.toggle("overlay", window.scrollY > 80);
  });
});
