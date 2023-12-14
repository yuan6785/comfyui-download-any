import { app } from "../../scripts/app.js";
import { $el, ComfyDialog } from "../../scripts/ui.js";
import { api } from "../../scripts/api.js";

class ManagerMenuDialogYx extends ComfyDialog {
    createControlsMid() {
        let self = this;

        let update_comfyui_button = $el("button.cm-button", {
            type: "button",
            textContent: "取消",
            onclick: () => console.log("取消"),
        });

        const res = [
            $el("button.cm-button", {
                type: "button",
                textContent: "确定",
                onclick: () => {
                    // if(!ModelInstaller.instance)
                    // 	ModelInstaller.instance = new ModelInstaller(app, self);
                    // ModelInstaller.instance.show();
                    // console.log("确定");
                    api
                        .fetchApi("/yxcda/helloworld")
                        .then((response) => response.text())
                        .then((data) => {
                            alert(data);
                        });
                },
            }),

            $el("br", {}, []),
            update_comfyui_button,

            $el("br", {}, []),
        ];

        return res;
    }

    createControlsLeft() {
        let self = this;
        return [];
    }

    createControlsRight() {
        const elts = [];
        return elts;
    }

    constructor() {
        super();
        // const update_check_checkbox = $el("input",{type:'checkbox', id:"skip_update_check"},[])
        const close_button = $el("button", {
            id: "yxcm-close-button",
            type: "button",
            textContent: "Close",
            onclick: () => this.close(),
        });

        const content = $el("div.comfy-modal-content", [
            $el("tr.cm-title", {}, [
                $el("font", { size: 6, color: "white" }, [`ComfyUI Manager Menu`]),
            ]),
            $el("br", {}, []),
            $el("div.cm-menu-container", [
                $el("div.cm-menu-column", [...this.createControlsLeft()]),
                $el("div.cm-menu-column", [...this.createControlsMid()]),
                $el("div.cm-menu-column", [...this.createControlsRight()]),
            ]),

            $el("br", {}, []),
            close_button,
        ]);

        content.style.width = "100%";
        content.style.height = "100%";

        this.element = $el(
            "div.comfy-modal",
            { id: "yxcm-manager-dialog", parent: document.body },
            [content]
        );
    }

    show() {
        this.element.style.display = "block";
    }
}

// 这里是全局的
let manager_instance_yx = null;

function setManagerInstance_yx(obj) {
    manager_instance_yx = obj;
}

const ext1 = {
    name: "YXCDA.DownloadAny",
    async init(app) {
        // Any initial setup to run as soon as the page loads
    },
    async setup(app) {
        // 第一种方式
        // app.ui.menuContainer.appendChild(
        //     $el("button.cm-button", {
        //         id: "yxcda-download-any-button",
        //         textContent: "download any",
        //         onclick: () => {
        //             // 可以弹出一个对话框，让用户选择下载哪个文件
        //             // console.log(1111111)
        //             // todo
        //             if(!manager_instance_yx){
        //                 setManagerInstance_yx(new ManagerMenuDialogYx());
        //             }
        // 		    manager_instance_yx.show();
        //         },
        //     })
        // );
        // 第二种方式
        const menu = document.querySelector(".comfy-menu");
        const separator = document.createElement("hr");

        separator.style.margin = "20px 0";
        separator.style.width = "100%";
        menu.append(separator);

        const managerButton = document.createElement("button");
        managerButton.textContent = "download any";
        managerButton.onclick = () => {
            if (!manager_instance_yx) {
                setManagerInstance_yx(new ManagerMenuDialogYx());
            }
            manager_instance_yx.show();
        };
        menu.append(managerButton);
    },
    async addCustomNodeDefs(defs, app) {
        // Add custom node definitions
        // These definitions will be configured and registered automatically
        // defs is a lookup core nodes, add yours into this
        // console.log("[logging]", "add custom node definitions", "current nodes:", Object.keys(defs));
    },
    async getCustomWidgets(app) {
        // Return custom widget types
        // See ComfyWidgets for widget examples
        // console.log("[logging]", "provide custom widgets");
    },
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        // Run custom logic before a node definition is registered with the graph
        // console.log("[logging]", "before register node: ", nodeType.comfyClass);
        // This fires for every node definition so only log once
        // applyNodeTranslationDef(nodeType, nodeData);
        // delete ext.beforeRegisterNodeDef;
    },
    async registerCustomNodes(app) {
        // Register any custom node implementations here allowing for more flexability than a custom node def
        // console.log("[logging]", "register custom nodes");
    },
    loadedGraphNode(node, app) {
        // Fires for each node when loading/dragging/etc a workflow json or png
        // If you break something in the backend and want to patch workflows in the frontend
        // This fires for every node on each load so only log once
        // delete ext.loadedGraphNode;
    },
    nodeCreated(node, app) {
        // Fires every time a node is constructed
        // You can modify widgets/add handlers/etc here
    },
};

app.registerExtension(ext1);
