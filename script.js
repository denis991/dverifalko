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

	return selectedDoorAccessories;
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
	// console.log('updateDoor');
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

	return { colorPaint, colorFilm, colorHandle, opening };
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

	const OptionsAcces = selectedOptionsAccessoriesSelect.reduce(
		(accumulator, currentValue) => parseInt(accumulator, 10) + parseInt(currentValue, 10),
		0
	);

	//============== result ====================
	const newTotalPrice = calculateTotalPrice(doorPriceMin); // Ваш код для расчета новой суммы
	const totalPriceAmount = newTotalPrice + OptionsAcces;
	totalPriceSpan.textContent = totalPriceAmount;
	return totalPriceAmount;
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
 *
 */
// Функция для отправки сообщения боту в Telegram
async function sendToTelegramBot() {
	// const chatId = '@dverifalko'; // Замените на имя вашего канала
	const chatId = '215140425'; // Замените на имя вашего канала //526912355
	const botToken = '5953868106:AAEToSwGXNBHAPGpu3bVaFPmB5wlp1T-H88';
	const url = 'https://api.telegram.org/bot' + botToken;
	const selectedDoorAccessoriesReturn = updateSelectedAccessories()
		? updateSelectedAccessories()
		: 'нет аксессуаров';
	let { colorPaint, colorFilm, colorHandle, opening } = updateDoor();

	// сумма
	const totalPriceAmount = updateTotalPrice();
	// Параметры двери
	let doorParams = {
		'Цвет покраски': colorPaint,
		'Цвет пленки': colorFilm,
		'Расположение ручки': opening,
		'Цвет ручки': colorHandle,
		'Ширина двери': `${widthValue} см`,
		'Высота двери': `${heightValue} см`,
		Аксессуары: selectedDoorAccessoriesReturn,
		'Итоговая сумма': `${totalPriceAmount} руб.`,
	};

	// Формируем текст сообщения с параметрами двери
	let messageText = 'Параметры двери:\n\n';
	for (let param in doorParams) {
		messageText += param + ': ' + doorParams[param] + '\n';
	}

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

	async function otpravka(token, text, chatId, urlChat) {
		try {
			const response = await fetch(
				`${urlChat}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`
			);
			if (response.ok && response.status >= 200 && response.status < 300) {
				const data = await response.json();
				console.log('Message sent:', data);
				return true; // Успешная отправка сообщения
			} else {
				throw new Error(`Request failed with status ${response.status}`);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			return false; // Ошибка при отправке сообщения
		}
	}
	// Отправляем сообщение в телеграм канал
	const messageSent = await otpravka(botToken, messageText, chatId, url);
	// ========= ЕСЛИ ПРОШЛА ОТПРАВКА ========
	const successTooltip = document.getElementById('success-tooltip');
	if (messageSent) {
		// Прокрутка к элементу с id "footer"
		const footerElement = document.getElementById('footer');
		footerElement.scrollIntoView({ behavior: 'smooth' });

		// Прокрутка к нижней части страницы
		document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
		// Или:
		window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });

		// Отображение всплывающего окна успеха
		successTooltip.style.visibility = 'visible';
		successTooltip.style.opacity = '1';

		// Скрытие всплывающего окна после 2 секунд
		setTimeout(function () {
			successTooltip.style.visibility = 'hidden';
			successTooltip.style.opacity = '0';
		}, 2000);
	}
}
//========================end bot telegram============================

// Добавление обработчика события click

submitButton.addEventListener('click', function () {
	updateTotalPrice();
	sendToTelegramBot();
});
