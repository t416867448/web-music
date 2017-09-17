<template>
   <div id="app">
      <top></top>
      <tab></tab>
      <router-view></router-view>
      <player></player>
   </div>
</template>

<script>
import top from 'components/header/header'
import tab from 'components/tab/tab'
import player from 'components/player/player'
export default {
   components: {
      top,
      tab,
      player
   }
}
</script>

<style>

</style>
