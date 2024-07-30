# Front End ui StoryBook

<div align="center">
	<img src="./logo/logo.jpeg" />
	<br/>
	<div style="margin:auto">
		<span style="font-size:200%">Front End ui StoryBook</span>
	</div>
</div>

# Description

This is the DataReachable Front End ui StoryBook Project, it will include project structure introduction and how to setup and run the project.

# Project Structure

## Overview

```
dr_pe_ui_storybook/
├─ LICENSE .......................... Project License File
├─ README.md ........................ Project README File
├─ package.json ..................... Project Package File
├─ tsconfig.json .................... Project Typescript Config File
├─ public/ .......................... Project Public Folder
│  ├─ favicon.ico ................... Project Favicon
│  └─ index.html .................... Project Root Html
└─ src/ ............................. Project Src Folder
   ├─ Components/ ................... Project Components Folder
   │  └─ Button/ .................... Project Each Component Folder
   │     ├─ index.tsx ............... Project Each Component Entry File
   │     └─ style.scss .............. Project Each Component Style File
   ├─ stories/ ...................... Project Story File
   │   ├─ Button.stories.tsx ........ Project StoryBook Each Story file
   │   └─ Introduction.stories.mdx .. Project StoryBoook Introduction
   └─ index.ts ...................... Project Components Export File
```

## Public Folder

The public folder mainly contains some static files in the project, for example, the icon of the project, some local pictures and the root file of the project html in the project.

## Src Folder

The src folder mainly contains the entry file of the project, including all the style files, functional files, asynchronous request files and page routing management files in the project.

# Usage

## Local Environment Requirement

This project requires React with minimal version of 16.13.0 and thus, should install essential NPM packages prior to usage.

The following procedure assumes the node and npm have already been installed and are accessible from the commandline. For installation of node and npm, see [install node and npm](https://www.npmjs.com/get-npm).

## Install All The Necessary Package To The Project

Run the following command to install the packages:

```javascript
npm install
```

## Setting Up ESLint and Prettier To Work With This Project

For a good developer experience, it is useful to set the editor to automatically run ESLint's automatic repair commands when saving files.
To open your user and workspace settings, follow the following method:

On Windows/Linux - File > Preferences > Settings > Extensions > Scroll down and find "Edit in settings.json"

On macOS - Code > Preferences > Settings > Extensions > Scroll down and find "Edit in settings.json"

You can also open the Settings editor from the Command Palette (⇧⌘P) with Preferences: Open Settings or use the keyboard shortcut (⌘,), or see [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings) to get more information.

Now, You should have an open file to execute it. If you don’t want to format the file manually every time, you can also format it when saving. Therefore, you need to open the settings/preferences of Visual Studio Code users in JSON format and configure the following:

```javascript
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript"
  ],
}
```

## Run The Project Demo

Enter the following command to run the demo:

```javascript
npm run storybook
```

## General Coding Rules

The [PROJECTRULES.md](/doc/PROJECTRULES.md) file is mainly describe the general rules during coding. Such as how to name the class and how to write the comment in your project.

## Git Usage

The [GITSPECIFICATIONS.md](/doc/GITSPECIFICATIONS.md) file is mianly describe the rule of how to use git, such as how to name a new branch and how to write a commit message.
"# library" 
"# library" 
"# library" 
