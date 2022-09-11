
import modulesCreateElements from './createElements.js';
import modulesServiceStorage from './serviceStorage.js';

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


const {
  removeStorage,
  getStorage,
  setStorage,
  firsLoad,		
} = modulesServiceStorage;
  //функция для показа номера тел в шапке при наведении на него в таблице
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent

    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent
      })
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text
      })
    })
  }

  //функция закрытия и открытия модального окна по клику
  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible')
    }

    const closeModal = () => {
      formOverlay.classList.remove('is-visible')
    }

    btnAdd.addEventListener('click', openModal)

    formOverlay.addEventListener('click', (e) => {
      const target = e.target
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal()
      }
    })
    return {
      closeModal,
    }
  }

  //фунция добавления столбца с иконками удаления строк и удаление строки при нажатии на иконку
  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible')
      })
    })
    list.addEventListener('click', (e) => {
      const target = e.target
      if (target.closest('.del-icon')) {
        const delStor = target.closest('tr').lastChild.textContent;
        target.closest('.contact').remove();
        const arrStorage = getStorage('phonebook');
        arrStorage.forEach(item => {
          if (item.phone == delStor){
            removeStorage(delStor)
          }
        })
      }
    })
  }

  //функция добавления данных из формы модального окна в таблицу
  const addContactPage = (contact, list) => {
    list.append(createRow(contact))
  }

  //функция с событиями формы модального окна при срабатывании submit
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
  
      const formData = new FormData(e.target)

      const newContact = Object.fromEntries(formData)

      const formStor = setStorage('phonebook', newContact);
      let last = formStor.length; 

      addContactPage(formStor[last - 1], list)
      // addContactData(newContact)
      form.reset()
      closeModal()
    })
  };

  export default {
    hoverRow,
    modalControl,
    deleteControl,
    addContactPage,
    formControl,
  }