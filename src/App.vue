<template>
  <div id="app">
    <div id="nav">
      <!-- Router link looks up the path from index.js-->
      <router-link :to="{ name: 'event-list' }">List</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link>
    </div>
    <!-- Router view renders the component from index.js-->
    <router-view />
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
