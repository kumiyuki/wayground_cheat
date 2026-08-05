// You can leave the tab without noticing teacher (or game dashboard.)
// This script will remove the forced fullscreen mode in Wayground. (The "Full screen mode required" popup will never appear again).
// The script will remove "Your teacher has been alerted that you left the tab." toast message.

;(() => {
  // Prevent sending fullscreen mode on start when user is on route "/join/pre-game/"
  const _old_request_fullscreen = Element.prototype.requestFullscreen;
  const _old_replace_state = window?.history?.replaceState || history?.replaceState;
  if (window.location.href?.toString().includes("/join/pre-game")) {
    Element.prototype.requestFullscreen = () => {};
  }

  // It seems like they have added paste detection and web extension detection.
  const toast_content_block = ["left the tab", "right-click", "resized the window", "paste", "web extension"]; // if the toast (notification)'s content includes these, they will be ignored'

  window.history.replaceState = (...data) => {
    // Check for changes in the url
    if (window.location.href?.toString().includes("/join/pre-game")) {
      Element.prototype.requestFullscreen = () => {};
    } else if (window.location.href?.toString().includes("/join/game")) {
      Element.prototype.requestFullscreen = _old_request_fullscreen;
    }

    // Call the old .replaceState() function
    return _old_replace_state.apply(window.history, data);
  }

  // disable the "antiCheating" in the game option settings
  let _disable_anticheating_tries = 0;
  let _disable_anticheating_settings = setInterval(() => {
    // make sure the "antiCheating" settings exist
    const anti_cheating_option = document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating;
    if (typeof anti_cheating_option !== "object" || Array.isArray(anti_cheating_option) || anti_cheating_option === undefined || anti_cheating_option === null)
      return;

    // get all boolean keys and disable it
    const all_keys = Object.keys(anti_cheating_option ?? {});
    for (let i = 0; i < all_keys.length; i++) {
      // make sure the value data type of the key is boolean
      if (typeof document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating[all_keys[i]] !== "boolean")
        return;

      // set it to false
      Object.defineProperty(document.querySelector("#root")?.__vue_app__?.config?.globalProperties?.$pinia?.state?.value?.gameData?.gameOptions?.antiCheating, all_keys[i], {
        get() { return false }
      })
    }

    // add 250ms to the counter
    _disable_anticheating_tries += 250;

    // clear interval if after 40 seconds passed to prevent lag
    if (_disable_anticheating_tries >= 40000) {
      _disable_anticheating_tries = 0;
      return clearInterval(_disable_anticheating_settings);
    }
  }, 250);

  // Delete the blocking element
  let container_modal_removal_tries = 0;
  let _removal_modaL_container = setInterval(() => {
    // remove the warning container
    const model_container = document.getElementsByClassName("modal-container");
    if (model_container.length > 0) {
      for (const _c_el of model_container) {
        if (_c_el.querySelector(".fullscreen-exit-warning-container")) {
          _c_el.remove();
          container_tries = 0;
          clearInterval(_removal_modaL_container);
        }
      }
    }

    // add 250ms to the counter
    container_modal_removal_tries += 250;

    // clear interval if after 2.5 minutes passed to prevent lag
    if (container_modal_removal_tries >= 150000) {
      container_modal_removal_tries = 0;
      return clearInterval(_removal_modaL_container);
    }
  }, 250)

  new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type !== "childList") return;
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeType !== 1) return;

        // Remove exit fullscreen warning
        if (addedNode.classList.contains("modal-container")) {
          if (addedNode.querySelector(".fullscreen-exit-warning-container")) { addedNode.remove(); }
        }

        // Remove the "Your teacher has been alerted that you left the tab." toast message.
        if (addedNode.classList.contains("toast") && addedNode.classList.contains("toast-alert")) {
          if (addedNode.querySelector(".title") && toast_content_block.some((value) => addedNode.querySelector(".title").innerText?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "").includes(value?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", ""))) ) {
            addedNode.style.display = "none";
          }
        }
      }
    }
  }).observe(document.body, { childList: true, subtree: true });

  // from the login script
  const original_xhr = window.XMLHttpRequest;
  const o_fetch = window.fetch;

  const blacklist_url = (url) => url.includes("playerinfraction") || url.includes("_anserver") || url.includes("sentry");

  window.XMLHttpRequest = class extends original_xhr {
    xhr_url;
    open(method, url) { this.xhr_url = url; return super.open(method, url); }
    send(body) {
      // This only block their anti-cheating testing stage (early development)
      // if (this.xhr_url?.toString().toLowerCase().replaceAll(" ", "").includes("createtestgameactivity")) return;
      
      // The new API (sending anti-cheating signal): https://wayground.com/_gameapi/main/public/v1/games/{game_hash}/player-infraction
      // They also report the time through: https://fnl.wayground.com/_anserverv2/main/api/v1/frontend
      if (blacklist_url(this.xhr_url?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "")) === true) return;
      return super.send(body);
    }
  }

  window.navigator.sendBeacon = (...data) => {
    if (blacklist_url(data[0]?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "")) === true) return;
    return o_fetch(...data);
  }

  window.fetch = (...data) => {
    if (blacklist_url(data[0]?.toString().toLowerCase().replaceAll(" ", "").replaceAll("-", "")) === true) return;
    return o_fetch(...data);
  }
})();
