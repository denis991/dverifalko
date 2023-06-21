//Аксессуары
const accessoriesSelect = document.getElementById("accessories");
const wrapperSelect = document.getElementById("select-wrapper");
const selectedAccessoriesInput = document.getElementById("selected-accessories");
const showBtn = document.getElementById("show-btn");
const hideBtn = document.getElementById("hide-btn");

showBtn.addEventListener("click", showOptions);
hideBtn.addEventListener("click", hideOptions);
accessoriesSelect.addEventListener("change", updateSelectedAccessories);

function showOptions() {
  wrapperSelect.classList.add("show-dropdown");
}

function hideOptions() {
  wrapperSelect.classList.remove("show-dropdown");
}

function updateSelectedAccessories() {
  const selectedOptions = Array.from(accessoriesSelect.selectedOptions).map(option => option.text);
  selectedAccessoriesInput.value = selectedOptions.join(", ");
}

//door двери 
// Получаем элементы управления параметрами
const colorPaintSelect = document.getElementById('color-paint');
const colorFilmSelect = document.getElementById('color-film');
const colorHandleSelect = document.getElementById('color-handle');
const openingSelect = document.getElementById('opening');

// Получаем элементы двери
const doorOuter = document.querySelector('.door-outer');
const doorInner = document.querySelector('.door-inner');

// Обработчик события изменения параметров
function handleParameterChange() {
  // Получаем выбранные значения параметров
  const selectedColorPaint = colorPaintSelect.value;
  const selectedColorFilm = colorFilmSelect.value;
  const selectedColorHandle = colorHandleSelect.value;
  const selectedOpening = openingSelect.value;

  // Применяем выбранные значения к двери
  doorOuter.style.backgroundColor = selectedColorPaint;
  doorInner.style.backgroundColor = selectedColorFilm;
  doorInner.style.transform = selectedOpening === 'left' ? 'rotateY(180deg)' : 'rotateY(0)';
}

// Добавляем обработчик события изменения параметров
colorPaintSelect.addEventListener('change', handleParameterChange);
colorFilmSelect.addEventListener('change', handleParameterChange);
colorHandleSelect.addEventListener('change', handleParameterChange);
openingSelect.addEventListener('change', handleParameterChange);

// end door