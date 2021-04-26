var app = new Vue({

    el: '#root',
    data: {
        contactIndex: 0, // Index of the active contact
        searchContact: '', // Empty input area for the contact search bar
        writeMessageInput: '', // Empty input area to send a message
        darkMode: false,
        // Boolzap Contacts
        contacts: [
            // Michele
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                selected: 'selectedActive',
                lastSeen: '',
                currentDeletedMessageIndex: '',
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
                lastSeen: '',
                currentDeletedMessageIndex: '',
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
                lastSeen: '',
                currentDeletedMessageIndex: '',
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
                lastSeen: '',
                currentDeletedMessageIndex: '',
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
        ],
        // List of automatic computer replies and user possible messages
        automaticReplies: [
            {
                userText: 'hey',
                computerReply: 'hey ciao!'
            },
            {
                userText: 'hey ciao, come stai?',
                computerReply: 'hey, tutto bene tu?'
            },
            {
                userText: 'bene grazie!',
                computerReply: 'mi fa piacere :)'
            },
            {
                userText: 'hey, ti va di andare al cinema?',
                computerReply: 'ok, volentieri!'
            },
            {
                userText: 'ciao',
                computerReply: 'hey ciao!'
            },
        ]
    },
    methods: {
        // This function shows the related chat based on the contact index
        showChat(index) {
            this.contactIndex = index;
        },
        // This function filters the chat by contact name and lets you search them in the contact search bar
        filterChat() {
            this.contacts.forEach((element) => {                
                if (element.name.toLowerCase().includes(this.searchContact.toLowerCase())) {
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },
        // This function sends your messages and replies with an automatic response
        sendMessage() {
            let computerReply = 'Non ho capito, mi dispiace!';

            this.automaticReplies.forEach( (element) => {
                if (this.writeMessageInput == element.userText) {

                    computerReply = element.computerReply;
                }
            });

            this.contacts[this.contactIndex].messages.push({
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: this.writeMessageInput,
                status: 'sent',
                userClick: false,
                shown: true
            });

            this.writeMessageInput = ''
            const sentMessageContactIndex = this.contactIndex;

            setTimeout(() => {
                this.contacts[sentMessageContactIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: computerReply,
                    status: 'received',
                    userClick: false,
                    shown: true
                });
            }, 1000);
        },
        // This function opens the dropdown based on the message index
        toggleDropdown(index) {
            let indice = index;
            this.contacts[this.contactIndex].messages.forEach((element, index) => {
                if (indice == index) {
                    element.userClick = !element.userClick;
                }
            });
        },
        // This function closes the dropdown
        closeDropdown () {
            this.contacts[this.contactIndex].messages.forEach((element) => {
                element.userClick = false;
            });
        },
        // This function deletes the message through index and it populates currentDeletedMessageIndex in every contact
        deleteMessage(index) {
            let indice = index;
            this.contacts[this.contactIndex].messages.forEach((element, index) => {
                if (indice == index) {
                    element.shown = false;
                    element.userClick = false;
                    this.contacts[this.contactIndex].currentDeletedMessageIndex = index;
                }
            });
        },
        // This functions keeps the contact selected when you select a contact on the list
        selectContact(index) {
            let indice = index;
            this.contacts.forEach((element, index) => {
                if (indice == index) {
                    element.selected = 'selectedActive';
                } else if (indice == index || element.selected == 'selectedActive'){
                    element.selected = '';
                }
            });
        },
        // This functions lets you turn on and of the dark mode
        darkThemeOnOff() {
            let darkTheme = document.getElementById('darkmode');

            if (this.darkMode) {
                darkTheme.removeAttribute("href", "css/darkmode.css");
                this.darkMode = false;
            } else {
                darkTheme.setAttribute("href", "css/darkmode.css");
                this.darkMode = true;
            }
        }
    }
});

