<template>
    <div class="modal-backdrop">
        <header class="modal-header">
            <slot name="header">
                Header
            </slot>
            <button type="button" class="btn-close" @click="closeModal">
                close
            </button>
        </header>
        <section class="modal-body">
            <slot name="body">
                <form action="POST" class="message-form" @submit.prevent="submitForm" v-show="isFormActive">
                    <ul class="inputs-container">
                        <li>
                            <label for="name" class="form-label">Your name:</label>
                            <input type="text" class="form-control" v-model="sender" placeholder="sender" id="name">
                        </li>
                        <li>
                            <label for="email" class="form-label">Your email:</label>
                            <input type="email" class="form-control" v-model="email" placeholder="Email" id="email">
                        </li>
                        <li>
                            <label for="subject" class="form-label">Subject:</label>
                            <input type="text" class="form-control" v-model="subject" placeholder="subject" id="subject">
                        </li>
                        <li>
                            <label for="message" class="form-label">Message:</label>
                            <textarea type="text" id="message" class="form-control" v-model="message" placeholder="Write a message"></textarea>
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

    right: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 500px;
    /* Larghezza della modale */
    background-color: rgba(255, 255, 255, 0.842);
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

    .modal-header {
        position: relative;
        border-bottom: 1px solid;
        background-color: white;
        justify-content: space-between;

        .btn-close {
            position: relative;
            top: 0;
            right: 0;
            color: red;
            border: none;
            font-size: 20px;
            padding: 10px;
            cursor: pointer;
            font-weight: bold;
        }
    }

    .modal-footer {
        border-top: 1px solid;
        flex-direction: column;
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
        flex-grow: 1;
        .message-form {

            display: flex;
            flex-direction: column;
            height: 100%;
            
            .inputs-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
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

        .btn-send {
            color: green;
            border: none;
            border-radius: 4px;
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
</style>