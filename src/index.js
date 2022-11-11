import Notiflix from 'notiflix';
import axios from "axios";
axios.get('/users')
  .then(res => {
    console.log(res.data);
  });

 

  async function getUser() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  //let country = 'germany'
// function test(){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json()).then(data => console.log(data))
// }
// test()
//
// function getData(){
//     fetch('https://rickandmortyapi.com/api/character/?count=30')
//         .then(response => response.json())
//         .then(data => {
//             const {results: dataArray} = data
//             const markup = dataArray.map(item => `
//     <li>
//         <img src=${item.image} alt="">
//         <p>NAME: ${item.name}</p>
//         <p>GENDER: ${item.gender}</p>
//         <p>ID: ${item.id}</p>
//         <p>STATUS: ${item.status}</p>
//         <p>CREATED: ${item.created}</p>
//     </li>
// `).join('')
//             document.querySelector('.characterList').innerHTML += markup
//         })
// }
// getData()