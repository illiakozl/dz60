const myOrdersButton = document.getElementById('my-orders-button');

myOrdersButton.addEventListener('click', () => {
  // При кліку на кнопку "Мої замовлення" ховаємо список категорій
  const categories = document.getElementById('categories');
  categories.style.display = 'none';

  // Відображаємо список усіх замовлень користувача
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const ordersList = document.getElementById('orders-list');

  ordersList.innerHTML = ''; // Очищаємо список перед виведенням

  if (orders.length === 0) {
    ordersList.innerHTML = 'У вас немає замовлень.';
  } else {
    orders.forEach((order, index) => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');
      orderItem.innerHTML = `<p>Замовлення #${index + 1}</p><p>Дата: ${order.date}</p><p>Ціна: ${order.price}</p><button class="view-order-button">Переглянути</button><button class="delete-order-button" data-index="${index}">Видалити</button>`;
      ordersList.appendChild(orderItem);
    });

    // Додайте обробники подій для кнопок "Переглянути" та "Видалити"
    const viewOrderButtons = document.querySelectorAll('.view-order-button');
    const deleteOrderButtons = document.querySelectorAll('.delete-order-button');

    viewOrderButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Відобразити деталі замовлення за індексом index
        displayOrderDetails(orders[index]);
      });
    });

    deleteOrderButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Видалити замовлення за індексом, який зберігається у атрибуті data-index
        const index = button.getAttribute('data-index');
        deleteOrder(index);
      });
    });
  }
});
function displayOrderDetails(order) {
    // Відобразити деталі замовлення (наприклад, в модальному вікні)
    alert(`Деталі замовлення:\nДата: ${order.date}\nЦіна: ${order.price}\nДеталі: ${order.details}`);
  }
  
  function deleteOrder(index) {
    // Видалити замовлення за індексом та оновити список замовлень
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // Поновити відображення списку замовлень
    const myOrdersButton = document.getElementById('my-orders-button');
    myOrdersButton.click(); // Симулюємо клік на кнопку "Мої замовлення" для перезавантаження списку
  }
// При оформленні нового замовлення
const newOrder = {
    date: new Date().toLocaleString(),
    price: // ціна товару,
    details: // інша інформація про замовлення,
  };
  
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
    