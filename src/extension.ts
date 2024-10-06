import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let initialValues: Record<string, { oldValue: unknown; isToggled: boolean }> =
    {};
  // Register a command to set any setting value via keybinding
  const setSettingCommand = vscode.commands.registerCommand(
    'vscode-settings-keybindings.setSetting',
    (args: unknown) => {
      // check that the args is a valid object
      if (
        typeof args !== 'object' ||
        !args ||
        !('key' in args) ||
        !('value' in args)
      ) {
        vscode.window.showErrorMessage(
          'The arguments must be an object with a "key" and "value" keys',
        );
        return;
      }

      // check that the key is a string
      const key = args['key'];
      if (typeof key !== 'string') {
        vscode.window.showErrorMessage('The key must be a string');
        return;
      }

      // get the value from the args
      const value: unknown = args['value'];

      // get the configuration
      const config = vscode.workspace.getConfiguration();

      // do we have a toggle mechanism?
      const isToggle = (args as any)['toggle'];

      if (!isToggle) {
        // simple case, just set the value
        // we're taking into account that a null value equals to set the value to undefined.
        // i.e. remove the setting
        config.update(key, value ?? undefined, true);
        return;
      }

      // we're in a toggle scenario here.
      // let's get the current value
      const currentValue: unknown = config.get(key);

      // IMPORTANT: when setting the value into the settings, it will can be stored as a different
      // object, so a simple comparison may not work as expected.
      // To avoid complexities, we are going to store the state of the setting in a separate record.
      const initialValue = initialValues[key];

      const toggleValue = (args as any)['toggleValue'];
      // if this value is informed, we have to switch between the value and the toggledValue
      if (toggleValue) {
        // as we have both values, we just need to keep track of the isToggled state.
        if (!initialValue || !initialValue.isToggled) {
          // we have to switch to the toggled value
          config.update(key, toggleValue ?? undefined, true);
          // update the state
          initialValues[key] = {
            oldValue: undefined,
            isToggled: true,
          };
        } else {
          // we have to switch to the original value
          config.update(key, value ?? undefined, true);
          // update the state
          initialValues[key] = {
            oldValue: undefined,
            isToggled: false,
          };
        }
        return;
      }

      if (initialValue) {
        // we have a previous state
        if (initialValue.isToggled) {
          // we have to switch to the old value
          config.update(key, initialValue.oldValue ?? undefined, true);
        } else {
          // we have to switch to the new value
          config.update(key, value ?? undefined, true);
        }
        // update the state
        initialValues[key] = {
          oldValue: initialValue.oldValue,
          isToggled: !initialValue.isToggled,
        };
      } else {
        // we don't have a previous state
        // we have to switch to the new value
        config.update(key, value ?? undefined, true);
        // update the state
        initialValues[key] = {
          oldValue: currentValue,
          isToggled: true,
        };
      }
    },
  );

  const resetCommand = vscode.commands.registerCommand(
    'vscode-settings-keybindings.reset',
    () => {
      initialValues = {};
    },
  );

  context.subscriptions.push(setSettingCommand);
}

export function deactivate() {}
