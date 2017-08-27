<template>
   <div id="app">
      <top></top>
      <tab></tab>
      <router-view></router-view>
   </div>
</template>

<script>
import top from 'components/header/header'
import tab from 'components/tab/tab'
export default {
   components: {
      top,
      tab
   }
}
</script>

<style>

</style>
