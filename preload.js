const electron = require('electron')
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () =>
{
    document.querySelector('.seonLink').addEventListener("click", () =>
    {
        const reply = ipc.sendSync('seon-click')
    });

    document.querySelector('.iqsLink').addEventListener("click", () =>
    {
        const reply = ipc.sendSync('iqs-click')
    });
})