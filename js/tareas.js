const categoria = document.querySelector('#categoria');
const tarea = document.querySelector('#tarea');
const selPrioridad = document.querySelector('#prioridad');
const btnAddTarea = document.querySelector('#btn-addTarea');

const cardContainer = document.querySelector('#cardContainer');

const classPrioridades = ['bg-alta', 'bg-media', 'bg-baja'];

let secCatergoria = 0;  // mantiene el nro de secuencia para identificador de Categoría
let secTarea = 0;  // mantiene el nro de secuencia para identificador de Tarea

const historicoCategoriasOptions = document.querySelector('#categoriasOptions');
const historicoTareasOptions = document.querySelector('#tareasOptions');

btnAddTarea.addEventListener("click", e => {
    e.preventDefault();
    
    if(categoria.value.trim() === '' || tarea.value.trim() === '' || selPrioridad.value === -1 ){
        return;
    }

    const cardCol = document.createElement('div');
    cardCol.classList.add('col-4','p-1');

    let cardCategoria;
    if(!existeCardCategoria(categoria.value)){
        cardCategoria = crearCard(categoria.value, tarea.value, false);
        cardCol.appendChild(cardCategoria);
        cardContainer.appendChild(cardCol);
    }else{
        crearCard(categoria.value, tarea.value, true);
    }

    agregarHistorico(historicoCategoriasOptions, categoria.value);
    agregarHistorico(historicoTareasOptions, tarea.value);

    // limpio controles
    categoria.value = '';
    tarea.value = ''
    selPrioridad.value = -1;

    categoria.focus();
});

function crearCard(categoria, tarea, existeCategoria){
    let card, cardBody;

    if(!existeCategoria){
        card = document.createElement('div');
        card.classList.add('card', 'bg-light', 'bg-opacity-50');
        
        cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('d-flex', 'justify-content-between');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = categoria;
        titleContainer.appendChild(cardTitle);

        const btnClose = document.createElement('button');
        btnClose.type = 'button';
        btnClose.classList.add('btn-close');
        btnClose.setAttribute('aria-label', 'Close');
        btnClose.addEventListener('click', e => {
            let colCart = card.parentNode;
            colCart.parentNode.removeChild(colCart);
        });
        titleContainer.appendChild(btnClose);

        cardBody.appendChild(titleContainer);
    }else{
        cardTitle = Array.from(document.querySelectorAll('.card .card-body .card-title')).find( e => e.textContent === categoria);
        cardBody = cardTitle.parentNode.parentNode;
        card = cardBody.parentNode;
    }

    const accordionTarea = document.createElement('div');
    accordionTarea.classList.add('accordion');
    secCatergoria++;
    accordionTarea.id = `accordionTarea${secCatergoria}`;

    cardBody.appendChild(accordionTarea);
    accordionTarea.appendChild(crearAccordionItem(accordionTarea.id, tarea));

    return card;
}

function crearAccordionItem(accordionTareaId, tarea){
    const accordionItem = document.createElement('div');
    const classPrioridad = classPrioridades[selPrioridad.value];

    accordionItem.classList.add('accordion-item');
    
    const accTitle = document.createElement('h2');
    accTitle.classList.add('accordion-header');
    secTarea++;
    accTitle.id = `headingTarea${secTarea}`;

    const accButton = document.createElement('button');
    accButton.classList.add('accordion-button', 'collapsed', 'p-2', classPrioridad);
    accButton.type = 'button';
    accButton.setAttribute('data-bs-toggle', 'collapse');
    accButton.setAttribute('data-bs-target', `#collapsTarea${secTarea}`);
    accButton.setAttribute('aria-expanded','false');
    accButton.setAttribute('aria-controls',`collapsTarea${secTarea}`);
    accButton.innerText = tarea;

    const accDetalle = crearAccordionDetalle(accordionTareaId, accTitle.id, `collapsTarea${secTarea}`);

    accTitle.appendChild(accButton);
    accordionItem.appendChild(accTitle);
    accordionItem.appendChild(accDetalle);

    return accordionItem;
}

function crearAccordionDetalle(accordionTareaId, headingTareaId, collapsTareaId){
    const accDetalle = document.createElement('div');
    const accBody = document.createElement('div');

    accDetalle.classList.add('accordion-collapse', 'collapse');
    accDetalle.setAttribute('aria-labelledby', headingTareaId);
    accDetalle.setAttribute('data-bs-parent', `#${accordionTareaId}`);
    accDetalle.id = collapsTareaId;

    accBody.classList.add('accordion-body', 'p-2');

    const textContainer = document.createElement('div');

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control', 'comentario-tarea');
    textarea.placeholder = 'Comentarios...'
    textarea.id = `comentarioTarea${secTarea}`;

    textContainer.appendChild(textarea);

    accBody.appendChild(textContainer);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('d-flex', 'justify-content-end');

    btnContainer.appendChild(crearBotonSuccess(accordionTareaId));
    btnContainer.appendChild(crearBotonDelete(accordionTareaId));

    accDetalle.appendChild(accBody);
    accDetalle.appendChild(btnContainer);

    return accDetalle;
}

function crearBotonSuccess(accordionTareaId){
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-success', 'btn-sm', 'm-2');
    btn.type = 'button';
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';

    btn.addEventListener('click', e => {
        let tareaFinalizar = document.getElementById(accordionTareaId);
        tareaFinalizar.classList.add('text-decoration-line-through');
        let btnCollapse = tareaFinalizar.querySelector('button');
        btnCollapse.click();
    });

    return btn;
}

function crearBotonDelete(accordionTareaId){
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'm-2');
    btn.type = 'button';
    btn.innerHTML = '<i class="fa-solid fa-x"></i>';

    btn.addEventListener('click', e => {
        let tareaEliminar = document.getElementById(accordionTareaId);
        tareaEliminar.parentNode.removeChild(tareaEliminar);
    });

    return btn;
}

function agregarHistorico(hisstoricoOptions, item){
    if(existeOptionValue(hisstoricoOptions, item)){
        return;
    }

    const opctionItem = document.createElement('option');
    opctionItem.textContent = item;

    if(hisstoricoOptions.children.length === 10){
        hisstoricoOptions.removeChild(hisstoricoOptions.firstChild);
    }

    hisstoricoOptions.appendChild(opctionItem);
}

function existeOptionValue(dataList, optionValue){
    
    for(let i = 0; i < dataList.children.length; i++){
        if(dataList.children.item(i).value === optionValue) return true;
    }

    return false;
}

function existeCardCategoria(nombreCategoria){
    let cardCategiria = Array.from(document.querySelectorAll('.card-title')).find(e => e.textContent === nombreCategoria);

    return cardCategiria !== undefined;
}
