function consoleLogJson(object) {
    if (object === null) {
        console.log("empty:null")
    } else if (Object.keys(object).length == 0) {
        console.log("empty:[]")
    } else {
        console.log("else")
        // console.log("object", object)
        console.log("object[0]", object[0])
        console.log("Array.isArray(object)", Array.isArray(object))
        if (Array.isArray(object) == true) {
            console.log("object[0]")
            console.log(object[0].constructor, JSON.stringify(object, null, 2))
        } else {
            console.log("object")
            console.log(object.constructor, JSON.stringify(object, null, 2))
        }

    }
}

module.exports = {
    consoleLogJson
}