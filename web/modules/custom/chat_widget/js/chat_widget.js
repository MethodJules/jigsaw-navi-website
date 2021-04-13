(function(Drupal, drupalSettings) {
    //console.log(drupalSettings)
    //Vue
    var App = new Vue({
        el: '#x-navi-chat-widget',
        data: {
            youMessage: '',
            messages: [
                /*
                {
                    body: 'Hi there',
                    author: 'bot'
                },
                {
                    body: 'Hi I am Julien',
                    author: 'you'
                },
                {
                    body: 'What can I do for you?',
                    author: 'bot'
                },
                {
                    body: 'Give me an update...',
                    author: 'you'
                }*/
            ],
            sender: ''
        },
    
        methods: {
            send() {
                console.log('Sending...')
                console.log(this.sender)
                this.messages.push({body: this.youMessage, author: 'you'})
    
                //const url = "http://localhost:5005/webhooks/rest/webhook";
                const url = drupalSettings.rasaBotUrl
                const senderId = drupalSettings.senderId
                axios.post(url,{
                    sender: senderId,
                    message: this.youMessage
                }).then((response) => {
                    console.log(response)
                    console.log('Send to drupal')
                    //this.log()
                    const botmessages = response.data
                    //this.messages.push({body: botmessage.text, author: 'bot'})
                    this.recvieveMessageFromBot(botmessages)
                    this.youMessage = ''
                }, (error) => {
                    console.log(error)
                    this.messages.push({body: 'Es ist ein Fehler passiert', author: 'bot'})
                });
            },

            generateRandomToken() {
                const result = [];
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
                }
                return result.join('');

            },
    
            log() {
                const url = "/web/chat/log";
                axios.post(url, {
                    sender: 'lff',
                    message: 'ddddd',
                }). then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                })
            },
    
            recvieveMessageFromBot(botmessages) {
                botmessages.forEach(botmessage => {
                    console.log(botmessage.text)
                    this.messages.push({body: botmessage.text, author: 'bot'})
                });
            }
        },
    
        watch: {
    
            // on a new message, get the new container height and scroll to bottom
            messages: function() {
                let messageContainer = document.getElementById("x-navi-chat-messages");
                // account for DOM update delay
                setTimeout(function() {
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }, 100);
            },
        },

        mounted() {
            this.sender = this.generateRandomToken(5)
        }
    })
    







})(Drupal, drupalSettings);

