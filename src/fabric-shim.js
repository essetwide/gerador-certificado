(
    /**
     * A set of fabric's handy functions.
     * @requires fabric
     */
    function (fabric) {
        /**
         * Test if the object has an specific style declaration.
         * @param   {string}  styleName Name of the declared style.
         * @param   {*}       value     The value to test.
         * @returns {boolean} Returns true if the declared style is the passed value.
         */
        fabric.Object.prototype.hasStyle = function (styleName, value) {
            if (this.isEditing) { //Checks if it is in the selection mode (part of the object) [SON] - Verifica se é o modo de seleção (parte do objeto)[FILHO]
                if (!jQuery.isEmptyObject(this.getSelectionStyles())) { //Checks if the SON already has his own style - Verifica se o FILHO já possui um estilo próprio 
                    if (this.getSelectionStyles()[styleName] === value) { //Checks if the SON has that style with that value -  Se já possui e o estilo é o que será SETADO
                        return true; //That style is already setted - O estilo já está setado
                    } else {
                        return false; //That style is not already setted - O estilo não está setado
                    }
                } else { //If the child does not have his own style, the FATHER responds - Se o FILHO NÃO tem estilo próprio o PAI responde
                    if (this[styleName] === value) { //Checks if the FATHER has that style with that value - Verifica se PAI já está no estilo que será setado 
                           return true; //That style is already setted - O estilo já está setado
                    } else {
                        return false; //That style is not already setted - O estilo não está setado
                    }
                }
            } else { //Checks if it is not in the selection mode (whole object edition mode) - Caso não for modo de seleção (modo edição objeto inteiro) [PAI]
                return this[styleName] === value ? true : false;
            }

        };

        /**
         * Clear all styles declarations (global and for his childs) for a specific style property.
         * @param {string} styleName The name of the declaration.
         */
        fabric.Object.prototype.clearStyle = function (styleName) {
            for (var line in this.styles) {
                for (var char in this.styles[line]) {
                    this.styles[line][char][styleName] = "";
                }
            }
        };
        
        /**
         * Declare a style in the Object.
         * @param {string} styleName The name of the declaration.
         * @param {*}      value     The value to be setted.
         */
        fabric.Object.prototype.setStyle = function (styleName, value) {
            if (this.setSelectionStyles && this.isEditing) {
                var style = {};
                style[styleName] = value;
                this.setSelectionStyles(style);
            } else {
                this.clearStyle(styleName);
                this.set(styleName, value);
            }
            this.canvas.renderAll();
        };
    }
)(window.fabric);