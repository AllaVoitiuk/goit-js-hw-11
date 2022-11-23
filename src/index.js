import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionDelay: 250});

const API_KEY = '31475177-5e18f0fae26a0bf9f0a41710d';

let refs = {
  form: document.querySelector("#search-form"),
  input: document.getElementsByName("searchQuery"),
  submitBtn: document.querySelector('button'), 
  loadBtn: document.querySelector('.load-more')
}

refs.submitBtn.addEventListener("click", onSubmit);
//console.log("hello");
let counter = 1;
let inputValue = "";
let hitsCount = 0;
let totalHits = 0;

function getData(picName) {
  let URL = "https://pixabay.com/api/?key=" + API_KEY +
  "&q=" + encodeURIComponent(picName) + 
  `&image_type=photo&orientation=horizontal&safesearch=true&page=${counter}&per_page=40`;

  return axios.get(URL);
 
  lightbox.on('show.simplelightbox', function () {
   
  });

}

 function onSubmit(event) {
  event.preventDefault();

  totalHits = 0;
  hitsCount = 0;
  inputValue = refs.input[0].value;
  
  console.log("inputValue: " + inputValue);
  inputValue = inputValue.trim();
  
  document.querySelector('.gallery').innerHTML = "";
  counter = 1;  
  
  getGallery(inputValue);   
}

const galleryContainer = document.querySelector(".photo-card");

async function getGallery(inputValue){

  refs.loadBtn.classList.remove("load-active");

  console.log("getGalery(), counter = " + counter);
  let markupDiv = "";
  
  if(inputValue){

    await getData(inputValue)
    .then(response => {

      if (response.data.hits.length === 0) {
          
        Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      }
      else{
        
        console.log(response.data);        
        
        response.data.hits.forEach(element => {
          
          markupDiv += `<a class="gallery__item" href=${element.largeImageURL}>
          <div class="photo-card">          
          <img src=" ${element.webformatURL}" alt="" loading="lazy" />
          <div class="info">
          <p class="info-item">
            <b>Likes</b> ${element.likes}
          </p>
          <p class="info-item"> 
            <b>Views</b> ${element.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${element.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${element.downloads}
          </p>
          </div>
          </div>
          </a>`;
                          
          //console.log(element.webformatURL);
        });      
        document.querySelector('.gallery').innerHTML += markupDiv;
        counter+=1;

        totalHits = response.data.totalHits;
        if(hitsCount == 0){
          Notiflix.Notify.success(`Hooray! We found ` + totalHits + ` images.`);
        }
        
        hitsCount += 40;
        
        console.log("hitsCount: " + hitsCount);             
        console.log("totalHits: " + totalHits);         

        if(hitsCount <= totalHits){

          console.log("Show button");
          refs.loadBtn.classList.add("load-active");
        } else {
          Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
          console.log(`We're sorry, but you've reached the end of search results.`)
        }
      }
    })    
  }  
  lightbox.refresh();
}

function changeGallery(event){
  getGallery(inputValue);
 
}

// window.addEventListener('scroll', () => {
//   const {scrollHeight, scrollTop, clientHeight} = document.documentElement
//   if(scrollHeight - clientHeight === scrollTop){
//     getData();
//   }
// })

refs.loadBtn.addEventListener('click', changeGallery);

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});


