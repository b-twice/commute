const $selectOpacity = ".8";
const $defaultOpacity = ".5";

function $mapMouseOver(f) {
    var key = f.feature.properties.dest.toLowerCase();
    $(f._container).css("opacity", $selectOpacity);
    $(`.area#${key}`).css("opacity", $selectOpacity);
    $(`.legend-item#${key}`).css("opacity", $selectOpacity);
    f.bringToFront();
}
function $mapMouseOut(f) {
    var key = f.feature.properties.dest.toLowerCase();
    $(f._container).css("opacity", $defaultOpacity);
    $(`.area#${key}`).css("opacity", $defaultOpacity);
    $(`.legend-item#${key}`).css("opacity", $defaultOpacity);
    f.bringToBack();
}

function $graphMouseOver() {
    var s = `#${this.id}`;
    $(this).css("opacity", $selectOpacity );
    $(s).css("opacity", $selectOpacity );
    $(`.legend-item${s}`).css("opacity", $selectOpacity );
}
function $graphMouseOut() {
    var s = `#${this.id}`;
    $(this).css("opacity", $defaultOpacity);
    $(s).css("opacity", $defaultOpacity);
    $(`.legend-item${s}`).css("opacity", $defaultOpacity);
}