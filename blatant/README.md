# blatant
> [!note]
> - description: this script no longer works due to new API changes.
> - usage: use the `qexc("command here")` function to load command. If you need help, use: `qexc("help")`.

To install the script, you need to:
1. install tampermonkey
2. click on the raw link: https://github.com/kaedesuu/wayground_cheat/raw/refs/heads/master/blatant/wayground_cheat.user.js
3. press `Install`

## how to use
This will only work after you installed the tampermonkey script:
1. open Devtools by using `F12` or `Ctrl + Shift + I`.
2. then type in `qexc("help")` for the help page.
3. type command by: `qexc("put command inside here and do not remove the quote")`

## structure
- [./index.js](./index.js): the main file, not minified.
- [./index.min.js](./index.min.js): the minified version of the main file
- [./wayground_cheat.user.js](./wayground_cheat.user.js): use for tampermonkey userscript.
- [./wayground_cheat_ws.js](./wayground_cheat_ws.js): this version allows user to control the script from a different devices using websocket, however, it requires setup a seperate server which is not worth trying out.
