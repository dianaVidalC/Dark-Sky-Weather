'use strict';

const Portada=(root)=>{
    const div=$('<div class=container></div>');
    const h1=$('<h1>'+state.clima.timezone+'</h1>');

    div.append(h1);

    return div;
}

/*
const Position=()=>{
    function initMap()
    {
        let latitude, longitude;
        function getLocation() {
            if (navigator.geolocation) {
                console.log(navigator.geolocation);
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                alert("La Geolocalización no es soportada por este navegador.");
            }
        }
        function showPosition(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        }

        $(_ => {

            $.get("http://api.darksky.net/forecast/b827519c64115648b838cb739b674f3a/" + latitude + ',' + longitude, (json) => {
                state.clima = json;
                console.log(state.clima);
            })
        })
    }
}*/
