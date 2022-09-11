
import modulesCreateElements from './createElements.js';
import modulesControl from './control.js';
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
  hoverRow,
  modalControl,
  deleteControl,
  addContactPage,
  formControl,		
} = modulesControl;

const {
  removeStorage,
  getStorage,
  setStorage,
  firsLoad,		
} = modulesServiceStorage;


//функция возращет(рендерит) создания всех элементов и добавления их в корневой div
export const renderPhoneBook = (app, title) => {
    const header = createHeader()
    const logo = createLogo(title)
    const main = createMain()
    const footer = createFooter()
    const p = createProposal(title)
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ])
    const table = createTable()
    const { form, overlay } = createForm()

    header.headerContainer.append(logo)
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay)
    footer.footerContainer.append(p)
    app.append(header, main, footer)

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    }
  }

  //функция рендера рендера таблицы с заполненнием данными c
  export const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
          elem.append(...allRow)
          return allRow
  }

   