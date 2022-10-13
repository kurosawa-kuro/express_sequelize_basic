function consoleLogJson(object) {
    if (object === null) {
        console.log("empty:null")
    } else if (Object.keys(object).length == 0) {
        console.log("empty:[]")
    } else {
        if (Array.isArray(object) == true) {
            console.log(object[0].constructor, JSON.stringify(object, null, 2))
        } else {
            console.log(object.constructor, JSON.stringify(object, null, 2))
        }

    }
}

module.exports = {
    consoleLogJson
}