let importeCompras = 0;
let importeVentas = 0;

function cleanControls() {
  document.getElementById('descriptionText').value = '';
  document.getElementById('submount').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  cleanControls();
});

let ingresar = document.getElementById('ingresar');
let tabla = document.getElementsByTagName('tbody');
let descripcion = document.getElementById('descriptionText');
let compra = document.getElementById('inputCompra');
let venta = document.getElementById('inputVenta');
let basico = document.getElementById('ivaBasico');
let minimo = document.getElementById('ivaMinimo');
let exento = document.getElementById('ivaExtento');
let subtotal = document.getElementById('submount');
let resultado = document.getElementById('resultado');

ingresar.addEventListener('click', () => {
  if (descripcion.value != '' && subtotal.value != '') {
    let transaccion = undefined;
    let iva = undefined;

    transaccion = compra.checked
      ? (transaccion = 'Compra')
      : (transaccion = 'Venta');
    iva = basico.checked ? (iva = 22) : minimo.checked ? (iva = 10) : (iva = 0);

    tabla[0].innerHTML += `
      <tr>
         <td>${descripcion.value}</td>
         <td>${transaccion}</td>
         <td>${subtotal.value}</td>
         <td>${iva}</td>
         <td>${subtotal.value * (iva / 100) + parseFloat(subtotal.value)}</td>
      </tr>`;

    setLocalStorage({
      descripcion: descripcion.value,
      transaccion: transaccion,
      subtotal: subtotal.value,
      iva: iva,
    });

    if (transaccion == 'Compra') {
      importeCompras +=
        parseFloat(subtotal.value) * (parseFloat(iva) / 100) +
        parseFloat(subtotal.value);
      document.getElementById('compras').innerHTML = '$' + `${importeCompras}`;
    } else if (transaccion == 'Venta') {
      importeVentas +=
        parseFloat(subtotal.value) * (parseFloat(iva) / 100) +
        parseFloat(subtotal.value);
      document.getElementById('ventas').innerHTML = '$' + `${importeVentas}`;
    }

    cleanControls();
  } else {
    alert(
      'Asegurese de llenar todos los campos y marcar al menos una opción de cada tipo'
    );
  }
});

const getLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem('transacciones'));
  if (!data) {
    data = [];
    importeCompras = 0;
    document.getElementById('compras').innerHTML = '$' + `${importeCompras}`;
    importeVentas = 0;
    document.getElementById('ventas').innerHTML = '$' + `${importeVentas}`;
  } else {
    for (const datos of data) {
      let { descripcion, transaccion, subtotal, iva } = datos;
      iva = parseFloat(iva);
      subtotal = parseFloat(subtotal);
      tabla[0].innerHTML += `
      <tr>
         <td>${descripcion}</td>
         <td>${transaccion}</td>
         <td>${subtotal}</td>
         <td>${iva}</td>
         <td>${subtotal * (iva / 100) + parseFloat(subtotal)}</td>
      </tr>`;

      if (transaccion == 'Compra') {
        importeCompras +=
          parseFloat(subtotal) * (parseFloat(iva) / 100) + parseFloat(subtotal);
        document.getElementById('compras').innerText = '';
        document.getElementById('compras').innerHTML =
          '$' + `${importeCompras}`;
      } else if (transaccion == 'Venta') {
        importeVentas +=
          parseFloat(subtotal) * (parseFloat(iva) / 100) + parseFloat(subtotal);
        document.getElementById('ventas').innerHTML = '$' + `${importeVentas}`;
      }
    }
  }
};

const setLocalStorage = (data) => {
  let datos = JSON.parse(localStorage.getItem('transacciones'));
  if (!datos) {
    datos = [data];
  } else {
    datos.push(data);
  }
  localStorage.setItem('transacciones', JSON.stringify(datos));
};

getLocalStorage();

basico.addEventListener('click', () => {
  calcularTotal(basico.checked ? 22 : minimo.checked ? 10 : 0);
});
minimo.addEventListener('click', () => {
  calcularTotal(basico.checked ? 22 : minimo.checked ? 10 : 0);
});
exento.addEventListener('click', () => {
  calcularTotal(basico.checked ? 22 : minimo.checked ? 10 : 0);
});
subtotal.addEventListener('input', () => {
  calcularTotal(basico.checked ? 22 : minimo.checked ? 10 : 0);
});

const calcularTotal = (iva) => {
  console.log('Cambiando');
  let importe =
    parseFloat(subtotal.value) * (parseFloat(iva) / 100) +
    parseFloat(subtotal.value);
  if (subtotal.value) {
    resultado.innerText = parseFloat(importe);
  } else {
    resultado.innerText = '';
  }
};
