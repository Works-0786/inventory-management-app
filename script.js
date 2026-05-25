let items = [];
let nextId = 1;

const addButton = document.getElementById("addButton");

addButton.addEventListener("click", addItem);

function addItem() {
 const name = document.getElementById("productName").value;
 const stock = Number(document.getElementById("stockInput").value);

 if (name === "" || stock < 0 ) {
  alert("入力値を確認してください");
  return;
}

 const item = {
   id: nextId++,
   name: name,
   stock: stock
};

items.push(item);
console.log(items);

render();

document.getElementById("productName").value = "";
document.getElementById("stockInput").value = "";

document.getElementById("productName").focus();
}

function render() {
 const itemList = document.getElementById("itemList");

 itemList.innerHTML = "";//tbodyの中を一旦空にする

 items.forEach((item) => {
  let stockClass = "";

if (item.stock === 0) {
 stockClass = "zero-stock";
}

  const row = `
   <tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td class="${stockClass}">${item.stock}</td>
    <td>
      <button onclick="stockIn(${item.id})">+</button>
      <button onclick="stockOut(${item.id})">-</button>
      <button onclick="deleteItem(${item.id})">削除</button>
    </td>
   </tr>
  `;

 itemList.innerHTML += row; //今あるtbodyの中身に新しい<tr>を追加
 });

 localStorage.setItem("items", JSON.stringify(items));
}

function stockIn(id) {
 const item = items.find((item) => item.id === id);
 item.stock += 1;
 render();
}

function stockOut(id) {
 const item = items.find((item) => item.id === id);

 if(item.stock <= 0) {
  return;//在庫が0以下であれば出庫を止める
}

 item.stock -= 1;
 render();
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  render();
}

const savedItems = localStorage.getItem("items");

if (savedItems) {
 items = JSON.parse(savedItems);

 if (items.length > 0) {
 const ids = items.map((item) => {
 return item.id;
});

const maxId = Math.max(...ids);
nextId = maxId + 1;
 }
}
render();