var module = {
};

function getMethods(obj) {
}
var console = {
    log: function (msg) {
        java.lang.System.out.println(msg);
    }
};

function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof(obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
            }
        }
        catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}
