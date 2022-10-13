function consoleLogJson(object) {
    console.log(object[0].constructor, JSON.stringify(object, null, 2))
}

module.exports = {
    consoleLogJson
}