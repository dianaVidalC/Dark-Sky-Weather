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
    const root=$(".root");
    render(root);
})