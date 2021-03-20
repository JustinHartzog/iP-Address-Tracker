let dots = document.querySelectorAll('.lds-ellipsis');
let input = document.getElementById('input');
let button = document.getElementById('button');
let form = document.querySelector('#form');
let ip = document.getElementsByClassName('ip');
let locations = document.getElementsByClassName('location');
let timezone = document.getElementsByClassName('timezone');
let isp = document.getElementsByClassName('isp');
var inputHight = document.getElementById('input').clientHeight;
button.style.height = inputHight + "px";

var mymap = L.map('mapid').setView([37.38605, -122.08385], 13);

function adjustHeights() {
    var card = document.getElementById('card').clientHeight;
    document.getElementById("bannerContents").style.marginBottom = card * -.5 + "px";
    let banner = document.getElementById('banner').clientHeight;
    let map = document.getElementById('mapid');
    map.style.height = window.innerHeight - banner + "px";
};

adjustHeights();

window.addEventListener("load", () => loadEdit(), false);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    loadEdit();
});

async function loadEdit() {
    ip[0].innerText = "";
    locations[0].innerText = "";
    timezone[0].innerText = "";
    isp[0].innerText = "";
    dots[0].style.display = 'inline-block';
    dots[1].style.display = 'inline-block';
    dots[2].style.display = 'inline-block';
    dots[3].style.display = 'inline-block';
    const res = await axios.get('https://geo.ipify.org/api/v1?apiKey=at_fxcdkDos5D47VhcgkAkw07ncyyjKC&ipAddress=' + input.value);
    dots[0].style.display = 'none';
    dots[1].style.display = 'none';
    dots[2].style.display = 'none';
    dots[3].style.display = 'none';
    ip[0].innerText = res.data.ip;
    locations[0].innerText = res.data.location.city + ", " + res.data.location.region + " " + res.data.location.postalCode;
    timezone[0].innerText = "UTC " + res.data.location.timezone;
    isp[0].innerText = res.data.isp;
    mymap.setView([res.data.location.lat, res.data.location.lng], 13);
    var marker = L.marker([res.data.location.lat, res.data.location.lng]).addTo(mymap);

    adjustHeights();
    input.value = "";
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVzdGluaGFydHpvZyIsImEiOiJja2tmcW5ycHUwNjRyMzJwZDMzZjNiOGpqIn0.E7gihRDcrBkh2w4KUPnAmA'
}).addTo(mymap);


/*

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const res = await axios.get('https://geo.ipify.org/api/v1?apiKey=at_fxcdkDos5D47VhcgkAkw07ncyyjKC&ipAddress=' + input.value);
    console.log(res.data.location);
    ip[0].innerText = res.data.ip;
    locations[0].innerText = res.data.location.city + ", " + res.data.location.region + " " + res.data.location.postalCode;
    timezone[0].innerText = "UTC " + res.data.location.timezone;
    isp[0].innerText = res.data.isp;
    mymap.setView([res.data.location.lat, res.data.location.lng], 13);
    var marker = L.marker([res.data.location.lat, res.data.location.lng]).addTo(mymap);

    console.log("https://geo.ipify.org/api/v1?apiKey=at_fxcdkDos5D47VhcgkAkw07ncyyjKC&ipAddress=" + input.value);
    input.value = "";
})

*/