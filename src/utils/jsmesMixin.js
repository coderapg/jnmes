/**
 * 公共混入方法
 */
export const JnmesMixin = {
  data () {
    return {
      toggleSearchStatus: false
    }
  },
  methods: {
    handleToggleSearch () {
      console.log('切换')
      this.toggleSearchStatus = !this.toggleSearchStatus
    }
  }
}
