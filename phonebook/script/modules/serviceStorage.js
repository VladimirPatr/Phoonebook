// import modulesData from './data.js';

const data = [
  {
    name: 'Корней',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

import modulesCreateElements from './createElements.js';

const {
  addContactData,
  createContainer,
  createHeader,
  createLogo,
  createProposal,
  createMain,
  createFooter,
  createButtonsGroup,
  createTable,
  createForm,
  createRow ,  		
} = modulesCreateElements;



    //функция удаления контакта из localstorage по номуру телефона
    const removeStorage = (tel) => {
        const arrStorage = getStorage('phonebook');
        const reStor = arrStorage.filter(person => person.phone != tel);
         localStorage.setItem('phonebook', JSON.stringify(reStor));
      }
     //функция получения данных из Localstorage по ключу
    const getStorage = (key) => {
      let stor = JSON.parse(localStorage.getItem(key)) || [];
        return stor;
    };
    //функция записи данных в Localstorage 
    const setStorage = (key, arr) => {
      const arrStorage = getStorage(key);
  
      localStorage.removeItem(key);
  
      arrStorage.push(arr);
     
      localStorage.setItem(key, JSON.stringify(arrStorage));
  
      return arrStorage;     
    };
  
    const firsLoad = () => {
          data.forEach(item =>{
              setStorage('phonebook', item)
        });	
         let firstItems = getStorage('phonebook');
              return firstItems
          
      };

      export default {
        removeStorage,
        getStorage,
        setStorage,
        firsLoad,
      }