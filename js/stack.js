import validate from './utilities.js';
const container = document.getElementById('stack-container');
const TIMEOUT = 500;

let animationInProgress = false;

const pushNode = async (value) =>{
    animationInProgress = true;
    container.insertAdjacentHTML('beforeend', createElement(value));
    await pushNodeAnimation(container.lastElementChild);
    animationInProgress = false;
}
const popNode = async() =>{
    animationInProgress = true;
    let element = container.lastElementChild;
    await popNodeAnimation(element);
    element.remove();
    animationInProgress = false;
}

const pushNodeAnimation = (element) =>{
    return new Promise((resolve) => {
        element.animate([{transform: "translateY(-400px)"},{transform: "translateY(0px)"}],TIMEOUT);
        setTimeout(() =>{
            resolve();
        }, TIMEOUT);
    });
}


const popNodeAnimation = (element) =>{
    return new Promise((resolve) => {
        element.animate([{transform: "translateY(0px)"},{transform: "translateY(-600px)"}],TIMEOUT);
        setTimeout(() =>{
            resolve();
        }, TIMEOUT-15);
    });
}

const createElement = (value = 0)=>{

    let number = value == 0?Math.ceil(Math.random() * 100):value;

    return `<div class="stack-node">
        ${number}
    </div>`
}

const addNodesToContainer = (container, values = []) =>{

    let nodesCount = values.length==0? 3 : values.length;

    for(let i = 0; i < nodesCount; i++){
        if(values.length == 0){
            container.insertAdjacentHTML('beforeend',createElement());
        }else{
            container.insertAdjacentHTML('beforeend',createElement(values[i]));
        }
    }
}

const validateInput = (string) =>{
    let pattern = /^\d+(,\d+)*$/gm,
    errorMessage = document.getElementById('error-message');

    if(validate(pattern,string)){   
        errorMessage.style.display  = "none";
        return true;
    }else{
        errorMessage.style.display  = "block";
        return false;
    }

}

const isEmpty = (value) =>{
    let errorMessage = document.getElementById('push-action-panel').querySelector('#error-message').lastElementChild;
    errorMessage.textContent = "Value cannot be empty";    
    if(value == ""){
        errorMessage.parentNode.style.display  = "block";
        return true;
    }else{
        errorMessage.parentNode.style.display  = "none";
        return false;
    }
}
document.getElementById('btn-create-empty').addEventListener('click', ()=> container.replaceChildren(''));

document.getElementById('btn-create-random').addEventListener('click', ()=>
{
    container.replaceChildren('');
    addNodesToContainer(container);
})
    

document.getElementById('btn-create-go').addEventListener('click', ()=>{
    let expression = document.getElementById('txtElements').value;
    if(validateInput(expression)){
        container.replaceChildren('');
        let values = expression.split(',');
        addNodesToContainer(container,values);
    }
});


document.getElementById('btn-push-go').addEventListener('click', ()=>{
    if(!animationInProgress){
        let value = document.getElementById('txtValue').value;
        if(!isEmpty(value)){
            pushNode(value);
        }
    }
});

document.getElementById('btn-pop').addEventListener('click', ()=>{
    if(container.children.length != 0){
        if(!animationInProgress){
            popNode();
        }
    }
});

const panelButtons = {
    'btn-create': document.getElementById('create-action-panel'),
    'btn-push': document.getElementById('push-action-panel'),
};

document.getElementById('options').addEventListener('click',e =>{
    if(e.target.id != 'btn-pop') {
        if(!panelButtons[e.target.id].classList.contains('hidden')){
            panelButtons[e.target.id].classList.add('hidden');
            return false;
        }

        let buttons = Object.values(panelButtons);
        buttons.forEach(el => {
            if(!el.classList.contains('hidden')){
                el.classList.add('hidden');
            }
        });
        panelButtons[e.target.id].classList.remove('hidden');
    }
})


addNodesToContainer(container);