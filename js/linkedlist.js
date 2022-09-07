import validate from "./utilities.js"
import {TIMEOUT} from "./utilities.js"
const container = document.getElementById('container');

const appendNode = async value =>{
    if(container.children.length < 1){
        container.insertAdjacentHTML('beforeend',createElement(value));
        await appearAnimation(container.children[0]);
    }else{
          //Add the arrow to the last element
    let lastElement = container.lastElementChild;
    lastElement.innerHTML += innerArrow() 

    //insert new node to the end
    container.insertAdjacentHTML('beforeend',createElement(value,innerArrow()));
    await appearAnimation(container.lastElementChild);
    await showArrowAnimation(lastElement.lastElementChild.querySelector('img'));
    lastElement.lastElementChild.querySelector('img').classList.remove('arrow-hidden');
    }
}

const insertNode = async (index,value)=>{
    if(index > 0){
        for(let i = 0; i <= index; i++){
            await highLightNodes(container.children[i].firstElementChild);
        }
    }
    let nodeElement = container.children[index];
    await displaceAnimation(nodeElement);
    nodeElement.insertAdjacentHTML('beforebegin',createElement(value,innerArrow()));

    nodeElement = container.children[index];
    nodeElement.innerHTML += innerArrow();
    await appearAnimation(nodeElement.firstElementChild);
    await showArrowAnimation(nodeElement.lastElementChild.querySelector('img'));
    nodeElement.lastElementChild.querySelector('img').classList.remove('arrow-hidden');
}

const removeNode = async index =>{
    let nodeElement = container.children[index];
    if(index > 0){
        for(let i = 0; i <= index; i++){
            await highLightNodes(container.children[i].firstElementChild);
        }
    }

    if(index == container.children.length - 1){
        await disappearAnimation(nodeElement);
        nodeElement.remove();
        await hideArrowAnimation(container.lastElementChild.lastElementChild.querySelector('img'));
        container.lastElementChild.lastElementChild.remove();
    }else{
        await hideArrowAnimation(nodeElement.lastElementChild.querySelector('img'));
        nodeElement.lastElementChild.querySelector('img').classList.add('arrow-hidden');
        await disappearAnimation(nodeElement);
        nodeElement.remove();
    }
}

const appearAnimation = element =>{
    return new Promise(resolve => {
        element.animate([{transform: "scale(0)"}, {transform: "scale(1)"}],{duration: 500 });
        setTimeout(() => {resolve()},500)
    })
}

const disappearAnimation = element =>{
    return new Promise(resolve => {
        element.animate([{transform: "scale(1)"}, {transform: "scale(0)"}],{duration: TIMEOUT });
        setTimeout(() => {resolve()},TIMEOUT)
        
    })
}

const showArrowAnimation = element =>{
    return new Promise(resolve => {
        element.animate([{transform: "translateX(-40px)"}, {transform: "translateX(0px)"}],{duration: TIMEOUT });
        resolve();
    })
}

const hideArrowAnimation = element =>{
    return new Promise(resolve => {
        element.animate([{transform: "translate(0px)"},{transform: "translate(-40px)"}],{duration: TIMEOUT});
        setTimeout(() => {resolve()},TIMEOUT - 20)
    })
}

const displaceAnimation = element =>{
    return new Promise(resolve => {
        element.animate([{paddingLeft: "0px"},{paddingLeft: "80px"},],{duration: TIMEOUT})
        setTimeout(() => {resolve();}, TIMEOUT - 10)
   
    });
}

const highLightNodes = element =>{
    return new Promise(resolve =>{
        element.animate([{backgroundColor: "white"},{backgroundColor: "rgb(0, 221, 29)"},{backgroundColor: "white"}],{duration: 1000, easing: "ease-out"})
        setTimeout(() => {resolve()},1000)
    });
}

const generateNodes = (value = 0) =>{
    let number = value == 0?Math.ceil(Math.random() * 100):value;

    return  `
    <div class="node">
        <div class="element">
        ${number}
        </div>
    </div>`
}

const createElement = value =>{
    return  `
    <div class="node">
        <div class="element">
        ${value}
        </div>
    </div>`
}


const innerArrow = () =>{
    return `<div class="arrow">
                <img class="arrow-hidden" src="../assets/images/arrow.png" alt="">
            </div> ` 
}

const addNodesToContainer = (container, values = []) =>{
    
    let nodesCount = values == values.length? 3 : values.length,
        element
    for(let i = 0; i < nodesCount; i++){
        if(values.length == 0) container.insertAdjacentHTML('beforeend',generateNodes());
        else container.insertAdjacentHTML('beforeend',generateNodes(values[i]));
        element = container.lastElementChild;
        element.innerHTML += innerArrow();
        element.lastElementChild.querySelector('img').classList.remove('arrow-hidden');
    }

    element.lastElementChild.remove();

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

const outOfIndex = (index,pannel) =>{
    let errorMessage = document.getElementById(pannel).querySelector('#error-message').lastElementChild;
    errorMessage.textContent = "Index out of range";    
    if(index > container.children.length - 1){
        errorMessage.parentNode.style.display  = "block";
        return true;
    }else{
        errorMessage.parentNode.style.display  = "none";
        return false;
    }
}

const isEmpty = (value,pannel) =>{
    let errorMessage = document.getElementById(pannel).querySelector('#error-message').lastElementChild;
    errorMessage.textContent = "Index cannot be empty";    
    if(value == ""){
        errorMessage.parentNode.style.display  = "block";
        return true;
    }else{
        errorMessage.parentNode.style.display  = "none";
        return false;
    }
}
document.getElementById('btn-create-empty').addEventListener('click', ()=> container.replaceChildren(''));

document.getElementById('btn-create-random').addEventListener('click', ()=>{
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


document.getElementById('btn-append-go').addEventListener('click', ()=>{
    let value = document.getElementById('append-data').querySelector('#txtValue').value;
    if(!isEmpty(value,'insert-action-panel')){
        appendNode(value);
    }
});

document.getElementById('btn-insert-go').addEventListener('click', ()=>{
    let value = document.getElementById('insert-data').querySelector('#txtValue').value,
    index = document.getElementById('insert-data').querySelector('#txtIndex').value;
    if(!outOfIndex(index,'insert-action-panel')&& !isEmpty(index,'insert-action-panel') && !isEmpty(value,'insert-action-panel')){
        insertNode(index,value);
    }
});

document.getElementById('btn-remove-go').addEventListener('click', ()=>{
    let index = document.getElementById('remove-action-panel').querySelector('#txtIndex').value;
    if(!outOfIndex(index,'remove-action-panel') && !isEmpty(index,'remove-action-panel')){
        removeNode(index);
    }
});

const panelButtons = {
    'btn-create': document.getElementById('create-action-panel'),
    'btn-insert': document.getElementById('insert-action-panel'),
    'btn-remove': document.getElementById('remove-action-panel')
};

document.getElementById('options').addEventListener('click',e =>{
    
    if(!panelButtons[e.target.id].classList.contains('hidden')){
        panelButtons[e.target.id].classList.add('hidden');
        return;
    }

    let buttons = Object.values(panelButtons);
    buttons.forEach(el => {
        if(!el.classList.contains('hidden')){
            el.classList.add('hidden');
        }else{
            
        }   
    });

    panelButtons[e.target.id].classList.remove('hidden');
 
})



addNodesToContainer(container);

