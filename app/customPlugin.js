export default function customPlugin() {
  return {
    name: "customPlugin",
    display: "command",
    title: "Custom Plugin",
    innerHTML: "<button>Custom Plugin</button>",
    add: function (core, targetElement) {
      const context = core.context;

      // Ensure core.commandMap exists and is correctly bound
      const command = function () {
        alert("Custom plugin button clicked!");
      };

      // Register the command with SunEditor
      core.commandMap.customPlugin = command;

      // Create and bind the button action
      const button = document.createElement("button");
      button.textContent = "Click me";

      // Ensure that the function is correctly bound
      button.addEventListener("click", command.bind(core));

      targetElement.appendChild(button);
    },
  };
}
