const form = document.querySelector('#appointment-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const specialist = formData.get('specialist');
    const date = formData.get('date');
    const time = formData.get('time');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    console.log(`Programar cita con ${specialist} en ${date} a ${time} para ${name} (${email} - ${phone})`);

    alert(`Cita programada! Recibirá un correo electrónico de confirmación en ${email}`);

    form.reset();
});