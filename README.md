# tbmodular
tbparty but for more trollbox stuff
## What is this basically?
This is just [tbparty](https://www.npmjs.com/package/tbparty), but like the name says, it's modular
## What to do?
You can use this library instead of `socket.io-client`.
```js
var io = require("tbmodular") // It will be a actual library soon...

var pref = "!"
var socket = io(/* leave empty like tbparty for default trollbox */)

socket.emit("user joined", "bot", "#696969", "", "")
socket.on("message", data => {
  console.log(data.nick+": "+data.msg)
  if (data.msg == pref + "ping"){
    socket.send("Pong!")
  }
})
```
Same as tbparty, you can replace:
```js
var io = require("socket.io-client")
var socket = io("URL")

// Code here
```
...With:
```js
var io = require("tbmodular")
var socket = io("URL, leave empty for default trollbox")

// Code here
```
