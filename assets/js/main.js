(function () {

	//Поиск ближайшего элемента по классу | Для табов, если нажато на nav, то возвращать null 
	var closestsElementClass = function (elem, className) {
		var node = elem;
		/*/	если клик по дочернему элементу, то возвращаем
		*	класс родителя, перескакивая вверх через ноду по циклу
		/*/
		while (node) {
			/*/ если текущий элемент содержит тот класс, который мы ему передали,
			*	при вызове функции, то просто возвращаем этот элемент, 
			/*/
			if (node.classList.contains(className)) {
				return node; //класс есть — значит его и возвращаем, прекращая функцию
			}
			/*/ если класса нет, то вместо текущего елемента берется его родительский
			*	и так по циклу до тех пор, пока у конечного родителя не найдется класс, 
			*   который мы передали, иначе return null
			/*/
			node = node.parentElement;
		}
		//возврат null если нет нашего класса ни у элемента, ни у его дочерних узлов
		return null;
	}

	//контейнер с товарами
	var catalog = document.querySelector('.portfolio-container');
	//блок с табами
	var catalogNav = document.querySelector('.filter__tabs');
	//товары
	var catalogItems = document.querySelectorAll('.portfolio__item');



	//Очистка блока с элементами, чтобы при фильрации добавлялись новые в чиситый блок
	function removeChildren(item) {
		while (item.firstChild) {
			item.removeChild(item.firstChild)
		}
	}

	//обновляем элементы в каталоге | item это блок каталога
	function updateChildren(item, children) {
		removeChildren(item);
		for (var i = 0; i < children.length; i++) {
			item.appendChild(children[i]);
		}
	}

	catalogNav.addEventListener('click', function (e) {
		var target = e.target;
		var item = closestsElementClass(target, 'filter__btn');
		if (item === null || item.classList.contains('is-active')) {
			return;
		}

		e.preventDefault();
		//Получаем значение из атрибута data-filter="" 
		var filterValue = item.getAttribute('data-filter');
		var previousActiveBtn = document.querySelector('.filter__btn.is-active');
		previousActiveBtn.classList.remove('is-active');
		item.classList.add('is-active');

		//Если выбраны ВСЕ, то просто их всех выводим
		if (filterValue === 'all') {
			updateChildren(catalog, catalogItems);
			return;
		}

		//Отфильтрованные элементы перемещаем в массив
		var filteredItems = [];
		for (var i = 0; i < catalogItems.length; i++) {
			var currentItem = catalogItems[i];
			if (currentItem.getAttribute('data-category') === filterValue) {
				filteredItems.push(currentItem);
			}
		}
		updateChildren(catalog, filteredItems);
	});

})();

//Переход по якорям
(function () {

	const smoothScroll = function (targetEl, duration) {
		const headerElHeight = document.querySelector('#header').clientHeight; // класс хедера
		let target = document.querySelector(targetEl);
		let headerNav = document.querySelector('.menu');
		let targetPosition = target.getBoundingClientRect().top; //- headerElHeight; //вычитаем размер хедера, если он фиксированный
		let startPosition = window.pageYOffset;
		let startTime = null;

		const ease = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		const animation = function (currentTime) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, startPosition, targetPosition, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		};
		requestAnimationFrame(animation);
	};

	const scrollTo = function () {
		//const links = document.querySelectorAll('.js-scroll'); //добавляем классы к линкам
		const links = document.querySelectorAll('.menu__link'); //добавляем классы к линкам

		links.forEach(each => {
			each.addEventListener('click', function () {
				const currentTarget = this.getAttribute('href');
				smoothScroll(currentTarget, 1000);
				//выход из мобильного меню
				//headerNav.classList.remove('mobile');
			});
		});
	};
	scrollTo();
}());


/////////////кнопка скролла наерх

var intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page

var scrollButton = document.querySelector('.to-top'); // Reference to our scroll button
var header = document.querySelector('#header');
var headerHeight = header.clientHeight;


window.addEventListener('scroll', function () {
	if (window.pageYOffset > headerHeight)
		scrollButton.style.display = "block";
	else
		scrollButton.style.display = "none";
});


function scrollStep() {
	if (window.pageYOffset === 0) {
		clearInterval(intervalId);
	}
	window.scroll(0, window.pageYOffset - 50);
}

function scrollToTop() {
	intervalId = setInterval(scrollStep, 7);
}

scrollButton.addEventListener('click', scrollToTop);


//////////мобильное меню

var burgerBtn = document.querySelector('.burger');
var menu = document.querySelector('.menu');
var closeBtn = document.querySelector('.close_btn');


burgerBtn.addEventListener('click', function () {
	menu.classList.add('mobile');
	closeBtn.classList.add('is-active');

	var menuLink = document.querySelectorAll('.menu__link');
	var mobileMmenu = document.querySelector('.mobile');

	for (var i = 0; i < menuLink.length; i++) {
		menuLink[i].addEventListener('click', function (e) {
			e.preventDefault();
			mobileMmenu.classList.remove('mobile');
			closeBtn.classList.remove('is-active');
		})
	}
})

closeBtn.addEventListener('click', function () {
	menu.classList.remove('mobile');
	closeBtn.classList.remove('is-active');
})