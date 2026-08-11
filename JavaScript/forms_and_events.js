// JavaScript source code
function Factorial()
{
    let numberElement = document.getElementById("number");
    let number = numberElement.value;
    let resultElement = document.getElementById("factorial-result");
    let f = BigInt(1);
    for (let i = 1n; i <= number; i++)
    {
        f *= i;
    }
    //resultElement.value = `${number}! = ${f}`;
    if (number >= 0) resultElement.innerHTML = `${number}! = ${f}`;
    else resultElement.innerHTML = "Введено отрицательное число!";
}
function Power()
{
    let baseElement = document.getElementById("base");
    let b = baseElement.value;
    let powerElement = document.getElementById("power");
    let pow = powerElement.value;
    let resultElement = document.getElementById("power-result");
    resultElement.innerHTML = `${b}^${pow} = ${b ** pow}`;
}
function Fibonacci()
{
    let numberElement = document.getElementById("max-number");
    let number = numberElement.value;
    let resultElement = document.getElementById("fibonacci-result");
    let indexElement = document.getElementById("max-index");
    let sequence = "";
    i = 1;
    while (FindThisFibonacci(i) < number)
    {
        sequence += FindThisFibonacci(i) + "...";
        i++;
    }
    indexElement.innerHTML = i-1;
    resultElement.innerHTML = sequence;
}
function FindThisFibonacci(n)
{
    if (n == 1) return 0;
    if (n == 2) return 1;
    let fib = [0, 1];
    for (let i = 2; i < n; i++)
    {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n-1];
}
///////////////////////////////////////////////////////////////
function setImage()
{
    let filename = document.getElementById("image-file");
    let reader = new FileReader();
    reader.onload = function (e)
    {
        document.getElementById("image").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
function setBackgroundColor(event)
{
    document.body.style.backgroundColor = event.target.value;
    console.log(event.target.id);
    //document.body.style.backgroundColor = document.getElementById("background-color").value;
    /*alert("setBackgroundColor");*/
}
function setForegroundColor()
{
    document.body.style.color = document.getElementById("foreground-color").value;
}
function setColor(event)
{
    /*
    -------------------------------
    ==   - сравнивает два значения;
    ===  - сравнивает два значения и типы этих значений.
    ===    возвраащет 'true' только в том случае, если совпадают как значения, так и типы
    -------------------------------
    */
    if (event.target.id === "background-color")
        document.body.style.backgroundColor = event.target.value;
    else
        document.body.style.color = event.target.value;
    console.log(event.target.id);
}