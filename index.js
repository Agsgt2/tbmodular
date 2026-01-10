const io = require('socket.io-client');

var cURL = "https://windows93.net:8081";

function appendJSON(x,y) {
    return Object.fromEntries(Object.entries(x).concat(Object.entries(y)));
}

class BotSocket extends io {
    
    constructor(url = cURL,options = {}) {
        options = appendJSON({path: "/api/v0/si", forceNew: true},options)
        super(url,options);
        this.msgstack = [];
        this.typing = false;
        this.ogemit = this.emit;
        this.ping = 0;
	this.alt = false;
        this.on('pong',(ms) => {
            this.ping = ms;
        })
        setInterval(() => {
            //console.log(this.msgstack,this.msgstack.length)
            if (this.msgstack.length < 1) return;
            this.stopTyping()
            var d = this.msgstack.pop()
            //console.log(d)
            this.ogemit("message",d+(this.alt ? ' ' : ''));
            this.alt = !this.alt;
            //this.msgstack.splice(this.msgstack.length-1,1)
            this.startTyping();

        },1000);
        // anti spam bypass :D
        this.on('connect',() => {
            this.startTyping();
        })
        // had to do it this way because of some error that i could not get past
        this.send = (msg) => {
            // add to the stack
            this.msgstack.push(msg);
            
        }
        this.emit = (event,...args) => {
            switch (event) {
                case "message":
                    this.send(...args);
                    break;
                default:
                    this.ogemit(event,...args);
                    break;
            }
        }
		this.join(info){
			this.emit("user joined", info.name, info.color)
		}
        this.startTyping = () => {
            this.typing = true;
            this.emit('typing')
        }
        this.stopTyping = () => {
            this.typing = false;
            this.emit('typing',false);
        }
    }
    
    
}
function Bot(...args) {
    return new BotSocket(...args)
}


module.exports = {Bot, cURL};


