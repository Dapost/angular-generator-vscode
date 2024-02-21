const vscode = require('vscode');

const defaultSettings = {
	"component": [],
	"directive": [],
	"service": [],
	"interceptor": [],
	"module": [],
	"pipe": [],
	"guard": [],
}

// Inizialize the configurazion
function initializeDefaultSettings() {
	const settings = vscode.workspace.getConfiguration('angular-generate-vscode');
	for (const setting in defaultSettings) {
		if (defaultSettings.hasOwnProperty(setting) && !settings.has(setting)) {
			settings.update(setting, defaultSettings[setting]);
		}
	}
}
initializeDefaultSettings()

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "angular-generate" is now active!');

	const component = vscode.commands.registerCommand('angular-generate.component',
		(event) => generate(event, componentOptions, 'component')
	);
	context.subscriptions.push(component);

	const directive = vscode.commands.registerCommand('angular-generate.directive',
		(event) => generate(event, directiveOptions, 'directive')
	);
	context.subscriptions.push(directive);

	const service = vscode.commands.registerCommand('angular-generate.service',
		(event) => generate(event, serviceOptions, 'service')
	);
	context.subscriptions.push(service);

	const interceptor = vscode.commands.registerCommand('angular-generate.interceptor',
		(event) => generate(event, interceptorOptions, 'interceptor')
	);
	context.subscriptions.push(interceptor);

	const module = vscode.commands.registerCommand('angular-generate.module',
		(event) => generate(event, moduleOptions, 'module')
	);
	context.subscriptions.push(module);

	const pipe = vscode.commands.registerCommand('angular-generate.pipe',
		(event) => generate(event, pipeOptions, 'pipe')
	);
	context.subscriptions.push(pipe);

	const guard = vscode.commands.registerCommand('angular-generate.guard',
		(event) => generate(event, guardOptions, 'guard')
	);
	context.subscriptions.push(guard);

	const environments = vscode.commands.registerCommand('angular-generate.environments',
		() => generateEnvironments()
	);
	context.subscriptions.push(environments);
}

// This method is called when your extension is deactivated
function deactivate() {}

async function generate(event, options, entity) {
	const capitalizeEntity = entity.at(0).toUpperCase() + entity.slice(1)
	const name = await vscode.window.showInputBox({
		title: `${capitalizeEntity} Name`
	});

	const [workspacePath, relativePath] = event.path.split('src/app')

	const quickPick = vscode.window.createQuickPick();
	quickPick.title = `Select ${entity} options`;
	quickPick.items = options;

	//Pre-pick favourite options
	const favourites = vscode.workspace.getConfiguration('angular-generate-vscode')
		.get(entity)

	quickPick.items = quickPick.items.map(item => ({
		...item,
		picked: favourites.some(fav => fav == item.description)
	}))

	quickPick.onDidTriggerItemButton(({
		item
	}) => _saveItemToFavourite(entity, item.description))

	quickPick.onDidAccept((options) => {
		const optionsJoined = quickPick.selectedItems.map(opt => opt.description).join(' ')

		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`cd ${workspacePath}`)
		terminal.sendText(`ng generate ${entity} ${relativePath}/${name} ${optionsJoined}`)
	})
	quickPick.show()

	vscode.window.showInformationMessage(`${capitalizeEntity} ${name} generated!`);
}


function _saveItemToFavourite(entity, optionDescription) {
	const settings = vscode.workspace.getConfiguration('angular-generate-vscode');
	settings.update(entity, optionDescription, vscode.ConfigurationTarget.Global)
}

function generateEnvironments() {
	const terminal = vscode.window.createTerminal();
	terminal.show();
	terminal.sendText(`ng generate environments`)
	vscode.window.showInformationMessage(`Environments generated!`);
}

const componentOptions = [{
		label: "Standalone",
		detail: "Generate a standalone component without module imports. (Available from v14+)",
		description: '--standalone',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]
	},
	{
		label: "Not Standalone",
		detail: "Generate a not standalone component, in v.17+ standalone components are default",
		description: '--standalone=false',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Change Detection: OnPush",
		detail: "Generate a component with change detection set to OnPush.",
		description: '--change-detection OnPush',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Display Block",
		detail: "Generate a component with display set to block in its styles.",
		description: '--display-block',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Skip Test",
		detail: "Generate a component without accompanying test files.",
		description: '--skip-tests',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Flat",
		detail: "Generate the component files in the same directory, without creating a separate folder.",
		description: '--flat',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Inline Template",
		detail: "Generate the component with the template defined inline in the component file.",
		description: '--inline-template',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Inline Style",
		detail: "Generate the component with the styles defined inline in the component file.",
		description: '--inline-style',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "Skip Import",
		detail: "Generate the component without importing it into the nearest module file.",
		description: '--skip-import',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "View Encapsulation: None",
		detail: "Generate the component with view encapsulation set to None.",
		description: '--view-encapsulation None',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	},
	{
		label: "View Encapsulation: ShadowDom",
		detail: "Generate the component with view encapsulation set to ShadowDom.",
		description: '--view-encapsulation ShadowDom',
		buttons: [{
			iconPath: new vscode.ThemeIcon('star-empty'),
			tooltip: 'Add to favourites'
		}]

	}
]

const serviceOptions = [{
	label: "Skip Test",
	detail: "Generate a service without accompanying test files.",
	description: '--skip-tests'
}]

const moduleOptions = [{
		label: "Flat",
		detail: "Generate the module file in the same directory, without creating a separate folder.",
		description: '--flat'
	},
	{
		label: "Add router",
		detail: "Generate router module in the same directory",
		description: '--routing'
	},
]

const guardOptions = [{
		label: "Functional",
		detail: "Specifies whether to generate a guard as a function.",
		description: '--functional'
	},
	{
		label: "Skip Test",
		detail: "Generate a directive without accompanying test files.",
		description: '--skip-tests'
	},
]

const pipeOptions = [{
		label: "Standalone",
		detail: "Generate a standalone directive without module imports. (Available from v14+)",
		description: '--standalone'
	},
	{
		label: "Not Standalone",
		detail: "Generate a not standalone directive, in v.17+ standalone directives are default",
		description: '--standalone=false'
	},
	{
		label: "Skip Test",
		detail: "Generate a directive without accompanying test files.",
		description: '--skip-tests'
	},
	{
		label: "Skip Import",
		detail: "Generate the directive without importing it into the nearest module file.",
		description: '--skip-import'
	}
]

const directiveOptions = [{
		label: "Standalone",
		detail: "Generate a standalone directive without module imports. (Available from v14+)",
		description: '--standalone'
	},
	{
		label: "Not Standalone",
		detail: "Generate a not standalone directive, in v.17+ standalone directives are default",
		description: '--standalone=false'
	},
	{
		label: "Skip Test",
		detail: "Generate a directive without accompanying test files.",
		description: '--skip-tests'
	},
	{
		label: "Flat",
		detail: "Generate the directive files in the same directory, without creating a separate folder.",
		description: '--flat'
	},
	{
		label: "Skip Import",
		detail: "Generate the directive without importing it into the nearest module file.",
		description: '--skip-import'
	}
]

const interceptorOptions = [{
		label: "Functional",
		detail: "Specifies whether to generate a guard as a function.",
		description: '--functional'
	},
	{
		label: "Skip Test",
		detail: "Generate a directive without accompanying test files.",
		description: '--skip-tests'
	},
]

const environmentOptions = []

module.exports = {
	activate,
	deactivate
}