import validate from './utilities.js'
const container = document.getElementById('container');
const TIMEOUT = 500;

let animationInProgress = false;

const sort = async (container) =>{
    animationInProgress = true;
    let size = container.children.length,
        nodes = [...container.children],
        sorted;

    nodes.map(el => {el.classList.remove('highlight')});
    do{
        sorted = false;
        for(let i = 0; i < size - 1; i++){
            await highLightNodes(nodes[i], nodes[i+1]);
            let number1 = Number(nodes[i].children[0].textContent),
                number2 = Number(nodes[i + 1].children[0].textContent);
            if(number1 > number2){
                await animateSwitch(nodes[i], nodes[i+1]);
                let aux = number1;
                nodes[i].children[0].textContent = number2;
                nodes[i+1].children[0].textContent = aux;
                sorted = true;
            }
        }
    }while(sorted);
    animationInProgress = false;
    nodes.map(el => {
        el.classList.add('highlight');
    });
} 


const highLightNodes = (node1, node2) =>{
    return new Promise((resolve) =>{
        node1.classList.add("highlight");
        node2.classList.add("highlight");

        setTimeout(()=>{
            node1.classList.remove("highlight");
            node2.classList.remove("highlight");
            resolve();
        }, TIMEOUT);
    });
}

const animateSwitch = (node1, node2) =>{
    return new Promise((resolve) => {
        node1.children[0].animate([{transform: "translate(0)"},{transform: "translate(100px)"}],TIMEOUT);
        node2.children[0].animate([{transform: "translate(0)"},{transform: "translate(-100px)"}],TIMEOUT);
        highLightNodes(node1,node2);
        setTimeout(()=>{
            resolve();
        },TIMEOUT);
    });


}

const generateNodes = (value = 0) =>{
    
    let number = value == 0?Math.ceil(Math.random() * 100):value;

    return `<div class="box">
                <div>${number}</div>
            </div>` 
}

const addNodesToContainer= (container, values = []) =>{

    container = document.getElementById('container');

    let nodesCount = values.length == 0 ? 12 : values.length;

    for(let i = 0; i <= nodesCount - 1; i++){
        if(values.length == 0){
            container.insertAdjacentHTML('beforeend', generateNodes());
        }else container.insertAdjacentHTML('beforeend', generateNodes(values[i]));
    }

}

const showActionsPanel =() =>{

    let actionPanel = document.getElementById('action-panel'),
        hidden = actionPanel.classList.contains('hidden');

    if(hidden){
        actionPanel.classList.remove('hidden');
    }else{
        actionPanel.classList.add('hidden');
    }
}

document.getElementById('btn-create').addEventListener('click',showActionsPanel);

document.getElementById('btn-sort').addEventListener('click', ()=>{
    if(!animationInProgress){
        sort(container);
    }
});

document.getElementById('btn-create-random').addEventListener('click',()=>{
    container.replaceChildren('');
    addNodesToContainer(container);
    animationInProgress = false;
});

document.getElementById('btn-create-go').addEventListener('click', ()=>{
    let expression = document.getElementById('txtElements').value;
    if(validateInput(expression)){
        container.replaceChildren('');
        let values = expression.split(',')
        addNodesToContainer(container,values);
        animationInProgress = false;
    }
});

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

addNodesToContainer(container);



