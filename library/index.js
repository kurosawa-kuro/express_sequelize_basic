function consoleLogJson(object) {
    if (Object.keys(object).length == 0) {
        console.log("[]")
    } else {
        console.log(object[0].constructor, JSON.stringify(object, null, 2))
    }
}

module.exports = {
    consoleLogJson
}