//Аксессуары

const accessoriesSelect = document.getElementById('accessories');
const wrapperSelect = document.getElementById('select-wrapper');
const selectedAccessoriesInput = document.getElementById('selected-accessories');
const showBtn = document.getElementById('show-btn');
const hideBtn = document.getElementById('hide-btn');

function showOptions() {
	wrapperSelect.classList.add('show-dropdown');
}

function hideOptions() {
	wrapperSelect.classList.remove('show-dropdown');
}
let selectedOptionsAccessoriesSelect = [];
// var selectedDoorAccessories = [];
function updateSelectedAccessories() {
	const selectedOptions = Array.from(accessoriesSelect.selectedOptions).map(
		(option) => option.text
	);
	selectedOptionsAccessoriesSelect = Array.from(accessoriesSelect.selectedOptions).map(
		(option) => option.dataset.price
	);
	let selectedDoorAccessories = selectedOptions.join(', ');
	selectedAccessoriesInput.value = selectedDoorAccessories;
	// console.log('selectedDoorAccessories: ', selectedDoorAccessories);
  return selectedDoorAccessories
}

showBtn.addEventListener('click', showOptions);
hideBtn.addEventListener('click', hideOptions);
accessoriesSelect.addEventListener('change', updateSelectedAccessories);

//======================== end============================
//door двери

// Получаем элементы управления параметрами
const colorPaintSelect = document.getElementById('color-paint');
const colorFilmSelect = document.getElementById('color-film');
const colorHandleSelect = document.getElementById('color-handle');
const openingSelect = document.getElementById('opening');

// Получаем элементы двери
const doorOuter = document.querySelector('.door-outer');
const doorInner = document.querySelector('.door-inner');
const doorHandle = document.querySelectorAll('.door-color-handle');
const doorOpening = document.querySelector('.door-opening');
const doorOpeningMirror = document.querySelector('.mirror');

// Обработчик события изменения параметров
function updateDoor() {
	console.log('updateDoor');
	// Получаем выбранные значения параметров
	const colorPaint = colorPaintSelect.value;
	const colorFilm = colorFilmSelect.value;
	const colorHandle = colorHandleSelect.value;
	const opening = openingSelect.value;
	// 	/*цвет цвет пленки -> цвет двери */
	doorOuter.style.backgroundColor = colorFilm;
	doorInner.style.backgroundColor = colorFilm;
	/*цвет покраски -> рамка двери  */
	doorOuter.style.border = `4px solid ${colorPaint}`;
	doorInner.style.border = `4px solid ${colorPaint}`;
	/*цвет ручки */
	doorHandle.forEach((div) => {
		div.style.backgroundColor = colorHandle;
	});

	// /*тип открывания */
	if (opening === 'left') {
		doorOpening.style.alignItems = 'flex-start';
		doorOpeningMirror.style.alignItems = 'flex-end';
	} else {
		doorOpening.style.alignItems = 'flex-end';
		doorOpeningMirror.style.alignItems = 'flex-start';
	}

  return {colorPaint, colorFilm, colorHandle, opening}
}

// Добавляем обработчик события изменения параметров
colorPaintSelect.addEventListener('change', updateDoor);
colorFilmSelect.addEventListener('change', updateDoor);
colorHandleSelect.addEventListener('change', updateDoor);
openingSelect.addEventListener('change', updateDoor);

//======================== end============================
// расчёт стоимости
// Получение значения ширины
const widthInput = document.getElementById('width');
const widthValue = widthInput.value;

// Получение значения высоты
const heightInput = document.getElementById('height');
const heightValue = heightInput.value;

// Получение выбранных аксессуаров
const selectedAccessoriesList = Array.from(accessoriesSelect.selectedOptions).map(
	(option) => option.value
);

// Получение элемента с итоговой суммой
const totalPriceSpan = document.getElementById('total-price');

function updateTotalPrice() {
	// Получение значения ширины
	const widthInput = document.getElementById('width');
	const widthValue = parseInt(widthInput.value, 10) || 0;

	// Получение значения высоты
	const heightInput = document.getElementById('height');
	const heightValue = parseInt(heightInput.value, 10) || 0;

	// расчёт цены двери
	const doorPriceMin = 5000;

	function calculateTotalPrice(doorPriceMin) {
		// коробка, толщина которой (Тк) будет равняться 30 мм
		const Tk = 30;
		//еличина монтажного зазора (Мз) при этом будет равной 10 мм,
		const Mz = 10;
		// а значение блока двери (Бд) равняется 20 мм
		const Bd = 20;
		// высоты порога (Вп) будет составлять 20 мм.
		const Vp = 20;

		let doorOpeningWidth = widthValue + 2 * Tk + Mz + 2 * Bd;

		let doorOpeningHeight = heightValue + Vp + 2 * Tk;

		let doorPriceResult = doorPriceMin + doorOpeningWidth + doorOpeningHeight * 1.2;
		return doorPriceResult;
	}

	//==================== аксессуары ======================

	// console.log('selectedOptionsAccessoriesSelect: ', selectedOptionsAccessoriesSelect);
	const OptionsAcces = selectedOptionsAccessoriesSelect.reduce(
		(accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10),
		0
	);

	// console.log(OptionsAcces,'OptionsAcces');

	//============== result ====================
	const newTotalPrice = calculateTotalPrice(doorPriceMin); // Ваш код для расчета новой суммы
	// console.log('newTotalPrice: ', newTotalPrice);
	totalPriceSpan.textContent = newTotalPrice + OptionsAcces;
}

// Добавляем обработчик события изменения параметров
widthInput.addEventListener('change', updateTotalPrice);
heightInput.addEventListener('change', updateTotalPrice);
accessoriesSelect.addEventListener('change', updateTotalPrice);
// Получение кнопки
const submitButton = document.getElementById('submit-button');

//======================== bot telegram============================
/**
 * @param {string} token Токен бота
  * @param {string} text Текст сообщения
  * @param {string} chatId Идентификатор чата
  * @returns {void}
  * @see https://core.telegram.org/bots/api#sendmessage
  * @see https://core.telegram.org/bots/api#markdown-style
  * @see https://core.telegram.org/bots/api#html-style
  * @see https://core.telegram.org/bots/api#formatting-options
  * @see https://core.telegram.org/bots/api#sendmessage
  * @see https://core.telegram.org/bots/api#sendphoto
  * @see https://core.telegram.org/bots/api#senddocument
  * @see https://core.telegram.org/bots/api#sendvideo
5953868106:AAEToSwGXNBHAPGpu3bVaFPmB5wlp1T-H88
For a description of the Bot API, see this page: https://core.telegram.org/bots/api
 *
 */
// Функция для отправки сообщения боту в Telegram
function sendToTelegramBot() {
	// const chatId = '@dverifalko'; // Замените на имя вашего канала
	const chatId = '215140425'; // Замените на имя вашего канала //526912355
	const botToken = '5953868106:AAEToSwGXNBHAPGpu3bVaFPmB5wlp1T-H88';
	const url = 'https://api.telegram.org/bot' + botToken;
  const selectedDoorAccessoriesReturn = updateSelectedAccessories() ? updateSelectedAccessories() :  'нет аксессуаров'
  let {colorPaint, colorFilm, colorHandle, opening} = updateDoor()
  console.log('updateDoor(): ', updateDoor());
	// Параметры двери
	let doorParams = {
		'Цвет покраски': colorPaint,
		'Цвет пленки': colorFilm,
		'Расположение ручки': opening,
		'Цвет ручки': colorHandle,
		'Ширина двери': `${widthValue} см`,
		'Высота двери': `${heightValue} см`,
    'Аксессуары': selectedDoorAccessoriesReturn,
	};
  // const doorParams = {
  //   'Цвет покраски': 'Красный',
  //   'Цвет пленки': 'Зеленый',
  //   'Расположение ручки': 'Справа',
  //   'Цвет ручки': 'Черный',
  //   'Ширина двери': '100 см',
  //   'Высота двери': '200 см',
  // };

	// Формируем текст сообщения с параметрами двери
	let messageText = 'Параметры двери:\n\n';
	for (let param in doorParams) {
		messageText += param + ': ' + doorParams[param] + '\n';
	}

	// Отправляем сообщение в телеграм канал
	otpravka(botToken, messageText, chatId, url);
	/**
	 * var xhr = new XMLHttpRequest();
	 * xhr.open('GET', 'https://api.example.com/data', true);
	 * */
	// function otpravka(token, text, chatId,urlChat) {
	// 	const url =
	// 		'https://api.telegram.org/bot' +
	// 		token +
	// 		'/sendMessage?chat_id=' +
	// 		chatId +
	// 		'&text=' +
	// 		encodeURIComponent(text);
	// 	const request = new XMLHttpRequest();
	// 	request.open('GET', url, true);
	// 	request.send();
	// }

	function otpravka(token, text, chatId, urlChat) {
		fetch(`${urlChat}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
			// fetch(`${urlChat}/getUpdates`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log('Message sent:', data);
			})
			.catch((error) => {
				console.error('Error sending message:', error);
			});
	}
}
//========================end bot telegram============================

// Добавление обработчика события click

submitButton.addEventListener('click', function () {
	updateTotalPrice();
	sendToTelegramBot();
});
