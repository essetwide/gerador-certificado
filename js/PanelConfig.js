/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
fabric.Object.prototype.hasTextDecoration = function (e) {
    if (this.getSelectedText()) {
        return this.getSelectionStyles().textDecoration === e ? true : false;
    } else {
        return this.textDecoration === e ? true : false;
    }

};


function addTextPanel(x, y) {
    $("#textPanel").remove();
    var panelLeft = x + 35;
    var panelTop = y;
    console.log("TOP: " + panelTop + " LEFT: " + panelLeft);
    var panelHTML = '<div id="textPanel" class="panel" style="top:' + panelTop + 'px;left:' + panelLeft + 'px;" >\n\
<img src="https://i1.wp.com/www.teclasap.com.br/wp-content/uploads/2015/08/underline-x-underscore.png" id="underlineBtn" style="width: 20px;" />\n\
<img src="https://image.freepik.com/free-icon/strikethrough-text-formatting_318-40624.jpg" id="strikeBtn" style="width: 20px;" />\n\
<img src="http://wfarm3.dataknet.com/static/resources/icons/set113/c3d269df.png" id="boldBtn" style="width: 20px;" />\n\
</div>';
    $(".canvas-container").append(panelHTML);
}
function addMainPanel(x, y) {
    var btnLeft = x - 10;
    var btnTop = y - 10;
    var panelHTML = '<div id="mainPanel" class="panel" style="top:' + btnTop + 'px;left:' + btnLeft + 'px;" >\n\
        <img src="https://cdn3.iconfinder.com/data/icons/in-and-around-the-house/43/trash_bin-512.png" class="deleteBtn" />';
    if (canvas.getActiveObject().get('type') !== "image") {
        panelHTML += '<img src="http://unowinc.co/wp-content/uploads/2015/02/Home-icon-branding-color-wheel-design.png" id="colorBtn" />';
    }
    if (canvas.getActiveObject().get('type') === "i-text") {
        panelHTML += '<img src="http://sfgov.org/sites/default/files/Images/MainPages/Accessibility%20Services/fontsize-icon-darkgray.png" id="textBtn"/>';
    }

    panelHTML += '</div>';
    $(".canvas-container").append(panelHTML);
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

$(document).on('click', "#colorBtn", function () {
    if (canvas.getActiveObject()) {
        canvas.getActiveObject().set("fill", getRandomColor());
        canvas.renderAll();
    }
});

$(document).on('click', "#textBtn", function () {
    addTextPanel($('.panel').position().left, $('.panel').position().top);
    if (canvas.getActiveObject()) {
        //canvas.getActiveObject().setScaleX(canvas.getActiveObject().getScaleX() + 0.1);
        //canvas.getActiveObject().setScaleY(canvas.getActiveObject().getScaleY() + 0.1);
        //canvas.renderAll();

    }
});

$(document).on('click', "#underlineBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasTextDecoration("underline") ? " " : "underline";
        setStyle(canvas.getActiveObject(), 'textDecoration', value);
        canvas.renderAll();
    }
});

$(document).on('click', "#strikeBtn", function () {
    if (canvas.getActiveObject()) {
        var value = canvas.getActiveObject().hasTextDecoration("line-through") ? " " : "line-through";
        setStyle(canvas.getActiveObject(), 'textDecoration', value);
        canvas.renderAll();
    }
});

$(document).on('click', "#boldBtn", function () {
    alert("Implementar");
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
    if (object.setSelectionStyles && object.isEditing && object.getSelectedText()) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
    } else {
        object[styleName] = value;
    }
}