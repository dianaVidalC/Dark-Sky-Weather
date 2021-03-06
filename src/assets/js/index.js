'use strict';

const render=(root)=>{
    root.empty();
    const section = $('<section class="components"></section>');

    if(state.nextPage == null){
        section.append(Portada(_=>render(root)));
        //section.append(Position());
    }else{
        section.append(state.nextPage(_=>render(root)));
    };
    root.append(section);
};
const state = {
    clima   : null,
    nextPage: null
}

$(_=>{
    const root=$(".root");
    render(root);
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
    }
})