import"./style.c0ed6924.js";import{T as s,v as c}from"./utilities.c6a3a2cd.js";const n=document.getElementById("queue-container");let r=!1;const u=async e=>{r=!0,n.insertAdjacentHTML("afterbegin",i(e)),await g(n.firstElementChild),r=!1},m=async()=>{r=!0;let e=n.lastElementChild;await f(e),e.remove(),r=!1},g=e=>new Promise(t=>{e.animate([{transform:"translateX(-400px)"},{transform:"translateX(0px)"}],s),setTimeout(()=>{t()},s)}),f=e=>new Promise(t=>{e.animate([{transform:"translateX(0px)"},{transform:"translateX(600px)"}],s),setTimeout(()=>{t()},s-15)}),i=(e=0)=>`<div class="queue-node">
        ${e==0?Math.ceil(Math.random()*100):e}
    </div>`,o=(e,t=[])=>{let a=t.length==0?3:t.length;for(let l=0;l<a;l++)t.length==0?e.insertAdjacentHTML("beforeend",i()):e.insertAdjacentHTML("beforeend",i(t[l]))},p=e=>{let t=/^\d+(,\d+)*$/gm,a=document.getElementById("error-message");return c(t,e)?(a.style.display="none",!0):(a.style.display="block",!1)},y=e=>{let t=document.getElementById("queue-action-panel").querySelector("#error-message").lastElementChild;return t.textContent="Value cannot be empty",e==""?(t.parentNode.style.display="block",!0):(t.parentNode.style.display="none",!1)};document.getElementById("btn-create-empty").addEventListener("click",()=>n.replaceChildren(""));document.getElementById("btn-create-random").addEventListener("click",()=>{n.replaceChildren(""),o(n)});document.getElementById("btn-create-go").addEventListener("click",()=>{let e=document.getElementById("txtElements").value;if(p(e)){n.replaceChildren("");let t=e.split(",");o(n,t)}});document.getElementById("btn-queue-go").addEventListener("click",()=>{if(!r){let e=document.getElementById("txtValue").value;y(e)||u(e)}});document.getElementById("btn-dequeue").addEventListener("click",()=>{n.children.length!=0&&(r||m())});const d={"btn-create":document.getElementById("create-action-panel"),"btn-queue":document.getElementById("queue-action-panel")};document.getElementById("options").addEventListener("click",e=>{if(e.target.id!="btn-dequeue"){if(!d[e.target.id].classList.contains("hidden"))return d[e.target.id].classList.add("hidden"),!1;Object.values(d).forEach(a=>{a.classList.contains("hidden")||a.classList.add("hidden")}),d[e.target.id].classList.remove("hidden")}});o(n);
