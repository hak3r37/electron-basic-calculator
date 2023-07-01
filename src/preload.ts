import { ipcRenderer, contextBridge } from "electron";
import os from "os";

contextBridge.exposeInMainWorld("api", {
    threads: os.cpus().length,
});