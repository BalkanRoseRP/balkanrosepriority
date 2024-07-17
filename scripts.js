// scripts.js

// Add any JavaScript functionality here if needed
console.log('Script loaded.');




// Inicijalizacija PayPal SDK-a
paypal.Buttons({
    createOrder: function(data, actions) {
        // Funkcija koja kreira novu PayPal narudžbinu
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('amount').value // Dobijanje iznosa iz polja
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Funkcija koja se izvršava kada korisnik odobri plaćanje
        return actions.order.capture().then(function(details) {
            // U ovoj funkciji možete dodati dodatnu logiku nakon uspešnog plaćanja
            alert('Plaćanje uspešno! Transakcija ID: ' + details.id);
        });
    }
}).render('#paypal-button-container'); // Povezivanje gumba sa odgovarajućim HTML elementom

// Obrada forme za PayPal plaćanje
document.getElementById('paypalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Sprječavanje podrazumevanog ponašanja forme

    // Dobijanje iznosa koji je unet u polje
    var amount = parseFloat(document.getElementById('amount').value);

    // Validacija - provera da li je iznos validan broj
    if (isNaN(amount) || amount <= 0) {
        alert('Molimo unesite validan iznos.');
        return;
    }

    // Pozivanje funkcije za kreiranje narudžbine sa PayPal-om
    paypal.Buttons().createOrder({
        purchase_units: [{
            amount: {
                value: amount.toFixed(2) // Zaokruživanje iznosa na 2 decimale
            }
        }]
    });
});



var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
});
