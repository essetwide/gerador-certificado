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
            if (this.isEditing) { //Verifica se é o modo de seleção (parte do objeto)[FILHO]
                if (!jQuery.isEmptyObject(this.getSelectionStyles())) { //Verifica se o FILHO já possui um estilo próprio 
                    if (this.getSelectionStyles()[styleName] === value) { //Se já possui e o estilo é o que será SETADO
                        return true; //O estilo já está setado
                    } else {
                        return false; //O estilo não está setado
                    }
                } else { //Se o FILHO NÃO tem estilo próprio o PAI responde
                    if (this[styleName] === value) { //Verifica se PAI já está no estilo que será setado 
                        return true; //O estilo já está setado
                    } else {
                        return false; //O estilo não está setado
                    }
                }
            } else { //Caso não for modo de seleção (modo edição objeto inteiro) [PAI]
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
            /* @FIXME: Rodar render all após qualquer setStyle */
        };
    }
)(window.fabric);