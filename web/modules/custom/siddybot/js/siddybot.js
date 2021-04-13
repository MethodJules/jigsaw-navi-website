var App = new Vue({
    el: '#app',
    data: {
        youMessage:'',
        messages: [
            {
                body: 'Hi there I am Siddy! I will guide you through this platform.',
                author: 'siddy'
            },
        ]
    },
    methods: {
        sendMessage(direction) {
            const url = "http://siddybot.x-navi.de/webhooks/rest/webhook";
            if(direction === 'out') {
                //axios.get(url).then(response => {
                //    console.log(response.data)
                //});

                axios.post(url, {
                    sender: "test_user",
                    message: this.youMessage
                }).then((response) => {
                    console.log(response);
                    console.log(response.data)
                    const botmessages = response.data;
                    this.recvieveMessageFromBot(botmessages);
                }, (error) => {
                    console.log(error);
                });

                this.messages.push({body: this.youMessage, author: 'you'})
            }
            //Vue.nextTick(() => {
            //    let messageDisplay = this.$ref.chatArea
            //    messageDisplay.scrollTop = messageDisplay.scrollHeight
            //})
        },

        recvieveMessageFromBot(botmessages) {
            botmessages.forEach(botmessage => {
                console.log(botmessage.text)
                this.messages.push({body: botmessage.text, author: 'siddy'})
            });
        }
    }
})
