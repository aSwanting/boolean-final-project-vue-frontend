<template>
    <div class="modal-backdrop">
        <!-- <header class="modal-header">
            <slot name="header">
                Header
            </slot>
            <button type="button" class="btn-close" @click="closeModal"></button>
        </header> -->
        <section class="modal-body">
            <slot name="body">

                <form action="POST" class="message-form" @submit.prevent="submitForm" v-show="isFormActive">

                    <ul class="inputs-container">
                        <li class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <label for="name">Your name:</label><button type="button" class="btn-close"
                                    @click="closeModal"></button>
                            </div>
                            <input type="text" class="form-control" v-model="sender" placeholder="Paolo Rossi" id="name">
                        </li>
                        <li class="mb-3">
                            <label for="email" class="mb-2">Your email:</label>
                            <input type="email" class="form-control" v-model="email" placeholder="paolorossi@gmail.com"
                                id="email">
                        </li>
                        <li class="mb-3">
                            <label for="subject" class="mb-2">Subject:</label>
                            <input type="text" class="form-control" v-model="subject"
                                placeholder="Information about the apartment" id="subject">
                        </li>
                        <li class="mb-3">
                            <label for="message" class="mb-2">Message:</label>
                            <textarea type="text" rows="3" id="message" class="form-control" v-model="message"
                                placeholder="Write a message"></textarea>
                        </li>
                    </ul>




                    <button type="submit" @click="messageSent">Send message</button>
                </form>
                <p v-show="messageSentSuccess">Your message has been sent!</p>
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
            store,
            subject: '',
            message: '',
            sender: '',
            email: '',
            isFormActive: true,
            messageSentSuccess: false,
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
            this.$emit('close-modal')
        },
        async submitForm() {
            const data = {

                apartment_id: this.items.id,
                subject: this.subject,
                content: this.message,
                sender: this.sender,
                email: this.email,
            }
            try {
                await axios.post(`${this.store.BACKEND_URL}api/apartments/messages`, data)
                console.log(data)
            } catch (error) {
                console.error('errore durantel\'invio del modulo;', error);
                console.log(data)
            }
        },
        messageSent() {
            this.messageSentSuccess = true
            this.isFormActive = false
        }
    },
    mounted() {
        // console.log(this.submitForm)
    }
}
</script>
<style lang="scss" scoped>
// @use "../styles/partials/_messageModal.scss" as *;

.modal-backdrop {
    position: absolute;
    top: 50%;

    left: 50%;
    bottom: 0;
    margin: auto;
    max-width: 350px;
    max-height: 500px;
    /* Larghezza della modale */
    background-color: white;
    /* Sfondo trasparente */
    z-index: 9999;
    /* Assicura che la modale sia sopra gli altri elementi */
    overflow: auto;
    /* Abilita lo scrolling se la modale è più grande dello schermo */
    border-radius: 10px;
    /* Bordi arrotondati */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* Ombra */
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .btn-close {
        position: relative;
        top: 0;
        right: 0;
        border: none;
        font-size: 14px;
        cursor: pointer;
        font-weight: bold;
    }

    .modal-header {
        position: relative;
        border-bottom: 1px solid;
        background-color: white;
        justify-content: space-between;


    }

    .modal-footer {
        border-top: 1px solid;
        flex-direction: column;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;

        flex-grow: 1;

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
}

.modal-fade-enter,
.modal-fade-leave {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 5s ease;
}

ul {
    margin-bottom: 0;
}

@media (min-width: 576px) {
    .modal-backdrop {
        position: absolute;
        top: 50%;

        left: 50%;
        margin: auto;
        max-width: 500px;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
    }
}


@media (min-width: 768px) {}


@media (min-width: 992px) {}


@media (min-width: 1200px) {}


@media (min-width: 1400px) {}
</style>