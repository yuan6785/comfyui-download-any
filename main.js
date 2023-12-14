import { app } from "../../scripts/app.js";
import { $el } from "../../scripts/ui.js";



	

	
const ext = {
	name: "YXCDA.DownloadAny",
	async init(app) {
		// Any initial setup to run as soon as the page loads
		
	},
	async setup(app) {
		app.ui.menuContainer.appendChild(
			$el("button.yxcda-download-any", {
				id: "yxcda-download-any-button",
				textContent: "download any",
				onclick: () => {
					console.log(1111111)
				},
			}));
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
	}
};

app.registerExtension(ext);