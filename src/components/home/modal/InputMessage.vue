<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
      default: ''
  },
})

const emit = defineEmits(['send'])

const inputValue = ref('')
const isEmpty = ref(true)

function handleKeyDown(event) {
  const isBreakLine = event.shiftKey && event.key === 'Enter'

  if (isBreakLine) return

  const isEnterKey = event.key === 'Enter';
  if (isEnterKey) {
    event.preventDefault();
    emit('send', inputValue.value)
    handleSendMessage(event.target);
  }
}

function handleInput(event) {
  const element = event.target;
  const arrayText = [...element.innerText];
  const isEmpty = arrayText.length === 1 && arrayText.join('') === '\n'
  inputValue.value = isEmpty ? '' : arrayText.join('')
}

function handleSendMessage(element) {
  if (inputValue.value === '') return;
  // Limpar o conteúdo após o envio da mensagem
  inputValue.value = '';
  element.innerText = inputValue.value
}

</script>

<template>
    <div class="input">
    <p class="  placeholder">{{ inputValue === '' ? placeholder : '' }}</p>
    <div
      class="input-content" 
      contenteditable="true"
      @keydown="handleKeyDown"
      @input="handleInput"
    >
    </div>

  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: fit-content;
}
.input{
    background: var(--second-color);
    padding: 0.7rem 1.1rem;
    position: relative;
    width: 100%;
    flex-direction: column;
}
.placeholder{
  position: absolute;
  color: rgba(220, 220, 255, 0.3);
}

.input-content{
    left: 0px;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    word-break: break-all;
    z-index: 1;
    position: relative;
    outline: none;
    color: rgba(220, 220, 255, 0.5);
}
</style>