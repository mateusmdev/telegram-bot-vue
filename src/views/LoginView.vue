<script setup>
    import { ref } from 'vue'
    import Input from './../components/login/Input.vue'
    import api from './../config/api'
    import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

    const username = ref('')
    const password = ref('')
    const router = useRouter()

    async function login(event){
        event.preventDefault()

        const isEmpty = username.value.trim() === '' || password.value.trim() === ''
        if (isEmpty){
            alert('Você precisar preencher os 2 campos para fazer login.')
            return
        }

        const body = {
            username: username.value,
            password: password.value
        }

        try {
            const response = await api.post('/authentication', body)
            const token = response.data.token
            localStorage.setItem('token-bot', token)
            router.push('/home')
        } catch (error) {
            console.log(error)
            if (error.response.data.status === 401){
                alert("Usuário não autenticado!");
                localStorage.setItem('token-bot', '')
            }
            else
                alert("Ocorreu um erro e não foi possível se conectar ao servidor");
        }
    }
</script>

<template>
    <div class="form-wrapper">
        <h1>Login - Administrator</h1>
        <form action="#" class="border-r" v-on:submit="login">
            <Input type="text" class="margin-bottom" placeholder="Username" @input="(e) => username = e.target.value" />
            <Input type="password" class="margin-bottom" placeholder="Senha" @input="(e) => password = e.target.value"/>
            <button type="submit" class="btn-submit border-r">Logar</button>
        </form>
    </div>
</template>

<style scoped>
    .form-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        flex-direction: column;
    }
    h1{
        font-size: 12px;
        margin-left: -230px;
        margin-top: -2rem;
        color: rgba(255, 255, 255, 0.4);
    }
    form{
        padding: 1.8rem 1.5rem;
        background-color: var(--second-color);
        width: 100%;
        max-width: 350px;
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
    .margin-bottom{
        margin-bottom: 1.2rem;
    }
    .btn-submit{
        outline: none;
        border: none;
        background-color: var(--highlight-color);
        align-self: flex-end;
        padding: 0.3rem 1.3rem;
        color: var(--second-color);
        cursor: pointer;
        transition: 0.5s;
    }
    .btn-submit:hover{
        background-color: var(--highlight-hover);
    }
</style>