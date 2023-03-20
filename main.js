const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
// const ul = document.querySelector('ul');

const empty = document.querySelector('.empty');
const selectPrioridad = document.querySelector('.prioridad');

const classPrioridad = ["alta", "media", "baja"];


addBtn.addEventListener("click", e => {
    e.preventDefault();
    const text = input.value;
    const prioridad = selectPrioridad.value;

    if(text !== "" && prioridad !== "-1" ){
        const ul = document.querySelector(".ul-"+classPrioridad[prioridad]);
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.textContent = text;

        li.classList.add("li-"+classPrioridad[prioridad]);

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        li.appendChild(addOkBtn());

        ul.insertBefore(li,  document.querySelectorAll(".li-"+classPrioridad[prioridad])[0]);

        input.value = "";
        empty.style.display = "none";
    }
});

function addDeleteBtn(){
    const deleteBtn = document.createElement("button");
    
    // deleteBtn.textContent = "X";
    deleteBtn.innerHTML = "&#x1F5D9;";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", e=>{
        const li = e.target.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);

        if(document.getElementsByTagName("li").length === 0){
            empty.style.display = "block";
        }
    });

    return deleteBtn;
}

function addOkBtn(){
    const okBtn = document.createElement("button");
    
    okBtn.innerHTML = "&check;";
    okBtn.className = "btn-ok";

    okBtn.addEventListener("click", e=>{
        const li = e.target.parentNode;

        li.getElementsByTagName("p")[0].classList.add("finalizada");
    });

    return okBtn;
}