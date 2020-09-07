<template>
  <div class="box">
    <img class="imgBanner" src="@img/banner.jpg" alt="">
    <appointment-form></appointment-form>
  </div>
</template>

<script>
import AppointmentForm from "./components/AppointmentForm.vue";
export default {
  name: "Index",
  components: {
    AppointmentForm
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {

  },
  mounted() {},
  beforeRouteLeave (to, from, next) {
    // if(to.name === 'notice'){
    //   from.meta.keepAlive = true
    // }else{
    //   from.meta.keepAlive = false
    // }
    next()
  }
};
</script>


<style lang="stylus" scoped>
@import '~@styles/mixins.styl';
.imgBanner{
  width:100%;
}
</style>