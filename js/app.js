import { registrarPWA } from './pwa.js';
import { productos } from './modules/catalogo.js';
registrarPWA();
const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(n);
let category='Todos', cart={};
try { const saved=JSON.parse(localStorage.getItem('dulce-carrito') || '{}'); for(const p of productos) {const q=saved[p.id];if(Number.isInteger(q)&&q>0&&q<=99)cart[p.id]=q;} } catch {}
let timer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),2400);}
function renderProducts(){
 const query=$('search').value.trim().toLocaleLowerCase('es');
 const list=productos.filter(p=>(category==='Todos'||p.categoria===category)&&`${p.nombre} ${p.descripcion}`.toLocaleLowerCase('es').includes(query));
 $('resultsTitle').textContent=category==='Todos'?'Nuestros favoritos':category;
 $('resultsCount').textContent=`${list.length} productos`;
 $('empty').hidden=list.length>0;
 $('products').replaceChildren(...list.map(p=>{
  const card=document.createElement('article');card.className='product';
  const wrap=document.createElement('div');wrap.className='product-image';const img=document.createElement('img');img.src=p.imagen;img.alt=p.nombre;img.loading='lazy';wrap.append(img);
  const title=document.createElement('h3');title.textContent=p.nombre;const desc=document.createElement('p');desc.textContent=p.descripcion;
  const bottom=document.createElement('div');bottom.className='product-bottom';const price=document.createElement('span');price.className='price';price.textContent=money(p.precio);
  const add=document.createElement('button');add.className='add';add.textContent='+';add.setAttribute('aria-label',`Añadir ${p.nombre}`);add.onclick=()=>{if((cart[p.id]||0)>=99){toast('Máximo 99 por producto');return;}cart[p.id]=(cart[p.id]||0)+1;renderCart();toast('Añadido a tu carrito');};
  bottom.append(price,add);card.append(wrap,title,desc,bottom);return card;
 }));
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
}
function renderCart(){
 try{localStorage.setItem('dulce-carrito',JSON.stringify(cart));}catch{}
 $('count').textContent=Object.values(cart).reduce((a,b)=>a+b,0);
 const lines=productos.filter(p=>cart[p.id]);let total=0;
 $('cartItems').replaceChildren(...lines.map(p=>{
  total+=p.precio*cart[p.id];const row=document.createElement('div');row.className='cart-item';
  const img=document.createElement('img');img.src=p.imagen;img.alt='';const info=document.createElement('div');const h=document.createElement('h3');h.textContent=p.nombre;const price=document.createElement('p');price.textContent=money(p.precio*cart[p.id]);info.append(h,price);
  const controls=document.createElement('div');controls.className='quantity';const minus=document.createElement('button');minus.textContent='−';minus.setAttribute('aria-label',`Quitar uno de ${p.nombre}`);minus.onclick=()=>{if(--cart[p.id]===0)delete cart[p.id];renderCart();};
  const qty=document.createElement('span');qty.textContent=cart[p.id];const plus=document.createElement('button');plus.textContent='+';plus.setAttribute('aria-label',`Añadir uno de ${p.nombre}`);plus.disabled=cart[p.id]>=99;plus.onclick=()=>{cart[p.id]++;renderCart();};controls.append(minus,qty,plus);row.append(img,info,controls);return row;
 }));
 if(!lines.length){const p=document.createElement('p');p.textContent='Tu carrito está vacío. Elige algo del menú.';$('cartItems').append(p);}
 $('total').textContent=money(total);
}
$('search').addEventListener('input',renderProducts);
$('searchForm').onsubmit=e=>{e.preventDefault();renderProducts();$('catalogo').scrollIntoView({behavior:'smooth'});};
document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{category=b.dataset.category;renderProducts();});
document.querySelectorAll('[data-nav]').forEach(a=>a.onclick=()=>{category=a.dataset.nav;renderProducts();});
document.querySelector('nav a').onclick=()=>{category='Todos';$('search').value='';renderProducts();};
$('openCart').onclick=()=>{$('cart').showModal();};$('closeCart').onclick=()=>$('cart').close();
$('cart').onclick=e=>{if(e.target===$('cart')){const r=$('cart').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('cart').close();}};
let promptEvent;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;$('install').hidden=false;});
$('install').onclick=async()=>{if(!promptEvent)return;await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;$('install').hidden=true;};
window.addEventListener('appinstalled',()=>{$('install').hidden=true;});
renderProducts();renderCart();
