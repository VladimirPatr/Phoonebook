'use strict';

const data = [
  {
    name: 'Иван',
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

{

	const addContactData = contact => {
		data.push(contact);
		console.log(data);
	};

	//функция создания div с классом container
	const createContainer = ()=> {
		const container = document.createElement('div');
		container.classList.add('container');
		return container;
	};

	//создает header
	const createHeader = () => {
		const header = document.createElement('header');
		header.classList.add('header');

		const headerContainer = createContainer();
		header.append(headerContainer);

		header.headerContainer = headerContainer;

		return header;
	};
	//создает логотип H1
	const createLogo = title => {
		const h1 = document.createElement('h1');
		h1.classList.add('logo');
		h1.textContent = `Телефонный справочник. ${title}`;

		return h1;
	};

	//создает логотип предложение p
	const createProposal = title => {
		const p = document.createElement('p');
		p.classList.add('proposal');
		
		p.innerHTML = `Все права защищены  &copy; ${title}`;

		return p;
	};
	//создает Main
	const createMain = ()=> {
		const main = document.createElement('main');
		const mainContainer = createContainer();

		main.append(mainContainer);
		main.mainContainer = mainContainer;

		return main;
	};
	//функция создания footer
	const createFooter = () => {
		const footer = document.createElement('footer');
		footer.classList.add('footer');

		const footerContainer = createContainer();
		footer.append(footerContainer);
		footer.footerContainer = footerContainer;

		return footer;
	};
	

	//функция для создани  кнопок из массива объектов
	const createButtonsGroup = params => {
		const btnWrapper = document.createElement('div');
		btnWrapper.classList.add('btn-wrapper');

		const btns = params.map(({className, type, text}) => {
			const button = document.createElement('button');

			button.type = type;
			button.textContent = text;
			button.className = className;
			
			return button;
		});

		btnWrapper.append(...btns);
		return {
			btnWrapper,
			btns
		};
	};
	// создание таблицы
	const createTable = () => {
		const table = document.createElement('table');
		table.classList.add('table', 'table-striped');

		const thead = document.createElement('thead');
		thead.insertAdjacentHTML('beforeend', ` 
			<tr>
				<th class="delete">Удалить</th>
				<th>Имя</th>
				<th>Фамилия</th>
				<th>Телефон</th>
			</tr>
			`);

		const tbody = document.createElement('tbody');
		table.append(thead, tbody);
		table.tbody = tbody;

		return table;
	};

	//создание формы модального окна с оверлеем
	const createForm = ()=> {
		const overlay = document.createElement('div');
		overlay.classList.add('form-overlay');

		const form = document.createElement('form');
		form.classList.add('form');
		form.insertAdjacentHTML('beforeend', ` 
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
			`);	
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
			]);	

			form.append(...buttonGroup.btns);
			overlay.append(form);

			return {
				overlay,
				form,
			}

	};


	//функция возращет(рендерит) создания всех элементов и добавления их в корневой div
	const renderPhoneBook = (app, title)=>{
		
		const header = createHeader();
		const logo = createLogo(title);
		const main = createMain();
		const footer = createFooter();
		const p = createProposal(title);
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
		]);
		const table = createTable();
		const { form, overlay } = createForm();

		header.headerContainer.append(logo);
		main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
		footer.footerContainer.append(p);
		app.append(header, main, footer);

		return {
			
				list: table.tbody,
				logo,
				btnAdd: buttonGroup.btns[0],
				btnDel: buttonGroup.btns[1],
				formOverlay: overlay,	
				form,
		};
	};

	//функция заполнения одной строки данными
	const createRow = ({name: firstName, surname, phone}) => {
		const tr = document.createElement('tr');
		tr.classList.add('contact');

		const tdDel = document.createElement('td');
		tdDel.classList.add('delete');
		const buttonDel = document.createElement('button');
		buttonDel.classList.add('del-icon');
		tdDel.append(buttonDel);

		const tdName = document.createElement('td');
		tdName.textContent = firstName;
		const tdSurname = document.createElement('td');
		tdSurname.textContent = surname;
		const tdPhone = document.createElement('td');
		const phoneLink = document.createElement('a');
		phoneLink.href = `tel.${phone}`;
		phoneLink.textContent = phone;
		tr.phoneLink = phoneLink;
		tdPhone.append(phoneLink);


		tr.append(tdDel, tdName, tdSurname, tdPhone);
		return tr;
	};
	//функция 
	const renderContacts = (elem, data) => {
		const allRow = data.map(createRow);
		elem.append(...allRow);
		
		return allRow;
	};
	//
	const hoverRow = (allRow, logo) => {
		const text =logo.textContent;

		allRow.forEach(contact => {
			contact.addEventListener('mouseenter', () => {
				logo.textContent = contact.phoneLink.textContent;
			});
			contact.addEventListener('mouseleave', () => {
				logo.textContent = text;
			});
		});
	};

	const modalControl = (btnAdd, formOverlay) => {

		const openModal = () => {
			formOverlay.classList.add('is-visible');
		};

		const closeModal = () => {
			formOverlay.classList.remove('is-visible');
		}
		
		btnAdd.addEventListener('click', openModal);

		formOverlay.addEventListener('click', e =>{
			const target = e.target;
			if (target === formOverlay || target.classList.contains('close')) {
				closeModal();
				console.log(formOverlay);
			};
		});

		return {
			closeModal,
		}
	};
	const deleteControl = (btnDel, list) => {
		btnDel.addEventListener('click', () => {
			document.querySelectorAll('.delete').forEach(del => {
				del.classList.toggle('is-visible');
			});
		});
		list.addEventListener('click', e => {
			const target = e.target;
			if (target.closest('.del-icon')) {
				target.closest('.contact').remove();
			};
		});
	};

	const addContactPage = (contact, list) => {
		list.append(createRow(contact));
	};

	const formControl = (form, list, closeModal) =>  {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const formData = new FormData(e.target);

			const newContact = Object.fromEntries(formData);
			addContactPage(newContact, list);
			addContactData(newContact);
			form.reset();
			closeModal();
		});
	};

	const init = (selectorApp, title)=> {
		const app = document.querySelector(selectorApp);
	
		const {list, 
			   logo,
		       btnAdd,
	           formOverlay, 
	           form, 
	           btnDel
	    } = renderPhoneBook(app, title);
	
		//функционал
		const allRow = renderContacts(list, data);
		const{ closeModal} = modalControl(btnAdd, formOverlay);

		hoverRow(allRow, logo);
		deleteControl(btnDel, list);
		formControl(form, list, closeModal);

		// const btnClose = document.querySelector('.close');
		// btnClose.addEventListener('click', ()=>{
		// 	formOverlay.classList.remove('is-visible');
		// });
		

		
	};


	window.phoneBookInit = init;
};