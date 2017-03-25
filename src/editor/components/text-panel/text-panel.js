(function (Components, Utils) {
    /**
     * The text panel static class thats manipulates the text_panel instance (singletone) in the editor. Its a panel that only appears for texts objects manipulations.
     * @memberof Components
     * @require Utils
     * @module TextPanel
     */
    Components.TextPanel = {
        template: Tangular.compile(@@include(min("./text-panel.html"))),
        
        /**
         * Creates (Append and renders) the TextPanel Component (#text_panel in DOM) in the .canvas-container, next to the MainPanel.
         * @param {$element}      mainPanel The jQ Element of the MainPanel.
         * @param {Fabric.Object} obj       The current highlighted object.
         */
        create: function (mainPanel, obj) {
            $("#text_panel").remove();
            var panelLeft = mainPanel.position().left + 35;
            var panelTop = mainPanel.position().top;
            var fontSize = Utils.fontSizeParser('px', 'pt', obj.fontSize);
            $(".canvas-container").append(
                this.template({
                    panelTop: panelTop, 
                    panelLeft: panelLeft, 
                    fontSize: fontSize
                })
            );
        },
        
        /**
         * Setup the text_panel listeners
         * @param {Canvas} canvas The instance of the canvas that will apply the actions.
         */
        setupListeners: function (canvas) {
            var container = $(".canvas-container");
            container.on('click', "#underline_btn", function () {
                if (canvas.getActiveObject()) {
                    var value = canvas.getActiveObject().hasStyle('textDecoration', "underline") ? '' : "underline";
                    canvas.getActiveObject().setStyle('textDecoration', value);
                    canvas.renderAll();
                }
            });

            container.on('click', "#strike_btn", function () {
                if (canvas.getActiveObject()) {
                    var value = canvas.getActiveObject().hasStyle('textDecoration', "line-through") ? " " : "line-through";
                    canvas.getActiveObject().setStyle('textDecoration', value);
                    canvas.renderAll();
                }
            });

            container.on('click', "#bold_btn", function () {
                if (canvas.getActiveObject()) {
                    var value = canvas.getActiveObject().hasStyle('fontWeight', "bold") ? "normal" : "bold";
                    canvas.getActiveObject().setStyle('fontWeight', value);
                    canvas.renderAll();
                }
            });

            container.on('click', "#italic_btn", function () {
                if (canvas.getActiveObject()) {
                    var value = canvas.getActiveObject().hasStyle('fontStyle', "italic") ? "normal" : "italic";
                    canvas.getActiveObject().setStyle('fontStyle', value);
                    canvas.renderAll();
                }
            });

            container.on('change', "#size_inp", function (evt) {
                if (canvas.getActiveObject()) {
                    canvas.getActiveObject().setStyle('fontSize', fabric.util.parseUnit(evt.target.value + 'pt'));
                    canvas.renderAll();
                }
            });
        }
    }
})(geradorCertificado.Editor.Components, geradorCertificado.Editor.Utils);