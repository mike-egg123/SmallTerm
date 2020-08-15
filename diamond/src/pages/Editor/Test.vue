<template>
    
</template>

<script>
  export default {
    data() {
      return {
        list: []  // 获取的数据列表
      }
    },
    created() {
      //this.getData()
    },
    methods: {     
      myfun() {
          alert("One fetch")
      }
    },
    mounted () {
        if (this.timer) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(() => {
                this.myfun();
            }, 1000);
        }
    },
    destroyed() {
        clearInterval(this.timer)
    }
  }
</script>

<style scoped>

</style>