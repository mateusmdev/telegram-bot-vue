<script setup>
  import { onMounted, ref } from 'vue'
  import Contact from './../components/home/Contact.vue'
  import LogoutSVG from './../assets/logout-icon.svg'
  import Modal from './../components/home/modal/Modal.vue'
  import firebaseConfig from './../config/firebaseConfig'
  import { getFirestore, collection, doc, onSnapshot, getDoc, getDocs } from "firebase/firestore"

  const ENV = import.meta.env

  const isOpen = ref(false)
  const users = ref([])
  const idUser = ref([])

  function handleOpenModal(event){
    isOpen.value = true
    idUser.value = event
  }

  async function loadUserData(users){
    const db = getFirestore(firebaseConfig)
    const chatCollection = collection(db, 'chat')

    const unsubscribe = onSnapshot(chatCollection, async query => {
      const promises = query.docs.map(async doc => {
        const { first_name, id } = doc.data()

        const userMessageRef = collection(doc.ref, 'message')
        const result = await getDocs(userMessageRef)

        const user = {
          id: id,
          docId: doc.id,
          first_name,
          messages: result.docs.length
        }

        return user
        
      })
      users.value =  await Promise.all(promises)
    })
  }

  onMounted(async () => {
    await loadUserData(users)

  })
</script>

<template>
  <h1 class="border-r">Chat</h1>
  <main>
    <ul>
      <Contact v-for="contact in users" :key="contact.id" :userData="contact" v-on:openModal="handleOpenModal"/>
      <!-- <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact /> -->

    </ul>
  </main>
  <Modal v-if="isOpen" :id="idUser" :data="data" :closeCallback="() => {isOpen = false; idUser = null}" />
  <a href="#" class="logout-btn border-r">
    <img :src="LogoutSVG" alt="logout-icon.svg">
    <span>Sair</span>
  </a>
</template>
<style scoped>
  h1{
    font-size: 1.2rem;
    background-color: var(--second-color);
    padding: 0.85rem 1.53rem;
    color: var(--color-text);
    font-weight: normal;
    border-bottom: 2px solid var(--highlight-color);
    margin-bottom: 2rem;
  }
  ul{
    list-style: none;
    height: 18.5rem;
    overflow: auto;
    padding-right: 0.7rem;
  }
  .logout-btn{
    position: relative;
    bottom: -12rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-decoration: none;
    background-color: var(--second-color);
    overflow: hidden;
    width: 90px;
    height: 40px;
    padding: 0.6rem 0.6rem;
    color: var(--highlight-color);
    z-index: 1;
  }
  .logout-btn img{
    display: inline-block;
    width: 30%;
  }
</style>