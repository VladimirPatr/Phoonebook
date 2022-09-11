
//функция добавления контакта в объект с контактами data
const addContactData = (contact) => {
    data.push(contact)
  }

  //функция создания div с классом container
  const createContainer = () => {
    const container = document.createElement('div')
    container.classList.add('container')
    return container
  }

  //создает header
  const createHeader = () => {
    const header = document.createElement('header')
    header.classList.add('header')

    const headerContainer = createContainer()
    header.append(headerContainer)

    header.headerContainer = headerContainer

    return header
  }
  //создает логотип H1
  const createLogo = (title) => {
    const h1 = document.createElement('h1')
    h1.classList.add('logo')
    h1.textContent = `Телефонный справочник. ${title}`

    return h1
  }

  //создает логотип предложение p
  const createProposal = (title) => {
    const p = document.createElement('p')
    p.classList.add('proposal')

    p.innerHTML = `Все права защищены  &copy; ${title}`

    return p
  }

  //создает Main
  const createMain = () => {
    const main = document.createElement('main')
    const mainContainer = createContainer()

    main.append(mainContainer)
    main.mainContainer = mainContainer

    return main
  }

  //функция создания footer
  const createFooter = () => {
    const footer = document.createElement('footer')
    footer.classList.add('footer')

    const footerContainer = createContainer()
    footer.append(footerContainer)
    footer.footerContainer = footerContainer

    return footer
  }

  //функция для создани  кнопок из массива объектов
  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div')
    btnWrapper.classList.add('btn-wrapper')

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button')

      button.type = type
      button.textContent = text
      button.className = className

      return button
    })

    btnWrapper.append(...btns)
    return {
      btnWrapper,
      btns,
    }
  }
  // создание таблицы
  const createTable = () => {
    const table = document.createElement('table')
    table.classList.add('table', 'table-striped')

    const thead = document.createElement('thead')
    thead.insertAdjacentHTML(
      'beforeend',
      ` 
			<tr>
				<th class="delete">Удалить</th>
				<th>Имя</th>
				<th>Фамилия</th>
				<th>Телефон</th>
			</tr>
			`,
    )

    const tbody = document.createElement('tbody')
    table.append(thead, tbody)
    table.tbody = tbody

    return table
  }

  //создание формы модального окна с оверлеем
  const createForm = () => {
    const overlay = document.createElement('div')
    overlay.classList.add('form-overlay')

    const form = document.createElement('form')
    form.classList.add('form')
    form.insertAdjacentHTML(
      'beforeend',
      ` 
			<button class="close" type="button"></button>
			<h2 class="form-title">Добавить контакты</h2>
			<div class="form-group">
				<label class="form-label" for="name">Имя:</label>
				<input type="text" class="form-input" name="name" id="name" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="surname">Фамилия:</label>
				<input type="text" class="form-input" name="surname" id="surname" required>
			</div>
			<div class="form-group">
				<label class="form-label" for="phone">Телефон:</label>
				<input type="number" class="form-input" name="phone" id="phone" required>
			</div>
			`,
    )
    //добавление кнопок в модальное окно
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ])

    form.append(...buttonGroup.btns)
    overlay.append(form)

    return {
      overlay,
      form,
    }
  }

  //функция заполнения одной строки данными
  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr')
    tr.classList.add('contact')

    const tdDel = document.createElement('td')
    tdDel.classList.add('delete')
    const buttonDel = document.createElement('button')
    buttonDel.classList.add('del-icon')
    tdDel.append(buttonDel)

    const tdName = document.createElement('td')
    tdName.textContent = firstName
    const tdSurname = document.createElement('td')
    tdSurname.textContent = surname
    const tdPhone = document.createElement('td')
    const phoneLink = document.createElement('a')
    phoneLink.href = `tel.${phone}`
    phoneLink.textContent = phone
    tr.phoneLink = phoneLink
    tdPhone.append(phoneLink)

    tr.append(tdDel, tdName, tdSurname, tdPhone)
    return tr
  };


  export default {
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
  };
