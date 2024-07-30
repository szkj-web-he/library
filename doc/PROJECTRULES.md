# Front End Specifications

<div align="center">
	<img src="../images/logo.jpeg" />
	<br/>
	<div style="margin:auto">
		<span style="font-size:200%">Front End Specifications</span>
	</div>
</div>

# Description

This is the Front End specifications, it will include project folder naming rule, class/id naming rule and code comments rule.

# Project Rules

## Project Structure Overview

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

## Project Folder Naming Rule

All folder naming methods in the project use big camel case naming method.

### Public and Private Component and Layout Naming Rule

components or layout will be used in multiple components, such as page layouts or pages. The general naming convention will be the first name according to the ui of the component or layout, and then the second name will be based on its function, and so on, for example, there is a `button` will `fetch` `userData` from database. we can name it as `ButtonFetchUserData`, At the same time, you need to make sure that the component folder and component name are the same.

## CSS Class and ID Naming Rule

Generally, BEM naming convention will be used to name the project css class and Id. But because all the class and id names in the project have been hashed. We will use the following methods to name the class and id in the project

The `firstname` of the class will be the name of the current component, then we need to add the `element` and `modifiers` for the class/id, We will connect `firstname` and `element` with a single underscore, we will connect `modifiers` with others with double underscore. For example:

If we have a components and we want to change the header part of the component from active state to inactive state, we need to add one more class to this component when this component is at inactive state. So this class name will be `component_header__inactive`

## const, let, Class and function naming rule

The naming of variables, constants, classes, and functions in the project is extremely important, which can quickly help members of your team understand the meaning of the code you write.

-   let

    naming method：small camel case naming method。\
    naming rule：Prefix with noun

    ```javascript
    let maxCount = 11;
    ```

-   const
    naming method：small camel case naming method。\
    naming rule：Prefix with noun

    ```javascript
    const maxCount = 10;
    ```

-   function
    naming method：small camel case naming method。\
    naming rule：Prefix with verb
    suggestion prefix naming：

    | Verb     | meaning                          | return value                         |
    | :------- | :------------------------------- | :----------------------------------- |
    | handle   | Handling event events            | no return or return any              |
    | is       | Judge true or false              | boolean                              |
    | get      | get value                        | no boolean                           |
    | set      | set value                        | no return                            |
    | load     | loading some data                | no return or return the loading data |
    | remove   | remove style or remove parameter | no return or return any              |
    | add      | add style or add parameter       | no return or return any              |
    | watch    | lister some event or function    | no return or return any              |
    | dispatch | dispatch action                  | return object                        |

-   class
    naming method：big camel case naming method。\
     naming rule：Prefix with the name of class
    ```javascript
    class Person {
    public name: string;
    constructor(name) {
      this.name = name;
    }
    }
    const person = new Person('Frank');
    ```

## Code Comments Rule

### Top Level/File Comments

The top-level comment is used to tell readers who are not familiar with this code what is included in this file. The general content of the file, its author, dependencies and compatibility information should be provided.

```javascript
/**
 * @file LsOrRwPreview
 * @date 2020/06/25 13:11
 * @author Administrator
 * @lastModify Administrator 2020/06/25 14:11
 */
```

### Function Comments

`@param` tag provides various descriptions of the parameters of a function, including the parameter name, parameter data type, and description. @param {variable type} Variable name-variable description<br>
ex: <br>
@params {string | Number}<br>
@callback describes a callback function.<br>
@returns describes the return value of a function. The syntax is similar to @param.

```javascript
/**
 * Send a post Request
 * @param {string} url - request url
 * @param {string} method - request method
 * @param {Object} body - request payload
 * @callback successCallBack-requestSuccessCallBack - request success callback
 * @callback errorCallBack-requestErrorCallBack - request failure callback
 * @returns {Promise.<*>}
 */
const requestUrl = async (url, method, body, successCallBack, errorCallBack) => {
    reurn new Promise...
};
```

### Variable and Attribute Notes

@type is used to identify the type of value that an identifier may contain, or the type of value returned by a function.

```javascript
/**
 * variable description
 * @let
 * @type {number)}
 */
let foo = 1;
```

### Constant Comment

```javascript
/**
 * const description
 * @constant
 * @type {string}
 *
 */
const RED = "FF0000";
```

## Code Snippet Template

### Usage

Press command + shift + p, then search snippet in the search box. Copy and paste typescript react template to the typescriptreact.json file. Copy and paste scss template to the scss.json file.

### typescript react template

In order to make the structure of each file of the project more agreeable, please be sure to use the following snippet as the starting template for each of your tsx files

typescript.json snippet

```javascript
{
  // Place your snippets for typescript here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1');", "$2"],
    "description": "Log output to console"
  },
  "comment header part": {
    "prefix": "ch",
    "body": [
      "/**",
      "* @file $1",
      "* @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "* @author $2",
      "* @lastModify $2 $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "*/"
    ],
    "description": "project comment header part"
  },
  "comment body part": {
    "prefix": "cb",
    "body": ["/**", "* $1", "* @param {$2} $3", "*/"],
    "description": "project comment header part"
  },
  "comment jsx divider part": {
    "prefix": "cxd",
    "body": [
      "{/* <------------------------------------ **** $1 START **** ------------------------------------ */}",
      "{/* <------------------------------------ **** $1 END **** ------------------------------------ */}"
    ],
    "description": "jsx comment divider part"
  },
  "comment divider part": {
    "prefix": "cd",
    "body": [
      "/* <------------------------------------ **** $1 START **** ------------------------------------ */",
      "/* <------------------------------------ **** $1 END **** ------------------------------------ */"
    ],
    "description": " comment divider part"
  },
  "comment divider short part": {
    "prefix": "cds",
    "body": [
      "/* <--------------------------- * $1 START * --------------------------- */",
      "/* --------------------------- * $1 END * --------------------------- */"
    ],
    "description": " comment divider part"
  },
  "comment const": {
    "prefix": "cc",
    "body": ["/**", "* $1", "* @constant", "* @type {$2}", "*/"],
    "description": " const comment"
  },
  "comment let": {
    "prefix": "ct",
    "body": ["/**", "* $1", "* @let", "* @type {$2}", "*/"],
    "description": " const let"
  },
  "react jsx templete": {
    "prefix": "rt",
    "body": [
      "/**",
      "* @file $2",
      "* @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "* @author $3",
      "* @lastModify $3 $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "*/",
      "/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */",
      "/** This section will include all the necessary dependence for this tsx file */",
      "import React, { useState } from 'react';",
      "import { Row, Col } from 'antd';",
      "/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */",

      "/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */",
      "/** This section will include all the interface for this tsx file */",

      "/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */",

      "/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */",
      "const $1 = (): JSX.Element => {",
      "/* <------------------------------------ **** HOOKS START **** ------------------------------------ */",
      "/************* This section will include this component HOOK function *************/",

      "/* <------------------------------------ **** HOOKS END **** ------------------------------------ */",

      "/* <------------------------------------ **** PARAMETER START **** ------------------------------------ */",
      "/************* This section will include this component parameter *************/",

      "/* <------------------------------------ **** PARAMETER END **** ------------------------------------ */",

      "/* <------------------------------------ **** FUNCTION START **** ------------------------------------ */",
      "/************* This section will include this component general function *************/",

      "/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */",
      "return (",
      "<Row>",
      "</Row>",
      ");",
      "};",
      "export default $1;",
      "/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */"
    ],
    "description": "react JSX templete"
  }
}

```

### SCSS template

In order to make sure all the project are using the same scss template, please using the following snippet in the scss.json file.

scss.json snippet

```javascript
{
  // Place your snippets for typescript here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1');", "$2"],
    "description": "Log output to console"
  },
  "comment header part": {
    "prefix": "ch",
    "body": [
      "/**",
      "* @file $1",
      "* @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "* @author $2",
      "* @lastModify $2 $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "*/"
    ],
    "description": "project comment header part"
  },
  "comment body part": {
    "prefix": "cb",
    "body": ["/**", "* $1", "* @param {$2} $3", "*/"],
    "description": "project cocommentmmon header part"
  },
  "comment jsx divider part": {
    "prefix": "cxd",
    "body": [
      "{/* <------------------------------------ **** $1 START **** ------------------------------------ */}",
      "{/* <------------------------------------ **** $1 END **** ------------------------------------ */}"
    ],
    "description": "jsx common divider part"
  },
  "comment divider part": {
    "prefix": "cd",
    "body": [
      "/* <------------------------------------ **** $1 START **** ------------------------------------ */",
      "/* <------------------------------------ **** $1 END **** ------------------------------------ */"
    ],
    "description": " comment divider part"
  },
  "comment divider short part": {
    "prefix": "cds",
    "body": [
      "/* <--------------------------- * $1 START * --------------------------- */",
      "/* --------------------------- * $1 END * --------------------------- */"
    ],
    "description": " comment divider part"
  },
  "media queriy max": {
    "prefix": "mm",
    "body": ["@media screen and (max-width: $1) {", "}"],
    "description": " media screen less than style"
  },
  "media queriy min": {
    "prefix": "mi",
    "body": ["@media screen and (min-width: $1) {", "}"],
    "description": " media screen more than style"
  },
  "scss templete": {
    "prefix": "st",
    "body": [
      "/**",
      "* @file $2",
      "* @date $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "* @author $3",
      "* @lastModify $3 $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "*/",
      "/* <------------------------------------ **** CONSTANT IMPORT START **** ------------------------------------ */",
      "/** Import all the reference constant after this line */",
      "@import '../../Constant/breakPoint.scss';",
      "@import '../../Constant/font.scss';",
      "@import '../../Constant/color.scss';",
      "/* <------------------------------------ **** CONSTANT IMPORT END **** ------------------------------------ */",
      "/* <------------------------------------ **** SECTION1 MIXIN START **** ------------------------------------ */",
      "/** The demo mixin is ..........*/",
      "@mixin demo {}",
      "/* <------------------------------------ **** SECTION1 MIXIN END **** ------------------------------------ */",
      "/* <--------------------------- * SECTION1 * --------------------------- */",
      "/* <--------------------------- * SECTION1 * --------------------------- */"
    ],
    "description": " media screen more than style"
  }
}

```
