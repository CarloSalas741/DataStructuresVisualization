import"./style.c0ed6924.js";import{T as l,v}from"./utilities.c6a3a2cd.js";const r=document.getElementById("container"),w=async e=>{if(r.children.length<1)r.insertAdjacentHTML("beforeend",m(e)),await d(r.children[0]);else{let t=r.lastElementChild;t.innerHTML+=c(),r.insertAdjacentHTML("beforeend",m(e)),await d(r.lastElementChild),await E(t.lastElementChild.querySelector("img")),t.lastElementChild.querySelector("img").classList.remove("arrow-hidden")}},C=async(e,t)=>{if(e>0)for(let a=0;a<=e;a++)await y(r.children[a].firstElementChild);let n=r.children[e];await I(n),n.insertAdjacentHTML("beforebegin",m(t)),n=r.children[e],n.innerHTML+=c(),await d(n.firstElementChild),await E(n.lastElementChild.querySelector("img")),n.lastElementChild.querySelector("img").classList.remove("arrow-hidden")},b=async e=>{let t=r.children[e];if(e>0)for(let n=0;n<=e;n++)await y(r.children[n].firstElementChild);e==r.children.length-1?(await g(t),t.remove(),await h(r.lastElementChild.lastElementChild.querySelector("img")),r.lastElementChild.lastElementChild.remove()):(await h(t.lastElementChild.querySelector("img")),t.lastElementChild.querySelector("img").classList.add("arrow-hidden"),await g(t),t.remove())},d=e=>new Promise(t=>{e.animate([{transform:"scale(0)"},{transform:"scale(1)"}],{duration:500}),setTimeout(()=>{t()},500)}),g=e=>new Promise(t=>{e.animate([{transform:"scale(1)"},{transform:"scale(0)"}],{duration:l}),setTimeout(()=>{t()},l)}),E=e=>new Promise(t=>{e.animate([{transform:"translateX(-40px)"},{transform:"translateX(0px)"}],{duration:l}),t()}),h=e=>new Promise(t=>{e.animate([{transform:"translate(0px)"},{transform:"translate(-40px)"}],{duration:l}),setTimeout(()=>{t()},l-20)}),I=e=>new Promise(t=>{e.animate([{paddingLeft:"0px"},{paddingLeft:"80px"}],{duration:l}),setTimeout(()=>{t()},l-10)}),y=e=>new Promise(t=>{e.animate([{backgroundColor:"white"},{backgroundColor:"rgb(0, 221, 29)"},{backgroundColor:"white"}],{duration:1e3,easing:"ease-out"}),setTimeout(()=>{t()},1e3)}),p=(e=0)=>`
    <div class="node">
        <div class="element">
        ${e==0?Math.ceil(Math.random()*100):e}
        </div>
    </div>`,m=e=>`
    <div class="node">
        <div class="element">
        ${e}
        </div>
    </div>`,c=()=>`<div class="arrow">
                <img class="arrow-hidden" src="../assets/arrow.png" alt="">
            </div> `,u=(e,t=[])=>{let n=t==t.length?3:t.length,a;for(let s=0;s<n;s++)t.length==0?e.insertAdjacentHTML("beforeend",p()):e.insertAdjacentHTML("beforeend",p(t[s])),a=e.lastElementChild,a.innerHTML+=c(),a.lastElementChild.querySelector("img").classList.remove("arrow-hidden");a.lastElementChild.remove()},L=e=>{let t=/^\d+(,\d+)*$/gm,n=document.getElementById("error-message");return v(t,e)?(n.style.display="none",!0):(n.style.display="block",!1)},f=(e,t)=>{let n=document.getElementById(t).querySelector("#error-message").lastElementChild;return n.textContent="Index out of range",e>r.children.length-1?(n.parentNode.style.display="block",!0):(n.parentNode.style.display="none",!1)},o=(e,t)=>{let n=document.getElementById(t).querySelector("#error-message").lastElementChild;return n.textContent="Index cannot be empty",e==""?(n.parentNode.style.display="block",!0):(n.parentNode.style.display="none",!1)};document.getElementById("btn-create-empty").addEventListener("click",()=>r.replaceChildren(""));document.getElementById("btn-create-random").addEventListener("click",()=>{r.replaceChildren(""),u(r)});document.getElementById("btn-create-go").addEventListener("click",()=>{let e=document.getElementById("txtElements").value;if(L(e)){r.replaceChildren("");let t=e.split(",");u(r,t)}});document.getElementById("btn-append-go").addEventListener("click",()=>{let e=document.getElementById("append-data").querySelector("#txtValue").value;o(e,"insert-action-panel")||w(e)});document.getElementById("btn-insert-go").addEventListener("click",()=>{let e=document.getElementById("insert-data").querySelector("#txtValue").value,t=document.getElementById("insert-data").querySelector("#txtIndex").value;!f(t,"insert-action-panel")&&!o(t,"insert-action-panel")&&!o(e,"insert-action-panel")&&C(t,e)});document.getElementById("btn-remove-go").addEventListener("click",()=>{let e=document.getElementById("remove-action-panel").querySelector("#txtIndex").value;!f(e,"remove-action-panel")&&!o(e,"remove-action-panel")&&b(e)});const i={"btn-create":document.getElementById("create-action-panel"),"btn-insert":document.getElementById("insert-action-panel"),"btn-remove":document.getElementById("remove-action-panel")};document.getElementById("options").addEventListener("click",e=>{if(!i[e.target.id].classList.contains("hidden")){i[e.target.id].classList.add("hidden");return}Object.values(i).forEach(n=>{n.classList.contains("hidden")||n.classList.add("hidden")}),i[e.target.id].classList.remove("hidden")});u(r);
