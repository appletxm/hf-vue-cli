import axios from 'axios'
import apiUrls from 'common/api-urls'

export default {
  getAnnouncement() {
    return axios.get(apiUrls.getAnnouncement)
  }
}
