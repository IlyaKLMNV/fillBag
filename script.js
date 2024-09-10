function fillBag(balls, capacity) {
    // Начальные переменные
    const totalBalls = balls.reduce((sum, count) => sum + count, 0); // Всего шаров на складе

    // Если шаров на складе меньше, чем вместимость мешка, грабитель берет все шары
    if (totalBalls <= capacity) {
        return balls; // Возвращаем весь массив, так как грабитель заберет всё
    }

    const proportions = balls.map(count => count / totalBalls); // Пропорции шаров
    let bag = new Array(balls.length).fill(0); // Шары в мешке (массив на выходе)
    
    // Цель 1: Полностью заполнить мешок
    let remainingCapacity = capacity;

    // Пробуем взять шары пропорционально
    for (let i = 0; i < balls.length; i++) {
        let take = Math.floor(proportions[i] * capacity); // Сколько можно взять шаров данного цвета
        if (take > balls[i]) {
            take = balls[i]; // Не можем взять больше, чем есть на складе
        }
        bag[i] = take; // Добавляем в мешок
        remainingCapacity -= take; // Уменьшаем оставшуюся вместимость
    }

    // Цель 2: Пропорция менее важна. Заполняем оставшееся место максимально возможными шарами
    let index = 0;
    while (remainingCapacity > 0) {
        if (balls[index] > bag[index]) { // Если есть шары этого цвета
            bag[index]++; // Добавляем еще один шар в мешок
            remainingCapacity--; // Уменьшаем оставшееся место
        }
        index = (index + 1) % balls.length; // Переходим к следующему цвету
    }

    return bag;
}

// Ввод данных через prompt
const balls = prompt("Введите количество шаров разных цветов через запятую:").split(",").map(Number);
const capacity = Number(prompt("Введите вместимость мешка:"));

// Получаем результат
const result = fillBag(balls, capacity);

// Вывод результата через alert
alert("Шары, которые взял грабитель: " + result.join(", "));
