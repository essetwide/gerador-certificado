(function (Editor) {
    /**
     * A set of handy functions for the editor.
     * @namespace Utils
     * @memberof Editor          
     */
    Editor.Utils = {
        
        /**
         * Converts a passed value to specific metric unit.
         * @param   {string} unitFrom       The passed value's unit. It can be: mm, cm, in, pt, pc, em or px.
         * @param   {string} unitTo         The metric that the value will be converted. It can be one of the unitFrom's values.
         * @param   {number} unitFrom_value The value that will be converted.
         * @returns {number} The converted value.
         */
        fontSizeParser: function (unitFrom, unitTo, unitFrom_value) {
            var pixel;
            switch (unitFrom) {
            case 'mm':
                pixel = unitFrom_value * fabric.DPI / 25.4;
                break;
            case 'cm':
                pixel = unitFrom_value * fabric.DPI / 2.54;
                break;
            case 'in':
                pixel = unitFrom_value * fabric.DPI;
                break;
            case 'pt':
                pixel = unitFrom_value * fabric.DPI / 72; // or * 4 / 3
                break;
            case 'pc':
                pixel = unitFrom_value * fabric.DPI / 72 * 12; // or * 16
                break;
            case 'em':
                pixel = unitFrom_value * fontSize;
                break;
            case 'px':
                pixel = unitFrom_value;
                break;
            default:
                return unitFrom_value;
            }
            switch (unitTo) {
            case 'mm':
                return pixel / fabric.DPI * 25.4;
            case 'cm':
                return pixel / fabric.DPI * 2.54;
            case 'in':
                return pixel / fabric.DPI;
            case 'pt':
                return pixel / fabric.DPI * 72; // or * 4 / 3
            case 'pc':
                return pixel / fabric.DPI * 72 / 12; // or * 16
            case 'em':
                return pixel / fontSize;
            case 'px':
                return pixel;
            default:
                return unitFrom_value;
            }
        },
        
        /**
         * Creates an DOM block from a raw string.
         * @param   {string}  html The raw string that will generate a html block.
         * @returns {Element} A Native DOM element.
         */
        createElement: function (html) {
            var template = document.createElement('template');
            template.innerHTML = html;
            return template.content.firstChild;
        }
    };
})(window.geradorCertificado.Editor);