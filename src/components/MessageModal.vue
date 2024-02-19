<template>
    <div class="modal-backdrop">
        <section class="modal-body" :class="{ 'sended-message': messageSentSuccess }">
            <slot name="body">

                <form action="POST" class="message-form" @submit.prevent="submitForm" v-show="isFormActive">

                    <ul class="inputs-container">
                        <li class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <label for="name">Your name:</label><button type="button" class="btn-close"
                                    @click="closeModal"></button>
                            </div>
                            <input type="text" class="form-control" v-model="sender" placeholder="Paolo Rossi" id="name">
                            <p v-if="errors.sender" class="error-message">{{ errors.sender }}</p>
                        </li>
                        <li class="mb-3">
                            <label for="email" class="mb-2">Your email:</label>
                            <input type="email" class="form-control" :class="{ 'error-input': errors.email }"
                                v-model="email" @input="validateEmail" placeholder="paolorossi@gmail.com" id="email">
                            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                        </li>
                        <li class="mb-3">
                            <label for="subject" class="mb-2">Subject:</label>
                            <input type="text" class="form-control" v-model="subject"
                                placeholder="Information about the apartment" id="subject">
                            <p v-if="errors.subject" class="error-message">{{ errors.subject }}</p>
                        </li>
                        <li class="mb-4">
                            <label for="message" class="mb-2">Message:</label>
                            <textarea type="text" rows="3" id="message" class="form-control" v-model="message"
                                placeholder="Write a message"></textarea>
                            <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
                        </li>
                    </ul>




                    <button type="submit" @click="messageSent">Send message</button>
                </form>
                <div class="success-message container" v-show="messageSentSuccess">
                    <button type="button" class="btn-close " @click="closeModal"></button>
                    <p>{{ messagePositiveResponse }}</p>
                </div>

            </slot>
        </section>
        <!-- <footer class="modal-footer">
        
        </footer> -->
    </div>
</template>
<script>
import axios from 'axios';
import store from '../store';
export default {
    data() {
        return {
            messagePositiveResponse: 'Your message has been sent!',
            store,
            subject: '',
            message: '',
            sender: '',
            email: '',
            isFormActive: true,
            messageSentSuccess: false,
            errors: {},
        };
    },
    props: {
        items: {
            type: Object,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
            this.messageSentSuccess = false;
            this.isFormActive = true;
            this.subject = '';
            this.message = '';
            this.sender = '';
            this.email = '';
            this.errors = {};
        },
        async submitForm() {
            this.validateEmail();
            this.validateSubject();
            this.validateSender();
            this.validateContent();

            console.log(this.isValidName(this.sender))

            if (this.validateFormData()) {
                const data = {

                    apartment_id: this.items.id,
                    subject: this.subject.trim(),
                    content: this.message.trim(),
                    sender: this.formatFullName(this.sender.trim()),
                    email: this.email,
                };
                console.log(data)
                try {
                    await axios.post(`${this.store.BACKEND_URL}api/apartments/messages`, data)
                    // console.log(data)
                } catch (error) {
                    console.error('errore durantel\'invio del modulo;', error);
                    // console.log(data)
                }
            } else {
                this.messageNotSent()
                console.log('Dati non validi');
                console.log(this.errors)
            }

        },
        validateFormData() {
            return Object.keys(this.errors).length === 0;
        },
        messageSent() {
            this.messageSentSuccess = true
            this.isFormActive = false
        },
        messageNotSent() {
            this.messageSentSuccess = false
            this.isFormActive = true
        },

        validateEmail() {
            if (!this.email) {
                this.errors.email = 'Email is required';
            } else if (!this.isValidEmail(this.email)) {
                this.errors.email = 'Email is not valid';
            } else {
                delete this.errors.email;
            }
        },
        validateSubject() {
            if (!this.subject) {
                this.errors.subject = 'Subject is required';
            } else {
                const trimmedSubject = this.subject.trim()

                if (trimmedSubject.length > 40) {
                    this.errors.subject = 'Subject has to be < 40 characters'
                } else {
                    delete this.errors.subject;
                }
            }
        },
        validateSender() {
            if (!this.sender) {
                this.errors.sender = 'Sender is required';
            } else {
                const trimmedSender = this.sender.trim()
                if (!this.isValidName(trimmedSender)) {
                    this.errors.sender = 'Please enter a valid full name (First Name Last Name)'
                } else if (trimmedSender.length > 40) {
                    this.errors.sender = 'Sender has to be < 40 characters'
                } else {
                    delete this.errors.sender;
                }

            }
        },
        validateContent() {
            if (!this.message) {
                this.errors.message = 'Content is required';
            } else {
                const trimmedMessage = this.message.trim()

                if (trimmedMessage.length > 500) {
                    this.errors.message = 'Message cannot exceed 500 characters';
                } else if (trimmedMessage.length < 10) {
                    this.errors.message = 'Message must have > 10 characters';
                } else {
                    delete this.errors.message;
                }
            }

        },
        formatFullName(sender) {
            const parts = sender.split(' ');
            const formattedParts = [];
            parts.forEach(part => {
                if (part) {
                    formattedParts.push(part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                }
            });
            sender = formattedParts.join(' ');
            return sender;
        },
        isValidEmail(email) {
            // Implementa la tua logica di validazione dell'email
            return /\S+@\S+\.\S+/.test(email);
        },
        isValidName(sender) {
            return /^[a-zA-Z]+ [a-zA-Z]+$/.test(sender)
        }
    },
    mounted() {
        // console.log(this.isValidName(sender))
    }
}
</script>
<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .btn-close {
        position: absolute;
        right: 8px;
        top: 8px;
        border: none;
        font-size: 14px;
        cursor: pointer;
        font-weight: bold;
    }

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

        .message-form {

            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 14px;

            .inputs-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                padding-left: 0;
            }
        }

        .form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            appearance: none;
            background-color: white;
            background-clip: padding-box;
            border: 1px solid black;
            border-radius: 20px;
            box-shadow: 4px rgba(0, 0, 0, 0.712);
            transition-duration: 1500ms, 1500ms;
            transition-timing-function: ease-in-out, ease-in-out;
            transition-delay: 0, 0;
            transition-property: box-shadow;
        }

        #message {
            height: 80%;
            overflow-y: auto;
            resize: none;
        }

    }

    .success-message {
        display: flex;
        padding: 10px;
        align-items: center;
        justify-content: center;
        height: 100%;

        p {
            flex-grow: 1;
            margin: 0;
            text-align: center;
        }
    }

    .error-input {
        border: 1px solid red;
        /* Aggiungi uno stile per evidenziare l'errore */
    }

    .error-message {
        color: red;
        /* Aggiungi uno stile per il messaggio di errore */
    }
}


.sended-message {
    background-color: $primary !important;
    height: 100px;
    font-size: 20px;
}



ul {
    margin-bottom: 0;
}

@media (min-width: 576px) {}


@media (min-width: 768px) {}


@media (min-width: 992px) {}


@media (min-width: 1200px) {}


@media (min-width: 1400px) {}
</style>