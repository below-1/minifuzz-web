<template>
  <div 
    class="hero text-white column items-center q-py-xl text-center">
    <q-avatar 
      color="indigo-5"
      text-color="white"
      size="5rem"
      icon="receipt_long" />
    <p class="text-h3 text-weight-bold">{{ title }}</p>

    <div class="row flex-center">
      <div class="col-md-9 col-sm-12">
        <p class="text-h6">{{subtitle}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hero {
    background-image: linear-gradient(to bottom, #111A, #111B), url(/hero-2.jpg);
    background-attachment: fixed;
  }
</style>

<script>
export default {
  props: {
    title: String,
    subtitle: String
  }
}
</script>
