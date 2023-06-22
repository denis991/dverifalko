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

function updateSelectedAccessories() {
	const selectedOptions = Array.from(accessoriesSelect.selectedOptions).map(
		(option) => option.text
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
