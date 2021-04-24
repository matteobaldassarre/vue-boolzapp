var app = new Vue({

    el: '#root',
    data: {
        contactIndex: 0,
        searchContact: '',
        writeMessageInput: '',
        active: false,
        // Contatti Whatsapp
        contacts: [
            // Michele
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                selected: 'selectedActive',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        userClick: false,
                        shown: true,
                        status: 'received'
                    }
                ],
            },
            // Fabio
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                selected: '',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        userClick: false,
                        shown: true,
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    }
                ],
            },
            // Samuele
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                selected: '',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        userClick: false,
                        shown: true,
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        userClick: false,
                        shown: true,
                        status: 'received'
                    }
                ],
            },
            // Luigi
            {
                name: 'Luigi',
                avatar: '_4',
                visible: true,
                selected: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        userClick: false,
                        shown: true,
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        userClick: false,
                        shown: true,
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
        // Funzione che invia il messaggio al computer e fa partire una risposta automatica in base al messaggio
        sendMessage() {
            if (this.writeMessageInput === 'hey ciao, come stai?' || this.writeMessageInput === 'come stai?') {
                this.contacts[this.contactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.writeMessageInput,
                    status: 'sent',
                    userClick: false,
                    shown: true
                });

                this.writeMessageInput = ''

                setTimeout(() => {
                    this.contacts[this.contactIndex].messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'hey, tutto bene tu?',
                        status: 'received',
                        userClick: false,
                        shown: true
                    });
                }, 1000);
            } else if (this.writeMessageInput === 'bene grazie!' ) {
                
                this.contacts[this.contactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.writeMessageInput,
                    status: 'sent',
                    userClick: false,
                    shown: true
                });

                this.writeMessageInput = ''

                setTimeout(() => {
                    this.contacts[this.contactIndex].messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'mi fa piacere :)',
                        status: 'received',
                        userClick: false,
                        shown: true
                    });
                }, 1000);

            } else if (this.writeMessageInput.length > 0) {
                this.contacts[this.contactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: this.writeMessageInput,
                    status: 'sent',
                    userClick: false,
                    shown: true
                });

                this.writeMessageInput = ''

                setTimeout(() => {
                    this.contacts[this.contactIndex].messages.push({
                        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                        text: 'ok, volentieri!',
                        status: 'received',
                        userClick: false,
                        shown: true
                    });
                }, 1000);
            } 
        },
        // Funzione per aprire il dropdown del messaggio in base all'indice di esso
        toggleDropdown(index) {
            let indice = index;
            this.contacts[this.contactIndex].messages.forEach((element, index) => {
                if (indice == index) {
                    element.userClick = !element.userClick;
                }
            });
        },
        // Funzione che chiude il dropdown
        closeDropdown () {
            this.contacts[this.contactIndex].messages.forEach((element) => {
                element.userClick = false;
            });
        },
        // Funzione che elimina il messaggio selezionato in base all'indice
        deleteMessage(index) {
            let indice = index;
            this.contacts[this.contactIndex].messages.forEach((element, index) => {
                if (indice == index) {
                    element.shown = false;
                    element.userClick = false;
                }
            });
        },
        // Funzione che seleziona il contatto nella lista contatti mantenendolo attivo
        selectContact(index) {
            let indice = index;
            this.contacts.forEach((element, index) => {
                if (indice == index) {
                    element.selected = 'selectedActive';
                } else if (indice == index || element.selected == 'selectedActive'){
                    element.selected = '';
                }
            });
        }
    }
});