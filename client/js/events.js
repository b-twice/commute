var $default = {opacity: ".5"};
var $select = {opacity: ".9"};
// Pull graph to front
d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function $mapMouseOver(f) {
    var key = f.feature.properties.dest.toLowerCase();
    for (var prop of Object.keys($select)) {
        $(f._container).css(prop, $select[prop]);
        $(`.area#${key}`).css(prop, $select[prop]);
        $(`.legend-item#${key}`).css(prop, $select[prop]);
    }
    d3.select(`.area#${key}`).moveToFront();
    f.bringToFront();
}
function $mapMouseOut(f) {
    var key = f.feature.properties.dest.toLowerCase();
    for (var prop of Object.keys($default)) {
        $(f._container).css(prop, $default[prop]);
        $(`.area#${key}`).css(prop, $default[prop]);
        $(`.legend-item#${key}`).css(prop, $default[prop]);
    }
}

function $graphMouseOver() {
    var s = `#${this.id}`;
    for (var prop of Object.keys($select)) {
        $(this).css(prop, $select[prop]);
        $(s).css(prop, $select[prop]);
        $(`.legend-item${s}`).css(prop, $select[prop]);
    }
    d3.select(this).moveToFront();
}
function $graphMouseOut() {
    var s = `#${this.id}`;
    for (var prop of Object.keys($select)) {
        $(this).css(prop, $default[prop]);
        $(s).css(prop, $default[prop]);
        $(`.legend-item${s}`).css(prop, $default[prop]);
    }
}

$(".legend-item").hover(
    function () {
        var el = $(this);
        var elID = $(this).attr("id");
        for (var prop of Object.keys($select)) {
            $(`.area#${elID}`).css(prop, $select[prop]);
            $(this).css(prop, $select[prop]);
            $(`#${elID}`).css(prop, $select[prop]);
        }
        d3.select(`.area#${elID}`).moveToFront();
    },
    function() {
        var el = $(this);
        var elID = $(this).attr("id");
        for (var prop of Object.keys($select)) {
            $(`.area#${elID}`).css(prop, $default[prop]);
            $(this).css(prop, $default[prop]);
            $(`#${elID}`).css(prop, $default[prop]);
        }

    }
);