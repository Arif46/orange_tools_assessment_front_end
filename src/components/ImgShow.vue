<template>
  <div>
    <span v-html="image"></span>
  </div>
</template>
<script>
import RestApi from '@/config/api_config'
export default {
  props: ['img', 'imageUrl'],
  data () {
    return {
      image: ''
    }
  },
  created () {
    this.imageShow()
  },
  methods: {
    imageShow () {
      RestApi.getData(this.imageUrl, 'show-attachment?file=' + this.img).then(response => {
        if (response.success) {
          this.image = response.data
        }
      }, error => {
        if (error) {
          //
        }
      })
    }
  }
}
</script>
