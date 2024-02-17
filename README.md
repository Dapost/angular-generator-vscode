
#### Visual Studio Code Extension
# Angular Generator

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 

[![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


### Description

This Visual Studio Code extension simplifies the creation of Angular entities (e.g., components, modules, services) within your project by providing context menu options when right-clicking on a desired folder.

### Features

- Right-click on a folder in the VS Code Explorer to access a context menu.
- Choose from a variety of Angular entities to generate within the selected folder.
- Customize the generation options as per your project requirements.

### Usage

- Open your Angular project in Visual Studio Code.
- Right-click on the folder where you want to create the Angular entity.
- From the context menu, select the desired entity type you wish to generate (e.g., component, module, service).
- Follow the prompts to provide necessary details (e.g., name, options) for the entity generation.
- The extension will automatically create the selected entity within the chosen folder, adhering to Angular best practices.

    ![Demo GIF](https://i.imgur.com/6fyrl3u.gif)

### Requirements

- Visual Studio Code (v1.60.0 or higher)
- Angular CLI (v12.0.0 or higher)

### Extension Settings

This extension does not have any customizable settings at the moment.

### Known Issues

None currently known. Please report any issues you encounter on the extension's GitHub repository.

### Release Notes

#### Version 1.0.0

- Initial release of the extension.
- Added support for generating 
    - components
    - modules
    - services 
    - directives
    - pipe
    - interceptors
    - guard
    - environment *(only on Angular 16+)*

### Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests on the extension's GitHub repository.

### License

This extension is licensed under the [MIT License](LICENSE).
