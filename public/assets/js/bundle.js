'use strict';

const render=(root)=>{
    root.empty();
    const section = $('<section class="components"></section>');

    if(state.nextPage == null){
        section.append(Portada(_=>render(root)));
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
    let latitude, longitude;
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
    }
    $.get("http://api.darksky.net/forecast/b827519c64115648b838cb739b674f3a/"+latitude+','+longitude,(json)=> {
        state.clima=json;
        const root=$(".root");
        render(root);
    })
})
'use strict';

const Portada=(root)=>{
    const div=$('<div class=container></div>');
    const h1=$('<h1>'+state.clima.timezone+'</h1>');

    div.append(h1);

    return div;
}

const position=()=>{

}