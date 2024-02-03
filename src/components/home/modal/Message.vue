<script setup>
import { computed, onMounted, reactive, ref } from 'vue'


const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: {}
    },
    text: {
        type: String,
        required: true,
        default: ''
    },
    isUaser: {
        type: Boolean,
        required: true,
    }
})

const isUser = computed(() => {
    return props.data.type === 'user'
})

const formatedDate = computed(() => {
    const data = new Date(props.data.timestamp)
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0')
    return `${horas}:${minutos}`
})

</script>

<template>
    <div class="message" :class="{ you: !isUser, user: isUser}">
        <div class="content">
            {{ props.data.text }}
        </div>

        <div class="hour-wrap">
            <span class="hour">
                {{ formatedDate }}
            </span>
        </div>
    </div>
</template>

<style scoped>
    
    .message{
        padding: 0.3rem 1rem;
        display: inline-block;
        border-radius: 20px;
        position: relative;
        color: white;
        margin-bottom: 1rem;
        max-width: 50%;
        word-break: break-all;
        white-space: pre-wrap;
    }
    .content{
        position: relative;
    }
    .hour-wrap{
        position: relative;
        width: 3rem;
        height: 1rem;
        margin-left: auto   ;
        margin-top: 0.15rem;
    }
    .hour{
        font-size: 10.5px;
        position: absolute;
        right: -0.3rem;
        bottom: 0rem;
        color: rgba(255, 255, 255, 0.5);
        display: inline-block;
        margin-left: 1rem;
    }
    .you{
        align-self: flex-end;
        background: #1976D2;
    }
    .user{
        align-self: flex-start;
        background: #2B3648;
    }
</style>