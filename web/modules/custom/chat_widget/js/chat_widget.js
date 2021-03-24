(function(Drupal, drupalSettings) {
    console.log(drupalSettings)
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
        },
    
        methods: {
            send() {
                console.log('Sending...')
                this.messages.push({body: this.youMessage, author: 'you'})
    
                //const url = "http://localhost:5005/webhooks/rest/webhook";
                const url = drupalSettings.rasaBotUrl
                axios.post(url,{
                    sender: 'you',
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
    })
    







})(Drupal, drupalSettings);

