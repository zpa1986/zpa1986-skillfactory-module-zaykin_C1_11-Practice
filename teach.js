// функция-конструктор принимает селектор для поиска и составляет массив найденных объектов в соответствии с 
// этим селектором. Возвращает объект jQuery {elements: [element1, element2...]}
function jQuery (selector, context = document){
	this.elements = Array.from(context.querySelectorAll(selector));
	return this
}
// у получившегося объекта jQuery создаем новый метод, который представляет собой функцию
// на входе функция получает другую функцию, которая будет вызываться для каждого элемента
// массива jQuery
jQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}
// у получившегося объекта jQuery создаем новый метод, который представляет собой функцию
// на входе функция получает другую функцию, которая вызывается после события click (нажатие на объект)
jQuery.prototype.click = function(fn){
	this.each(element => element.addEventListener('click', fn))
	return this
}
// у получившегося объекта jQuery создаем новый метод, который представляет собой функцию
// при запуске метода функция берет выбранные элемент и устанавливает уме свойство display = 'none'
jQuery.prototype.hide = function(){
	this.each(element => element.style.display = 'none')
  return this;
}
//функция устанавливает выбранному элементу свойство display = '', показывая его
jQuery.prototype.show = function(){
	this.each(element => element.style.display = '')
  return this;
}
//у получившегося объекта jQuery создаем новый метод, который представляет собой функцию
// на вход функция принимает текст, который будет вставлен в найденный объект и возвращает 
// этот измененный объект. А если текст не передается, то просто возвращает объект
jQuery.prototype.text = function (text) {
if (text) {
this.each(element=> element.textContent = text)
return this
}
else {
this.each(element=>element.textContent)
return this
}
}
// создаем функцию создающую новый объект jQuery по искомому селектору.
// в эту функцию достаточно передать селектор.
const $ = (e) => new jQuery(e);
//функция-конструктор, которая на входе получает значение минут и секунд и возвращает объект
function Timer(minutes, seconds) {
            this.time = new Date(0, 0, 0, 0, +minutes, +seconds, 30);
            this.hide_result();
            this.timer_is_active = true;
            this.show_time();
            return this;
}

Timer.prototype.show_time = function() {
        $('#minutes-data span').text(((0 + String(this.time.getMinutes())).slice(-2)));
        $('#seconds-data span').text(((0 + String(this.time.getSeconds())).slice(-2)));
        return this;
}

Timer.prototype.minus_second = function() {
        this.time.setSeconds(this.time.getSeconds() - 1);
        this.show_time();
        return this;
    }

Timer.prototype.plus_second = function() {
        this.time.setSeconds(this.time.getSeconds() + 1);
        this.show_time();
        return this;
    }

Timer.prototype.plus_minute = function() {
        this.time.setMinutes(this.time.getMinutes() + 1);
        this.show_time();
        return this;
    }

Timer.prototype.start_timer = function() {
        if (this.time.getMinutes() == 0 && this.time.getSeconds() == 0 && this.timer_is_active == true){
            this.timer_is_active = false;
            this.show_result();
            return this;
        }

        else if(this.time.getMinutes() == 0 && this.time.getSeconds() == 0 && this.timer_is_active == false){
            return this;
        }

        else {
            this.start_t = this.start_timer.bind(this);
            (this.timer_is_active == true) ? setTimeout(this.start_t, 1000) : console.log('stopped')
            this.minus_second();
            return this;
        }
    }
Timer.prototype.new_timer = function() {
        this.hide_result(this);
        if (document.getElementById('input_minutes').value == 0 && document.getElementById('input_seconds').value == 0) {
            this.timer_is_active = true;
            this.start_timer();
            return this;
        }

        else    {
            this.time = new Date(0, 0, 0, 0, document.getElementById('input_minutes').value, document.getElementById('input_seconds').value);
            this.timer_is_active = true;
            this.start_timer();
            return this;
        }
    }
// при нажатии на кнопку "стоп" функция обнуляет дату, выводит эту дату на экран
//
Timer.prototype.stop_timer = function() {
        // this.show_result();
        this.time = new Date(0, 0, 0, 0, 0, 0);
        this.show_time();
        this.timer_is_active = false;
        return this;
    }

Timer.prototype.show_result = function() {
        $('#complete').show();
        return this;
    }

Timer.prototype.hide_result = function() {
        $('#complete').hide();
        return this;
    }  
// функция запускает новый объект Timer и передает в него начальные значения минут и секунд
// также всем необходимым полям и кнопкам вешает обработчики события
let ready = function() {
    timer = new Timer(0, 0);

    $('#submit_time').click(()=>timer.new_timer());
    $('#minutes-cover').click(()=>timer.plus_minute());
    $('#seconds-cover').click(()=>timer.plus_second());
    $('#stop_timer').click(()=>timer.stop_timer());
    $('#again').click(()=>timer.hide_result())
}



document.addEventListener("DOMContentLoaded", ready )