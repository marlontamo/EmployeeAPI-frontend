<template>
  <div class="container">
    <div class="row">
    <HelloWorld msg="Welcome to My Vue.js App"/>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/employees" class="btn btn-secondary text-white">List Employee</router-link> |
    <router-link to="/create" class="btn btn-primary text-white">Register Employee</router-link> 
  </nav>
  <router-view/>
  </div>
    </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
