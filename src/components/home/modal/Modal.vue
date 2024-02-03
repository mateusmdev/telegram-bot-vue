<script setup>
import { onMounted, ref, watchEffect, computed } from 'vue'
import InputMessage from './InputMessage.vue'
import Message from './Message.vue'
import firebaseConfig from './../../../config/firebaseConfig'
import { getFirestore, collection, doc, onSnapshot, getDoc, getDocs, query } from "firebase/firestore"

const inputValue = ref('aa')

const messagesArray = ref([])

const sortedMessages = computed(() => {
    const callback = (a, b)  => a.timestamp - b.timestamp
    const result = messagesArray.value.sort(callback)

    return result
})

const props = defineProps({
    closeCallback: {
        type: Function,
        required: true,
    },
    id: {
        type: [Number, String],
        required: true,
    },
    data: {
        type: Array,
        required: true,
        default: []
    }
})

function loadMessages(messages){
    const { id } = props
    console.log(id)
    const db = getFirestore(firebaseConfig)
    const messageCollection = collection(db, `chat/${id}/message`)

    const unsubscribe = onSnapshot(messageCollection, async query => {
        const promises = query.docs.map(async doc => {
            return doc.data()
        })

        messages.value = await Promise.all(promises)
    })
}

onMounted(async () => {
    await loadMessages(messagesArray)
    console.log(messagesArray)
    console.log(props.data)
})
</script>

<template>
    <div class="modal-wrapper fixed border-r">
        <div class="glass fixed"></div>
        <div class="modal border-r">
            <div class="header">
                <span>User</span>
                <a href="#" v-on:click="props.closeCallback">X</a>
            </div>

            <ul class="message-list border-r">
                dd
                <li v-for="(message, key) in sortedMessages" :key="key">
                    <Message :data="message"/>
                </li>
                {{ inputValue }}aaa
            </ul>
            <InputMessage class="border-r" placeholder="Digite sua mensagem" @send="sendMessage"/>
        </div>
    </div>
</template>

<style scoped>
    a{
        color: white;
    }
    .header{
        display: flex;
        justify-content: space-between;
        color: var(--highlight-color);
    }
    .fixed{
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .modal-wrapper{
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .glass{
        background: var(--second-color);
        positsion: absolute;
        opacity: 0.4;
        z-index: -1;
    }
    .modal{
        width: 88%;
        max-width: 1000px;
        height: 88%;
        background: var(--primary-color);
        padding: 1.2rem 1.8rem;
        display: flex;
        flex-direction: column;
    }
    .message-list{
        background: var(--second-color);
        flex: 1;
        margin: 1rem 0;
        padding: 1rem;
        list-style: none;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .message-list li{
        display: flex;
        flex-direction: column;
    }
</style>