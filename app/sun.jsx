"use client"
import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

// Define a custom plugin with state management
const createCustomPlugin = (onButtonClick) => ({
    name: 'customCommand',
    display: 'command',
    title: 'Add range tag',
    buttonClass: '',
    innerHTML: '<i class="fas fa-carrot"></i>',
    
    add: function (core, targetElement) {
        console.log("Plugin added");
        const context = core.context;
        const rangeTag = core.util.createElement('div');
        core.util.addClass(rangeTag, '__se__format__range_custom');

        context.customCommand = {
            targetButton: targetElement,
            tag: rangeTag,
            onButtonClick // Pass the callback function
        };
    },

    active: function (element) {
        console.log("Checking active state");
        if (!element) {
            this.util.removeClass(this.context.customCommand.targetButton, 'active');
        } else if (this.util.hasClass(element, '__se__format__range_custom')) {
            this.util.addClass(this.context.customCommand.targetButton, 'active');
            return true;
        }

        return false;
    },

    action: function () {
        console.log("Button clicked");
        const rangeTag = this.util.getRangeFormatElement(this.getSelectionNode());
        const { onButtonClick } = this.context.customCommand;

        if (this.util.hasClass(rangeTag, '__se__format__range_custom')) {
            this.detachRangeFormatElement(rangeTag, null, null, false, false);
        } else {
            this.applyRangeFormatElement(this.context.customCommand.tag.cloneNode(false));
        }

        // Trigger the callback function to update the state
        if (onButtonClick) {
            onButtonClick();
        }
    }
});

const SunEditorComponent = () => {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(prevShow => !prevShow); // Toggle the state
  };

  return (
    <div>
        <SunEditor 
            setOptions={{
                plugins: [createCustomPlugin(handleButtonClick)],
                buttonList: [
                    ['bold', 'italic', 'underline', 'strike'], // default buttons
                    ['customCommand'] // Add custom command button
                ]
            }}
        />
        {show && <p>The button was clicked!</p>}
    </div>
  )
}

export default SunEditorComponent;
