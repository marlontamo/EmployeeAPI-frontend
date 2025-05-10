<template>
  <hr>
  <div class="home">
    
    <HelloWorld msg="Welcome to My Vue App"/>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
