
let helpers = {};

helpers.validators = {};

helpers.validators.isObject = (obj) => {
    return typeof obj == "object" && obj != undefined && obj != null;
}

helpers.validators.contains = (obj, key) => {
    return obj[key] != undefined
}

helpers.validators.setDefault = (obj, key, defaultVal) => {
    if (!helpers.validators.contains(obj, key)) {
        obj[key] = defaultVal;
    }
    return obj;
}

helpers.randomBytes = (n = 10) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < n; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}




export default helpers;