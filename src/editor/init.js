    (function (fabric, Editor, MainPanel) {
        /**
         * Initiates the editor (with all the features) in an canvas from the passed id.
         * @param {string} canvasId The id of the canvas that will render the editor.
         */
        Editor.init = function (canvasId) {
            var canvas = new fabric.Canvas(canvasId);
            Editor.startBlank(canvas);
            setupListeners(canvas);
            MainPanel.setupListeners(canvas);
        };

        //Setup all the basic event listeners.
        function setupListeners(canvas) {
            var actionRemoveListeners = ['object:scaling', 'object:moving', 'object:rotating'];
            actionRemoveListeners.forEach(function (listener) {
                canvas.on(listener, function (e) {
                    MainPanel.remove();
                });
            });

            canvas.on('object:selected', function (e) {
                MainPanel.remove();
                MainPanel.create(e.target);
            });

            canvas.on('mouse:down', function (e) {
                if (!canvas.getActiveObject()) {
                    MainPanel.remove();
                }
            });

            canvas.on('object:modified', function (e) {
                MainPanel.create(e.target);
            });
        }
    })(window.fabric, window.geradorCertificado.Editor, window.geradorCertificado.Editor.Components.MainPanel);