const { api } = require('env.cfg')

export default {
  getAnnouncement: `${api}/announcement/get`,
  userLogin: `${api}/user/login`,
  getUserInfo: `${api}/user/info`
}
