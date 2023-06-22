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
function updateSelectedAccessories() {
	const selectedOptions = Array.from(accessoriesSelect.selectedOptions).map(
		(option) => option.text
	);
	selectedOptionsAccessoriesSelect = Array.from(accessoriesSelect.selectedOptions).map(
		(option) => option.dataset.price
	);
	selectedAccessoriesInput.value = selectedOptions.join(', ');
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
	const newTotalPrice = calculateTotalPrice(doorPriceMin ); // Ваш код для расчета новой суммы
	// console.log('newTotalPrice: ', newTotalPrice);
	totalPriceSpan.textContent = newTotalPrice + OptionsAcces;
}

// Добавляем обработчик события изменения параметров
widthInput.addEventListener('change', updateTotalPrice);
heightInput.addEventListener('change', updateTotalPrice);
accessoriesSelect.addEventListener('change', updateTotalPrice);
// Получение кнопки
const submitButton = document.getElementById('submit-button');

// Добавление обработчика события click
submitButton.addEventListener('click', updateTotalPrice);
