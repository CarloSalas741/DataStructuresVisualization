import"./style.c0ed6924.js";import{v as u,T as l}from"./utilities.c6a3a2cd.js";const r=document.getElementById("container");let a=!1;const f=async e=>{a=!0;let n=e.children.length,t=[...e.children],i;t.map(s=>{s.classList.remove("highlight")});do{i=!1;for(let s=0;s<n-1;s++){await h(t[s],t[s+1]);let o=Number(t[s].children[0].textContent),c=Number(t[s+1].children[0].textContent);if(o>c){await p(t[s],t[s+1]);let g=o;t[s].children[0].textContent=c,t[s+1].children[0].textContent=g,i=!0}}}while(i);a=!1,t.map(s=>{s.classList.add("highlight")})},h=(e,n)=>new Promise(t=>{e.classList.add("highlight"),n.classList.add("highlight"),setTimeout(()=>{e.classList.remove("highlight"),n.classList.remove("highlight"),t()},l)}),p=(e,n)=>new Promise(t=>{e.children[0].animate([{transform:"translate(0)"},{transform:"translate(100px)"}],l),n.children[0].animate([{transform:"translate(0)"},{transform:"translate(-100px)"}],l),h(e,n),setTimeout(()=>{t()},l)}),m=(e=0)=>`<div class="box">
                <div>${e==0?Math.ceil(Math.random()*100):e}</div>
            </div>`,d=(e,n=[])=>{e=document.getElementById("container");let t=n.length==0?12:n.length;for(let i=0;i<=t-1;i++)n.length==0?e.insertAdjacentHTML("beforeend",m()):e.insertAdjacentHTML("beforeend",m(n[i]))},L=()=>{let e=document.getElementById("action-panel");e.classList.contains("hidden")?e.classList.remove("hidden"):e.classList.add("hidden")};document.getElementById("btn-create").addEventListener("click",L);document.getElementById("btn-sort").addEventListener("click",()=>{a||f(r)});document.getElementById("btn-create-random").addEventListener("click",()=>{r.replaceChildren(""),d(r),a=!1});document.getElementById("btn-create-go").addEventListener("click",()=>{let e=document.getElementById("txtElements").value;if(E(e)){r.replaceChildren("");let n=e.split(",");d(r,n),a=!1}});const E=e=>{let n=/^\d+(,\d+)*$/gm,t=document.getElementById("error-message");return u(n,e)?(t.style.display="none",!0):(t.style.display="block",!1)};d(r);
