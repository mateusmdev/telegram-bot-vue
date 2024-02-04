<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'text',
        validator(value) {
            return ['text', 'password'].includes(value)
        }
    },
    placeholder: {
         type: String,
    },
    value: {
         type: String,
    }
})

const classObject = reactive({
    user: props.type === 'text',
    password: props.type === 'password'
})
</script>

<template>
    <input :type="type" class="border-r icon" :class="classObject" :placeholder="props.placeholder"/>
</template>

<style scoped>
    input{
        padding: 0.6rem;
        padding-left: 3rem;
        background: var(--primary-color);
        border: none;
        color: var(--color-text);
        width: 100%;
        outline: none;
    }
    .icon{
        background-repeat: no-repeat;
        background-size: 5%;
        background-position: 5% 50%;
    }
    .icon.user {
        background-image: url('./../../assets/user-icon.svg');
    }
    .icon.password{
        background-image: url('./../../assets/password-icon.svg');
    } 
</style>