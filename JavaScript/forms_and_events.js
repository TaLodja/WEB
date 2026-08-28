// JavaScript source code
function Factorial() {
    let numberElement = document.getElementById("number");
    let number = numberElement.value;
    let resultElement = document.getElementById("factorial-result");
    let f = BigInt(1);
    for (let i = 1n; i <= number; i++) {
        f *= i;
    }
    //resultElement.value = `${number}! = ${f}`;
    if (number >= 0) resultElement.innerHTML = `${number}! = ${f}`;
    else resultElement.innerHTML = "Введено отрицательное число!";
}
function Power() {
    let baseElement = document.getElementById("base");
    let b = baseElement.value;
    let powerElement = document.getElementById("power");
    let pow = powerElement.value;
    let resultElement = document.getElementById("power-result");
    resultElement.innerHTML = `${b}^${pow} = ${b ** pow}`;
}
function Fibonacci() {
    let numberElement = document.getElementById("max-number");
    let number = numberElement.value;
    let resultElement = document.getElementById("fibonacci-result");
    let indexElement = document.getElementById("max-index");
    let sequence = "";
    i = 1;
    while (FindThisFibonacci(i) < number) {
        sequence += FindThisFibonacci(i) + "...";
        i++;
    }
    indexElement.innerHTML = i - 1;
    resultElement.innerHTML = sequence;
}
function FindThisFibonacci(n) {
    if (n == 1) return 0;
    if (n == 2) return 1;
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n - 1];
}
///////////////////////////////////////////////////////////////
function setImage() {
    let filename = document.getElementById("image-file");
    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("image").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
function setBackgroundColor(event) {
    document.body.style.backgroundColor = event.target.value;
    console.log(event.target.id);
    //document.body.style.backgroundColor = document.getElementById("background-color").value;
    /*alert("setBackgroundColor");*/
}
function setForegroundColor() {
    document.body.style.color = document.getElementById("foreground-color").value;
}
function setColor(event) {
    /*
    -------------------------------
    ==   - сравнивает два значения;
    ===  - сравнивает два значения и типы этих значений.
    ===    возвраащет 'true' только в том случае, если совпадают как значения, так и типы
    -------------------------------
    */
    document.body.style[(event.target.id === 'background-color' ? 'backgroundColor' : 'color')] = event.target.value;
    /*
    if (event.target.id === "background-color")
        document.body.style.backgroundColor = event.target.value;
    else
        document.body.style.color = event.target.value;
     */
    console.log(event.target.id);
}

///////////////////////////////////////////////////////////////////////

document.addEventListener("mousemove", traceMouse);
function traceMouse(e) {
    document.getElementById("mouse").innerHTML =
        `X = ${e.clientX}, Y = ${e.clientY}`;
}

document.getElementById("switch-background").addEventListener("click", switchBackground);
function switchBackground(e) {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    document.body.className = document.body.className === "dark" ? "light" : "dark";
    /*
    let skin = document.body.className;
    let switchButton = document.getElementById("switch-background");
    switchButton.src = skin === "dark" ? "moon.png" : "sun.png";
    document.body.className = skin === "dark" ? "light" : "dark";
    //document.getElementById("debug-background").innerHTML = switchButton.src;
    document.getElementById("debug-background").innerHTML = document.body.className;
    */
}
document.getElementById("switch-background-delay").addEventListener("change", setDelay);
function setDelay(e) {
    let delay = e.target.value;
    //alert(`Delay" ${delay}`);
    document.getElementById('switch-background').style.transition =
        document.body.style.transition =
        `color ${delay}s, background-color ${delay}s, background-image ${delay}s`;
    console.table(document.body.style);
    console.table(document.getElementById('#switch-background').style);
}

//////////////////////////////////////////////////////////////////////////

function addLeadingZero(number) {
    return number < 10 ? "0" + `${number}` : `${number}`;
}
function tickTimer() {
    let date = new Date();
    document.getElementById("raw-date").innerHTML = date.toString();

    document.getElementById("hours").innerHTML = addLeadingZero(date.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(date.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(date.getSeconds());

    document.getElementById("years").innerHTML = addLeadingZero(date.getFullYear());
    document.getElementById("months").innerHTML = addLeadingZero(date.getMonth() + 1);
    document.getElementById("days").innerHTML = addLeadingZero(date.getDate());

    document.getElementById("day-of-week").innerHTML = date.toLocaleDateString("en", { weekday: 'long' });

    document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? 'visible' : 'hidden';
    document.getElementById("day-of-week").style.visibility = document.getElementById("show-weekday").checked ? 'visible' : 'hidden';

    setTimeout(tickTimer, 100);
}
tickTimer();

///////////////////////////////////////////////////////////////////////////

document.getElementById('btn-start').addEventListener("click", startCountdownTimer);
function startCountdownTimer() {
	let li = document.createElement("li");
	li.innerHTML = "Before";
	document.getElementById("construct").before(li);
	let targetDate = document.getElementById("target-date");
	let targetTime = document.getElementById("target-time");
	let btnStart = document.getElementById("btn-start");
	if (btnStart.value === "Start") {
		btnStart.value = "Stop";
		targetDate.disabled = targetTime.disabled = true;
		resetDisplay();
		tickCountdown();
	}
	else {
		btnStart.value = "Start";
		targetDate.disabled = targetTime.disabled = false;
	}
}
function tickCountdown() {
	if (document.getElementById("btn-start").value == "Start") return;
	let now = new Date();

	let targetDateControl = document.getElementById("target-date");
	let targetTimeControl = document.getElementById("target-time");

	let targetDateValue = targetDateControl.valueAsDate;
	let targetTimeValue = targetTimeControl.valueAsDate;

	document.getElementById("timezone").innerHTML = now.getTimezoneOffset() / 60;
	targetDateValue.setHours(targetDateValue.getHours() + targetDateValue.getTimezoneOffset() / 60);
	targetTimeValue.setHours(targetTimeValue.getHours() + targetDateValue.getTimezoneOffset() / 60);

	targetTimeValue.setFullYear(targetDateValue.getFullYear());
	targetTimeValue.setMonth(targetDateValue.getMonth());
	targetTimeValue.setDate(targetDateValue.getDate());

	let timestamp = targetTimeValue - now;
	let duration = Math.trunc(timestamp / 1000);

	document.getElementById("timestamp").innerHTML = timestamp;
	document.getElementById("duration").innerHTML = duration;
	document.getElementById("target-date-value").innerHTML = targetDateValue;
	document.getElementById("target-time-value").innerHTML = targetTimeValue;

	const SECONDS_PER_MINUTE = 60;
	const SECONDS_PER_HOUR = 3600;
	const SECONDS_PER_DAY = 86400;
	const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
	const DAYS_PER_MONTH = 365.25 / 12;
	const SECONDS_PER_MONTH = SECONDS_PER_DAY * DAYS_PER_MONTH;
	const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365 + SECONDS_PER_HOUR * 6;

	let time_of_day = duration % SECONDS_PER_DAY;
	let date = Math.floor(duration / SECONDS_PER_DAY);
	date = date * SECONDS_PER_DAY;

	let years = Math.floor(date / SECONDS_PER_YEAR);
	if (years > 0) {
		date = date % SECONDS_PER_YEAR;
		let years_unit = document.getElementById("years-unit");
		if (years_unit == null) {
			let years_block = createTimeBlock("years", years);
			let hours_block = document.getElementById("hours-unit").parentElement;
			hours_block.before(years_block);
		}
		else years_unit.innerHTML = addLeadingZero(years);
	}
	else removeTimeBlock("years");

	let months = Math.floor(date / SECONDS_PER_MONTH);
	if (months > 0) {
		date = date % SECONDS_PER_MONTH;
		let months_unit = document.getElementById("months-unit");
		if (months_unit == null) {
			let months_block = createTimeBlock("months", months);
			let hours_block = document.getElementById("hours-unit").parentElement;
			hours_block.before(months_block);
		}
		else months_unit.innerHTML = addLeadingZero(months);
	}
	else removeTimeBlock("months");

	let weeks = Math.floor(date / SECONDS_PER_WEEK);
	if (weeks > 0) {
		date = date % SECONDS_PER_WEEK;
		let weeks_unit = document.getElementById("weeks-unit");
		if (weeks_unit == null) {
			let weeks_block = createTimeBlock("weeks", addLeadingZero(weeks));
			let hours_block = document.getElementById("hours-unit").parentElement;
			hours_block.before(weeks_block);
		}
		else weeks_unit.innerHTML = addLeadingZero(weeks);
	}
	else removeTimeBlock("weeks");

	let days = Math.floor(date / SECONDS_PER_DAY);
	if (days > 0) {
		let days_unit = document.getElementById("days-unit");
		if (days_unit == null) {
			let days_block = createTimeBlock("days", days);
			document.getElementById("hours-unit").parentElement.before(days_block);
		}
		else days_unit.innerHTML = addLeadingZero(days);
	}
	else removeTimeBlock("days");

	let hours = Math.trunc(time_of_day / SECONDS_PER_HOUR);
	time_of_day = time_of_day % SECONDS_PER_HOUR;
	let minutes = Math.trunc(time_of_day / SECONDS_PER_MINUTE);
	time_of_day = time_of_day % SECONDS_PER_MINUTE;

	document.getElementById('hours-unit').innerHTML = addLeadingZero(hours);
	document.getElementById('minutes-unit').innerHTML = addLeadingZero(minutes);
	document.getElementById('seconds-unit').innerHTML = addLeadingZero(time_of_day);

	setTimeout(tickCountdown, 100);
}
function createTimeBlock(name, value) {
	let time_block = document.createElement("div");
	time_block.className = "time-block";

	let unit = document.createElement("div");
	unit.id = `${name}-unit`;
	unit.className = "time-unit";
	unit.innerHTML = addLeadingZero(value);

	let marker = document.createElement("div");
	marker.id = `${name}-marker`;
	marker.className = "time-marker";
	marker.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);

	time_block.prepend(unit);
	time_block.append(marker);

	return time_block;
}
function removeTimeBlock(name) {
	let unit = document.getElementById(`${name}-unit`);
	if (unit != null) {
		let block = unit.parentElement;
		let display = block.parentElement;
		display.removeChild(block);
	}
}
function resetDisplay() {
	let display = document.getElementById("display");
	let children = display.children;
	while (display.children[0].children[0].id != "hours-unit")
		display.children[0].remove();
}