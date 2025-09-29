const form = document.getElementById('formPresupuesto');
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');
const producto = document.getElementById('producto');
const plazo = document.getElementById('plazo');
const extras = document.querySelectorAll('.form-check-input');
const presupuestoFinal = document.getElementById('presupuestoFinal');

function validarNombre(value) {
    return /^[A-Za-zÀ-ÿ\s]{1,15}$/.test(value);
}
function validarApellidos(value) {
    return /^[A-Za-zÀ-ÿ\s]{1,40}$/.test(value);
}
function validarTelefono(value) {
    return /^[0-9]{1,9}$/.test(value);
}

function calcularPresupuesto() {
    let total = parseFloat(producto.value) || 0;

    // Extras
    extras.forEach(extra => {
        if (extra.checked) total += parseFloat(extra.value);
    });

    // Descuento por cantidad
    let cantidad = parseInt(plazo.value) || 1;
    total *= cantidad;
    if (cantidad >= 10) total *= 0.85; // 15% descuento
    else if (cantidad >= 5) total *= 0.9; // 10% descuento

    presupuestoFinal.value = total.toFixed(2) + " €";
}

producto.addEventListener('change', calcularPresupuesto);
plazo.addEventListener('input', calcularPresupuesto);
extras.forEach(extra => extra.addEventListener('change', calcularPresupuesto));

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarNombre(nombre.value)) { alert("Nombre no válido"); return; }
    if (!validarApellidos(apellidos.value)) { alert("Apellidos no válidos"); return; }
    if (!validarTelefono(telefono.value)) { alert("Teléfono no válido"); return; }
    if (!email.checkValidity()) { alert("Correo no válido"); return; }
    if (!document.getElementById('aceptarCondiciones').checked) {
        alert("Debes aceptar las condiciones");
        return;
    }

    alert("Formulario enviado correctamente!\nPresupuesto: " + presupuestoFinal.value);
    form.reset();
    calcularPresupuesto();
});

calcularPresupuesto();
