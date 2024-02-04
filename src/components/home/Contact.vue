<script setup>
import { onMounted } from "vue"
import firebaseConfig from './../../config/firebaseConfig'
import { getFirestore } from "firebase/firestore"

const emit = defineEmits(['openModal'])

const props = defineProps({
    userData: {
        type: Object,
        required: true,
        default: {}
    },
})

function openModal(event){
    event.preventDefault()
    const { docId } = props.userData
    emit('openModal', { 
        docId, 
        userId: props.userData.id,
        name: props.userData.first_name
    })
}

</script>

<template>
    <li>
        <div class="contact-info">
            <p>{{ props.userData.first_name }}</p> - 
            <p title="ola">{{ props.userData.id }}</p>
        </div>
        <div class="message">
            <p class="align">{{ props.userData.messages }} Mensagens</p>
            <a href="#" class="message-btn" v-on:click="openModal"></a>
        </div>
    </li>
</template>

<style scoped>
    li{
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        background-color: var(--second-color);
        color: var(--color-text);
        margin-bottom: 0.8rem;
    }
    .contact-info{
        display: flex;
        backgrounsd: red;
    }
    .contact-info p{
        margin: 0 0.3rem;
    }
    .align{
        margin-right: 1.3rem;
        backgsround: blue;
    }
    .message{
        backgrousnd: red;
        display: flex;
        justify-content: space-between;
    }
    .message-btn{
        color: var(--hightlight-color);
        backgrsound: red;
        display: inline-block;
        width: 1.3rem;
        height: 1.3rem;
        background-image: url('./../../assets/message-btn.svg');
        background-repeat: no-repeat;
        background-size: 85%;
        background-position: 50% 80%;
    }
</style>