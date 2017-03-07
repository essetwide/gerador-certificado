/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



fabric.Object.prototype.hasStyle = function (styleName, value) {
    if (this.isEditing) {//Verifica se é o modo de seleção (parte do objeto)[FILHO]
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

fabric.Object.prototype.clearStyle = function (styleName) {
    for (var line in this.styles) {
        for (var char in this.styles[line]) {
            this.styles[line][char][styleName] = "";
        }
    }
};

function addTextPanel(x, y, obj) {
    $("#textPanel").remove();
    var panelLeft = x + 35;
    var panelTop = y;
    var panelHTML = '<div id="textPanel" class="panel" style="top:' + panelTop + 'px;left:' + panelLeft + 'px;" >\n\
<img src="https://i1.wp.com/www.teclasap.com.br/wp-content/uploads/2015/08/underline-x-underscore.png" id="underlineBtn" style="width: 20px;" />\n\
<img src="https://image.freepik.com/free-icon/strikethrough-text-formatting_318-40624.jpg" id="strikeBtn" style="width: 20px;" />\n\
<img src="http://wfarm3.dataknet.com/static/resources/icons/set113/c3d269df.png" id="boldBtn" style="width: 20px;" />\n\
<img src="http://wfarm3.dataknet.com/static/resources/icons/set113/e94e8793.png" id="italicBtn" style="width: 20px;" />\n\
<input type="number" id="sizeInp" value="' + fontSizeParser('px', 'pt', obj.fontSize) + '" min="1" style="width: 40px;" />\n\
</div>';
    $(".canvas-container").append(panelHTML);
}
function addMainPanel(x, y) {
    var btnLeft = x - 10;
    var btnTop = y - 10;
    var panelHTML = '<div id="mainPanel" class="panel" style="top:' + btnTop + 'px;left:' + btnLeft + 'px;" >\n\
        <img src="https://cdn3.iconfinder.com/data/icons/in-and-around-the-house/43/trash_bin-512.png" class="deleteBtn" />';
    var selected = canvas.getActiveObject() || canvas.getActiveGroup();
    if (selected.get('type') !== "image" && selected.get('type') !== "group") {
        panelHTML += '<img src="http://unowinc.co/wp-content/uploads/2015/02/Home-icon-branding-color-wheel-design.png" id="colorBtn" />';
    }
    if (selected.get('type') === "i-text") {
        panelHTML += '<img src="http://sfgov.org/sites/default/files/Images/MainPages/Accessibility%20Services/fontsize-icon-darkgray.png" id="textBtn"/>';
    }

    panelHTML += '</div>';
    $(".canvas-container").append(panelHTML);
    $('#colorBtn').colorPicker({doRender: false,
        cssAddon: // could also be in a css file instead
			'.cp-color-picker{background-color:#f0f8ff;box-shadow: 3px 3px 8px #888888;}',
        renderCallback: function ($elm, toggled) {
            // 'this': current colorPicker instance; // instance has all kinds of information about colorPicker such as $UI including dimensions etc...
            // $elm: the input field or other element that just toggled the colorPicker;
            // toggle -> 'true': just appeared; 'false': just closed; 'undefined': is rendering

            if (canvas.getActiveObject()) {
                setStyle(canvas.getActiveObject(), 'fill', this.color.colors.HEX);
                canvas.renderAll();
            }
        },
        positionCallback: function ($elm) {
            // 'this': current colorPicker instance;
            // $elm: the input field or other element that just toggled the colorPicker;
            // optionally...
            return {top: btnTop + 55, left: btnLeft+45}; // positions colorPicker before appearing
        },

    });
}

canvas.on('object:selected', function (e) {
    $(".panel").remove();
    addMainPanel(e.target.oCoords.tr.x + 20, e.target.oCoords.tr.y);
});

canvas.on('mouse:down', function (e) {
    if (!canvas.getActiveObject())
    {
        $(".panel").remove();
    }
});

canvas.on('object:modified', function (e) {
    addMainPanel(e.target.oCoords.tr.x + 20, e.target.oCoords.tr.y);
});

canvas.on('object:scaling', function (e) {
    $(".panel").remove();
});
canvas.on('object:moving', function (e) {
    $(".panel").remove();
});
canvas.on('object:rotating', function (e) {
    $(".panel").remove();
});


//=====BUTTONS LISTENERS================================
$(document).on('click', ".deleteBtn", function () {
    if (canvas.getActiveGroup()) {

        canvas.getActiveGroup().forEachObject(function (o) {
            console.log(o.get('type'));
            canvas.remove(o)
        });
        canvas.discardActiveGroup().renderAll();
    } else {
        canvas.remove(canvas.getActiveObject());
    }

    $(".panel").remove();
});

/*$(document).on('click', "#colorBtn", function () {
 if (canvas.getActiveObject()) {
 setStyle(canvas.getActiveObject(), 'fill', getRandomColor());
 // canvas.getActiveObject().set("fill", getRandomColor());
 canvas.renderAll();
 }
 });*/

$(document).on('click', "#textBtn", function () {
    addTextPanel($('.panel').position().left, $('.panel').position().top, canvas.getActiveObject());
});

$(document).on('click', "#underlineBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasStyle('textDecoration', "underline") ? '' : "underline";
        setStyle(canvas.getActiveObject(), 'textDecoration', value);
    }
});

$(document).on('click', "#strikeBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasStyle('textDecoration', "line-through") ? " " : "line-through";
        setStyle(canvas.getActiveObject(), 'textDecoration', value);
    }
});

$(document).on('click', "#boldBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasStyle('fontWeight', "bold") ? "normal" : "bold";
        setStyle(canvas.getActiveObject(), 'fontWeight', value);
    }
});

$(document).on('click', "#italicBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasStyle('fontStyle', "italic") ? "normal" : "italic";
        setStyle(canvas.getActiveObject(), 'fontStyle', value);
    }
});

$(document).on('change', "#sizeInp", function (evt) {
    if (canvas.getActiveObject()) {
        setStyle(canvas.getActiveObject(), 'fontSize', fabric.util.parseUnit(evt.target.value + 'pt'));
    }
});



//===AUX FUNCTIONS==================================
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setStyle(object, styleName, value) {
    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
    } else {
        object.clearStyle(styleName);
        object.set(styleName, value);
        console.log(object);
        canvas.renderAll();
    }
    canvas.renderAll();
}



function fontSizeParser(unitFrom, unitTo, unitFrom_value) {
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
        case'px':
            return pixel;
        default:
            return unitFrom_value;
    }


}

