const vscode = require('vscode');
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

	const optionlist = await vscode.window.showQuickPick([...options], {
		canPickMany: true
	})
	const optionsJoined = optionlist.map(opt => opt.description).join(' ')

	const terminal = vscode.window.createTerminal('Angular Generator');
	terminal.show();
	terminal.sendText(`cd "${workspacePath}"`)
	terminal.sendText(`ng generate ${entity} ${relativePath}/${name} ${optionsJoined}`)

	vscode.window.showInformationMessage(`${capitalizeEntity} ${name} generated!`);
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
		description: '--standalone'
	},
	{
		label: "Not Standalone",
		detail: "Generate a not standalone component, in v.17+ standalone components are default",
		description: '--standalone=false'
	},
	{
		label: "Change Detection: OnPush",
		detail: "Generate a component with change detection set to OnPush.",
		description: '--change-detection OnPush'
	},
	{
		label: "Display Block",
		detail: "Generate a component with display set to block in its styles.",
		description: '--display-block'
	},
	{
		label: "Skip Test",
		detail: "Generate a component without accompanying test files.",
		description: '--skip-tests'
	},
	{
		label: "Flat",
		detail: "Generate the component files in the same directory, without creating a separate folder.",
		description: '--flat'
	},
	{
		label: "Inline Template",
		detail: "Generate the component with the template defined inline in the component file.",
		description: '--inline-template'
	},
	{
		label: "Inline Style",
		detail: "Generate the component with the styles defined inline in the component file.",
		description: '--inline-style'
	},
	{
		label: "Skip Import",
		detail: "Generate the component without importing it into the nearest module file.",
		description: '--skip-import'
	},
	{
		label: "View Encapsulation: None",
		detail: "Generate the component with view encapsulation set to None.",
		description: '--view-encapsulation None'
	},
	{
		label: "View Encapsulation: ShadowDom",
		detail: "Generate the component with view encapsulation set to ShadowDom.",
		description: '--view-encapsulation ShadowDom'
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