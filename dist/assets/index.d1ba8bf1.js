import{r as d,o as f,c as m,a as p,b as _,d as h,e as v}from"./vendor.addaab3b.js";const y=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};y();var b=(i,n)=>{for(const[s,r]of n)i[s]=r;return i};const g={},E={class:"main"};function L(i,n){const s=d("router-view");return f(),m("div",E,[p(s)])}var A=b(g,[["render",L]]);const O="modulepreload",c={},P="/",a=function(n,s){return!s||s.length===0?n():Promise.all(s.map(r=>{if(r=`${P}${r}`,r in c)return;c[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":O,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((l,u)=>{o.addEventListener("load",l),o.addEventListener("error",u)})})).then(()=>n())},k=()=>a(()=>import("./index.4e7e1b49.js"),["assets/index.4e7e1b49.js","assets/index.f7d5fbef.css","assets/vendor.addaab3b.js"]),x=()=>a(()=>import("./index.541780d5.js"),["assets/index.541780d5.js","assets/index.730bcc22.css","assets/vendor.addaab3b.js"]),w=[{path:"/",name:"Home",component:k},{path:"/about",name:"About",component:x}],N=_({history:h(),routes:w});const R=v(A);R.use(N).mount("#app");export{b as _};
