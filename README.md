# tbmodular
tbparty but for more trollbox stuff
## What is this basically?
This is just [tbparty](https://www.npmjs.com/package/tbparty), but like the name says, it's modular
## What to do?
You can use this library instead of `socket.io-client`.
```js
var tbm = require("tbmodular") // It will be a actual library soon...

var pref = "!"
var socket = tbm.Bot(/* leave empty like tbparty */)

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
var tbm = require("tbmodular")
tbm.cURL = "URL" // Optional
var socket = tbm.Bot(/* leave empty */)

// Code here
```
### All Recently New! (ARN)
Now, you don't need to use `socket.emit()`! You can simply use `socket.join()`, with the following arguments:
```json
{
  name: "bot",      // The name of the bot
  color: "#696969", // The color of the bot
}
```

## Credits
Thank you for the library [tbparty](https://www.npmjs.com/package/tbparty)!
