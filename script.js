document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    let selectedGender = document.querySelector('input[name="gender"]:checked').value;
    let status = document.getElementById('status').value;

    document.querySelectorAll('input[name="gender"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            selectedGender = document.querySelector('input[name="gender"]:checked').value;
            console.log('Gender yang dipilih: ' + selectedGender);
        });
    });

    document.getElementById('status').addEventListener('change', function () {
        status = document.getElementById('status').value;
        console.log('Nilai Status:', status);
    });

    function sendData() {
        const url = 'https://gorest.co.in/public/v2/users';
        const data = {
            name: nameInput.value,
            email: emailInput.value,
            gender: selectedGender,
            status: status,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 606c242fd709f478b0a466e160e05864a1b1c8a8cf23587d8c871fafa7362bc7',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                appendAlert('User added successfully!', 'success');
            })
            .catch((error) => {
                console.error(error);
                const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
                appendAlert('Failed to add user', 'danger');
            });
    }

    function appendAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        document.getElementById('liveAlertPlaceholder').appendChild(wrapper);
    }

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); 
        sendData();
    });
});
