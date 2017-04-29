(function (Components, Utils) {
    /**
     * The main panel static class that manipulates the main_panel instance (singletone) in the editor. That is the panel that calls the other panels by the target type.
     * @memberof Components
     * @require Utils
     * @module MainPanel
     */
    Components.MainPanel = {
        template: Tangular.compile(@@include(min("./main-panel.html"))),
    
        /**
         * Instantiate (re-render) the MainPanel Component (#main_panel in DOM) in the .canvas-container pointing in a target object.
         * @param {Fabric.Object} target The target that the render will be inserted for.
         */
        create: function (target) {
            var panelLeft = target.oCoords.tr.x + 10;
            var panelTop = target.oCoords.tr.y - 10;
            var type = target.get('type');

            $(".canvas-container").append(
                this.template({
                    type: type.replace('i-text', 'text'),
                    panelTop: panelTop,
                    panelLeft: panelLeft
                })
            );
        },
        
        /**
         * Remove all panels in the DOM.
         */
        remove: function () {
            $(".panel").remove();
        },
        
        /**
         * Set up all the necessary listeners for the main_panel.
         * @param {Canvas} canvas The instance of the canvas that will apply the actions.
         */
        setupListeners: function (canvas) {
            var container = $(".canvas-container");
            Components.TextPanel.setupListeners(canvas);
            
            container.on('click', "#text_btn", function () {
                Components.TextPanel.create($('#main_panel'), canvas.getActiveObject());
            });

            container.on('click', "#delete_btn", function () {
                if (canvas.getActiveGroup()) {
                    canvas.getActiveGroup().forEachObject(function (o) {
                        console.log(o.get('type'));
                        canvas.remove(o);
                    });
                    canvas.discardActiveGroup().renderAll();
                } else {
                    canvas.remove(canvas.getActiveObject());
                }

                $(".panel").remove();
            });

            container.on('click', "#color_btn", function () {
                var mainPanel = $('#main_panel');

                mainPanel.colorPicker({
                    doRender: false, //Prevent the default behavior of render the selected color in the parent
                    cssAddon: '.cp-color-picker{background-color:#f0f8ff;box-shadow: 3px 3px 8px #888888;}',
                    renderCallback: function ($elm, toggled) {
                        // 'this': current colorPicker instance; // instance has all kinds of information about colorPicker such as $UI including dimensions etc...
                        // $elm: the input field or other element that just toggled the colorPicker;
                        // toggle -> 'true': just appeared; 'false': just closed; 'undefined': is rendering
                        if (toggled) {
                            this.color.setColor(canvas.getActiveObject().getFill(), 'hex'); // Set the current color
                            this.render(); // tell colorPicker to render
                        }
                        if (canvas.getActiveObject()) {
                            canvas.getActiveObject().setStyle('fill', '#' + this.color.colors.HEX);
                        }
                    },
                    positionCallback: function ($elm) {
                        // 'this': current colorPicker instance;
                        // $elm: the input field or other element that just toggled the colorPicker;
                        // optionally...
                        return {
                            top: mainPanel.position().top + 55,
                            left: mainPanel.position().left + 45
                        }; // positions colorPicker before appearing
                    },

                }).click();
            });
        }
    };
})(geradorCertificado.Editor.Components, geradorCertificado.Editor.Utils);