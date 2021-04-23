var app = new Vue({

    el: '#root',
    data: {
        contactIndex: 0,
        searchContact: '',
        writeMessageInput: '', 
        // Contatti Whatsapp
        contacts: [
            // Michele
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        userClick: false,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        userClick: false,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        userClick: false,
                        status: 'received'
                    }
                ],
            },
            // Fabio
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        userClick: false,
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        userClick: false,
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        userClick: false,
                        status: 'sent'
                    }
                ],
            },
            // Samuele
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        userClick: false,
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        userClick: false,
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        userClick: false,
                        status: 'received'
                    }
                ],
            },
            // Luigi
            {
                name: 'Luigi',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        userClick: false,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        userClick: false,
                        status: 'received'
                    }
                ],
            },
        ]
    },
    methods: {
        showChat(index) {
            this.contactIndex = index;
        },
        filterChat() {
            this.contacts.forEach((element) => {                
                if (element.name.toLowerCase().includes(this.searchContact.toLowerCase())) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },
        sendMessage() {
            if (this.writeMessageInput.length > 0) {
                this.contacts[this.contactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.writeMessageInput,
                    status: 'sent',
                    userClick: false
                });
            }
            this.writeMessageInput = ''

            setTimeout( () => { 
                this.contacts[this.contactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'ok, volentieri!',
                    status: 'received',
                    userClick: false
                });
            }, 1000);
        },
        toggleDropdown(index) {
            let indice = index;
            this.contacts[this.contactIndex].messages.forEach((element, index) => {
                if (indice == index) {
                    element.userClick = !element.userClick;
                } 
            });
        }
    }
});