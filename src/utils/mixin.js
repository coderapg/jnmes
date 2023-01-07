/**
 * 混入相关代码
 */
import { JNMES_USER_INFO, JNMES_DEPARTS } from './jsmesconst'

export const userInfoAndDepartsMixin = {
  data () {
    return {
      userInfo: {},
      departs: {}
    }
  },
  created () {
    this.getUserInfoAndDeparts()
  },
  methods: {
    getUserInfoAndDeparts () {
      this.userInfo = JSON.parse(window.localStorage.getItem(JNMES_USER_INFO))
      this.departs = JSON.parse(window.localStorage.getItem(JNMES_DEPARTS))
    }
  }
}
