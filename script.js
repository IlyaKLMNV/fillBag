function fillBag(balls, capacity) {
    // Начальные переменные
    const totalBalls = balls.reduce((sum, count) => sum + count, 0); // Всего шаров на складе
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

// Пример использования
const balls = [20, 10, 30, 10, 6];
const capacity = 14;
const result = fillBag(balls, capacity);
console.log(result);
