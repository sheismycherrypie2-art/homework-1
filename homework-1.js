const readline = require("node:readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  let number = 0;
  let total = 0;

  while (total + price <= budget) {
    number++;
    total += price;
  }

  return number;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  console.log(
    price !== 0
      ? `Категория ${category}, билет ${price} руб., ` +
          `бюджет ${budget} руб.: ` +
          `можно купить ${maxTickets(budget, price)} шт.`
      : "Неизвестная категория",
  );
}

function deliveryPrice(distance, total) {
  if (!(total < 3000)) {
    return 0;
  }
  if (distance <= 3) {
    return 0;
  } else if (4 <= distance && distance <= 10) {
    return 200;
  } else {
    return 200 + (distance - 10) * 25;
  }
}

function printDelivery(distance, total) {
  console.log(
    `Расстояние ${distance} км, заказ ${total} руб.: доставка ${deliveryPrice(distance, total)} руб.`,
  );
}

function printSteps(height) {
  let b = 0;
  for (let i = 1; i <= height; i++) {
    if (i == 4) {
      continue;
    }
    console.log(`Ступень ` + i);
    b++;
    if (i == 10) {
      console.log(`Дальше лестница не построена`);
      break;
    }
  }
  console.log(`Всего построено: ` + b);
}

async function main() {
  console.log("Выберите задачу:");
  console.log("1 — билетная касса");
  console.log("2 — доставка заказа");
  console.log("3 — лестница");

  const action = Number(await rl.question("Ваш выбор: "));

  switch (action) {
    case 1:
    //   console.log("Запускаем: Билетная касса");
      let category = Number(await rl.question("Категория билета: "));
      let budget = Number(await rl.question("Бюджет: "));

      printTicketResult(category, budget);
      break;

    case 2:
    //   console.log("Запускаем: Доставка заказа");
      let distance = Number(await rl.question("Расстояние: "));
      let total = Number(await rl.question("Сумма заказа: "));

      printDelivery(distance, total);
      break;

    case 3:
    //   console.log("Запускаем: Лестница");
      let height = Number(await rl.question("Высота лестницы: "));

      printSteps(height);
      break;

    default:
      console.log("Такой задачи нет");
  }

  rl.close();
}

main();
