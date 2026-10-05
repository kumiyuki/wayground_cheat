// ==UserScript==
// @name         kaede's quizizz anti-cheat bypass (bypass fullscreen)
// @namespace    https://github.com/kumiyuki/quizizz_cheat
// @version      2026-07-29
// @description  bypass wayground's "anti-cheating"
// @author       kaede
// @match        https://wayground.com/join/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wayground.com
// @license      GPL-3.0
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  ;(()=>{const e=Element.prototype.requestFullscreen,t=window?.history?.replaceState||history?.replaceState;window.location.href?.toString().includes("/join/pre-game")&&(Element.prototype.requestFullscreen=()=>{});const r=["left the tab","right-click","resized the window","paste","web extension"];window.history.replaceState=(...r)=>(window.location.href?.toString().includes("/join/pre-game")?Element.prototype.requestFullscreen=()=>{}:window.location.href?.toString().includes("/join/game")&&(Element.prototype.requestFullscreen=e),t.apply(window.history,r));let n=0,o=setInterval(()=>{const e=document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating;if("object"!=typeof e||Array.isArray(e)||null==e)return;const t=Object.keys(e??{});for(let e=0;e<t.length;e++){if("boolean"!=typeof document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating[t[e]])return;Object.defineProperty(document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating,t[e],{get:()=>!1})}return n+=250,n>=4e4?(n=0,clearInterval(o)):void 0},250),l=0,a=setInterval(()=>{const e=document.getElementsByClassName("modal-container");if(e.length>0)for(const t of e)t.querySelector(".fullscreen-exit-warning-container")&&(t.remove(),container_tries=0,clearInterval(a));if(l+=250,l>=15e4)return l=0,clearInterval(a)},250);new MutationObserver((e,t)=>{for(const t of e){if("childList"!==t.type)return;for(const e of t.addedNodes){if(1!==e.nodeType)return;e.classList.contains("modal-container")&&e.querySelector(".fullscreen-exit-warning-container")&&e.remove(),e.classList.contains("toast")&&e.classList.contains("toast-alert")&&e.querySelector(".title")&&r.some(t=>e.querySelector(".title").innerText?.toString().toLowerCase().replaceAll(" ","").replaceAll("-","").includes(t?.toString().toLowerCase().replaceAll(" ","").replaceAll("-","")))&&(e.style.display="none")}}}).observe(document.body,{childList:!0,subtree:!0});const i=window.XMLHttpRequest,s=window.fetch,c=e=>e.includes("playerinfraction")||e.includes("_anserver")||e.includes("sentry");window.XMLHttpRequest=class extends i{xhr_url;open(e,t){return this.xhr_url=t,super.open(e,t)}send(e){if(!0!==c(this.xhr_url?.toString().toLowerCase().replaceAll(" ","").replaceAll("-","")))return super.send(e)}},window.navigator.sendBeacon=(...e)=>{if(!0!==c(e[0]?.toString().toLowerCase().replaceAll(" ","").replaceAll("-","")))return s(...e)},window.fetch=(...e)=>{if(!0!==c(e[0]?.toString().toLowerCase().replaceAll(" ","").replaceAll("-","")))return s(...e)}})();
})();
