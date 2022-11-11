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