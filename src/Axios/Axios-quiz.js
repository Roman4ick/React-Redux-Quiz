import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-65ad7-default-rtdb.europe-west1.firebasedatabase.app/'
})