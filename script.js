const apiKey = "99bb610dbfbc4a499dc50943251201";
const apiUrl = "http://api.weatherapi.com/v1";
const tempText = document.getElementById("temp");
const feelsLikeText = document.getElementById("feels-like");
const city = document.getElementById("location");
const button = document.getElementById("search");
const updateMes = document.getElementById("last-updated");

button.addEventListener("click", () => {
    const locus = city.value;
    if (locus) {
        fetchWeather(locus).then(() => unhideUpdate());
    }
});

function unhideUpdate() {
    let hiddenMessage = document.getElementsByClassName("update-message");
    for (let i = 0; i < 2; i++) {
        if (hiddenMessage[i].offsetWidth > 0 && hiddenMessage[i].offsetHeight > 0) {
            hiddenMessage[i].style.visibility = "visible";
        }
    }
}

function fetchWeather(location) {
    const url = `${apiUrl}/current.json?key=${apiKey}&q=${city.value}`;
    const urlTime = `${apiUrl}/timezone.json?key=${apiKey}&q=${city.value}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            tempText.innerHTML = data.current.temp_f;
            feelsLikeText.innerHTML = data.current.feelslike_f;
            updateMes.innerHTML = data.current.last_updated;
        })
        .catch(error => {
            const errorMessage = "Error fetching weather information: ";
            console.log(errorMessage, error);
            alert(errorMessage + "(check console for more information)");
        });
}