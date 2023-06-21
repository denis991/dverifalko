//Аксессуары

const accessoriesSelect = document.getElementById("accessories");
const wrapperSelect = document.getElementById("select-wrapper");
const selectedAccessoriesInput = document.getElementById("selected-accessories");
const showBtn = document.getElementById("show-btn");
const hideBtn = document.getElementById("hide-btn");

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

showBtn.addEventListener("click", showOptions);
hideBtn.addEventListener("click", hideOptions);
accessoriesSelect.addEventListener("change", updateSelectedAccessories);

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
function updateDoor() {
    // Получаем выбранные значения параметров
  const colorPaint = colorPaintSelect.value;
  const colorFilm = colorFilmSelect.value;
  const colorHandle = colorHandleSelect.value;
  const opening = openingSelect.value;

  outerDoor.style.backgroundColor = colorPaint;
  innerDoor.style.backgroundColor = colorFilm;
  innerDoor.style.borderColor = colorHandle;
  innerDoor.style.borderStyle = 'solid';
  innerDoor.style.borderWidth = '2px';
  // Применяем выбранные значения к двери
  if (opening === 'left') {
    outerDoor.style.transform = 'rotateY(180deg)';
  } else {
    outerDoor.style.transform = 'none';
  }
}

// Добавляем обработчик события изменения параметров
colorPaintSelect.addEventListener('change', updateDoor);
colorFilmSelect.addEventListener('change', updateDoor);
colorHandleSelect.addEventListener('change', updateDoor);
openingSelect.addEventListener('change', updateDoor);
//v2
/**   // Функция для применения выбранных параметров к визуальной части двери
function applyDoorStyle() {
  var outerDoor = document.getElementById("outer-door");
  var innerDoor = document.getElementById("inner-door");
  var colorPaint = document.getElementById("color-paint").value;
  var colorFilm = document.getElementById("color-film").value;
  var colorHandle = document.getElementById("color-handle").value;
  var opening = document.getElementById("opening").value;

  outerDoor.style.backgroundColor = colorPaint;
  outerDoor.style.border = "2px solid " + colorFilm;
  innerDoor.style.backgroundColor = colorPaint;
  innerDoor.style.border = "2px solid " + colorFilm;

  if (opening === "left") {
    outerDoor.classList.remove("mirror");
    innerDoor.classList.add("mirror");
  } else {
    outerDoor.classList.add("mirror");
    innerDoor.classList.remove("mirror");
  }

  var doorHandle = document.getElementsByClassName("door-handle")[0];
  doorHandle.style.backgroundColor = colorHandle;
}

// Обработчик события для изменения параметров двери
function handleParameterChange() {
  applyDoorStyle();
}

// Назначение обработчика события для изменения параметров
var selects = document.getElementsByTagName("select");
for (var i = 0; i < selects.length; i++) {
  selects[i].addEventListener("change", handleParameterChange);
}

// Начальное применение параметров
applyDoorStyle();
  */
// end door