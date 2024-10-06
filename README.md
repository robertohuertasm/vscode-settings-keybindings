<div align="center">
<h1>
<img src="https://raw.githubusercontent.com/robertohuertasm/vscode-settings-keybindings/refs/heads/master/resources/logo%402x.png" alt="logo" width="250">

<b>VS Code Settings KeyBindings</b>
</h1>

<h3>Easily set keybindings for your <a href="https://code.visualstudio.com" target="_blank">Visual Studio Code</a> settings.</h3>
<br/>

[![Version](https://img.shields.io/visual-studio-marketplace/v/robertohuertasm.vscode-settings-keybindings.svg?style=for-the-badge&colorA=252525&colorB=e1642e)](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-settings-keybindings)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/robertohuertasm.vscode-settings-keybindings.svg?style=for-the-badge&colorA=252525&colorB=e1642e)](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-settings-keybindings)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/robertohuertasm.vscode-settings-keybindings.svg?style=for-the-badge&colorA=252525&colorB=e1642e)](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-settings-keybindings)


<br/>

</div>




## Use case

There's no easy way to set a keybinding to set or toggle the value of some settings in VS Code. 

This extension provides a command to set any setting to any value. The command can then be mapped to the keybinding of your choice.

On top of that, the command accepts several arguments that will make it esier for you to toggle between different values of the same setting.

## Examples

Al the examples you'll see below are snippets you could paste to your `keybindings.json` file:

### Set a setting to a value

```json
{
  "key": "ctrl+shift+alt+t",
  "command": "vscode-settings-keybindings.setSetting",
  "args": {
    "key": "workbench.colorTheme", // the setting you want to change
    "value": "Default Dark Modern" // the value of the setting
  }
}
```

### Toggle a setting between the current value and a new value

Same as the previous one but adding a toggle behavior.

```json
{
  "key": "ctrl+shift+alt+t",
  "command": "vscode-settings-keybindings.setSetting",
  "args": {
    "toggle": true,
    "key": "workbench.colorTheme", // the setting you want to change
    "value": "Default Dark Modern" // the new value of the setting
  }
}
```

### Toggle a setting between two values

Making the values explicit.

```json
{
  "key": "ctrl+shift+alt+t",
  "command": "vscode-settings-keybindings.setSetting",
  "args": {
    "toggle": true,
    "key": "workbench.colorTheme", // the setting you want to change
    "value": "Default Dark Modern", // the first value of the setting
    "toggleValue": "Default Light+" // the second value of the setting
  }
}
```

### Toggle between a value and no value

Adding some extra modification to the `Material Theme Darker`:

```json
{
  "key": "ctrl+shift+alt+t",
  "command": "vscode-settings-keybindings.setSetting",
  "args": {
   "args": {
      "key": "editor.tokenColorCustomizations",
      "toggle": true,
      "toggleValue": null, // remove the setting when toggling
      "value": {
        "[Material Theme Darker]": {
          "textMateRules": [
            {
              "scope": "comment",
              "settings": {
                "foreground": "#0c843e"
              }
            },
            {
              "scope": "comment punctuation.definition.comment",
              "settings": {
                "foreground": "#0c843e"
              }
            }
          ]
        }
      }
    }
  }
}
```


## Resetting 

If something goes wrong while using the toggle with auto values (using the current value to toggle), you can always reset the settings cache by running: `F1 > Reset original values cache`.


## How is this different from [settings.cycle](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-settings-cycler)?

- **This extension allows you to set any setting to any value**. settings.cycle only allows you to cycle between a predefined set of values. So imagine you want to have just a keybinding to set `setting.A` to `value.A` and another keybinding to set `setting.A` to `value.B`. This extension allows you to do that.
- **This extension allows you to toggle without defining both values**. settings.cycle requires you to define both values. This extension allows you to toggle between the current value and a new value without having to define the current value.
- **This extension allows you remove a setting when toggling**. If you define a value as `null`, the setting will be removed when toggling.
- **This extension works with the keybindings.json file only**.
