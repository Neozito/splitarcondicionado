'use strict';
const PHONE='5545991080072';
const waUrl=message=>`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('.wa-link').forEach(link=>{link.href=waUrl(link.dataset.message||'Olá, Split! Gostaria de mais informações.');link.target='_blank';link.rel='noopener noreferrer'});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const anchors=[...document.querySelectorAll('.nav a')], sections=[...document.querySelectorAll('main section[id]')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){anchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-35% 0px -55% 0px'});sections.forEach(section=>observer.observe(section))}
document.getElementById('year').textContent=new Date().getFullYear();
// Social profiles must be confirmed by the business. Never link to a guessed profile.
document.querySelectorAll('[data-social]').forEach(link=>link.addEventListener('click',event=>{if(link.getAttribute('href')==='#'){event.preventDefault();window.alert('O perfil oficial desta rede social ainda não foi configurado.')}}));
const filters=[...document.querySelectorAll('.filter')], gallery=[...document.querySelectorAll('.gallery-item')];
filters.forEach(button=>button.addEventListener('click',()=>{const cat=button.dataset.filter;filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});gallery.forEach(item=>{item.hidden=cat!=='all'&&item.dataset.category!==cat})}));
const modal=document.getElementById('lightbox'),modalImg=modal.querySelector('img'),modalText=modal.querySelector('figcaption');let current=0,oldFocus=null;
function visibleGallery(){return gallery.filter(item=>!item.hidden)}
function showGallery(idx){const items=visibleGallery();current=(idx+items.length)%items.length;let item=items[current];modalImg.src=item.querySelector('img').src;modalImg.alt=item.querySelector('img').alt;modalText.textContent=item.dataset.caption}
function openGallery(item){oldFocus=document.activeElement;modal.hidden=false;document.body.classList.add('modal-open');showGallery(visibleGallery().indexOf(item));modal.querySelector('.lightbox-close').focus()}
function closeGallery(){modal.hidden=true;document.body.classList.remove('modal-open');modalImg.removeAttribute('src');oldFocus?.focus()}
gallery.forEach(item=>item.addEventListener('click',()=>openGallery(item)));
modal.querySelector('.lightbox-close').addEventListener('click',closeGallery);
modal.querySelector('.lightbox-prev').addEventListener('click',()=>showGallery(current-1));
modal.querySelector('.lightbox-next').addEventListener('click',()=>showGallery(current+1));
modal.addEventListener('click',event=>{if(event.target===modal)closeGallery()});
document.addEventListener('keydown',event=>{if(modal.hidden)return;if(event.key==='Escape')closeGallery();if(event.key==='ArrowRight')showGallery(current+1);if(event.key==='ArrowLeft')showGallery(current-1)});
const form=document.getElementById('quote-form'),formError=document.getElementById('form-error');
form.addEventListener('submit',event=>{event.preventDefault();formError.hidden=true;if(!form.reportValidity())return;const values=new FormData(form),name=String(values.get('nome')||'').trim(),tel=String(values.get('telefone')||'').trim(),service=String(values.get('servico')||'').trim(),neighborhood=String(values.get('bairro')||'').trim(),message=String(values.get('mensagem')||'').trim();if(name.length<2||tel.replace(/\D/g,'').length<10||!service||!message){formError.textContent='Preencha nome, telefone válido, serviço e mensagem antes de continuar.';formError.hidden=false;return}const full=`Olá, Split! Gostaria de solicitar um orçamento pelo site.\n\n*Nome:* ${name}\n*Telefone:* ${tel}\n*Serviço:* ${service}\n${neighborhood?`*Bairro/cidade:* ${neighborhood}\n`:''}*Mensagem:* ${message}`;const url=waUrl(full);const child=window.open(url,'_blank','noopener,noreferrer');if(!child)window.location.href=url});
