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
    // 收起 / 折叠
    handleToggleSearch () {
      this.toggleSearchStatus = !this.toggleSearchStatus
    }
  }
}
