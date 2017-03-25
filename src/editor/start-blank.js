(function (Editor) {
    /**
     * Starts a blank document in the editor.
     * @param {Canvas} canvas The canvas of the editor.
     */
    Editor.startBlank = function (canvas) {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        //canvas.renderAll();
        var HideControls = {
            'tl': true,
            'tr': false,
            'bl': true,
            'br': true,
            'ml': true,
            'mt': true,
            'mr': true,
            'mb': true,
            'mtr': true
        };
        fabric.Image.fromURL('http://serio.piiym.net/CVBla/txtboard/thumb/1260285874089s.jpg', function (img) {
            img.top = 60;
            img.left = 30;
            canvas.add(img);
        });

        fabric.Image.fromURL('http://serio.piiym.net/CVBla/txtboard/thumb/1260285874089s.jpg', function (img) {
            img.top = 260;
            img.left = 230;
            img.setControlsVisibility(HideControls);
            canvas.add(img);
        });

        canvas.add(new fabric.IText('Tap and Type', {
            fontFamily: 'arial',
            left: 100,
            top: 100,
            fontSize: fabric.util.parseUnit(12 + 'pt'),
            hasControls: false,
        }));

        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });

        // "add" rectangle onto canvas
        canvas.add(rect);

        canvas.renderAll();
    };
})(window.geradorCertificado.Editor);