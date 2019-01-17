import api from './request';
import config from './../utils/config'

class service {

  getArticle(data) {
    return api.get(config.serverIp + '/api/articles', data).then((res) => { return  res.data});
  }
  // 提交评价
  postArticle (data) {
    return api.post(config.serverIp + '/api/addArticle', data).then(res => res.data)
  }
  getTags() {
    return api.get(config.serverIp + '/api/tags').then((res) => { return  res.data});
  }
  // 获取单个文章
  getArt (data) {
    return api.get(config.serverIp + `/api/article/${data.id}`).then((res) => { return  res.data})
  }
  getComment(params) {
    return api.get(config.serverIp + `/api/comments`, params).then((res) => { return  res.data})
  }
  // 提交评价
  postComment (data) {
    return api.post(config.serverIp + '/api/addcomments', data).then(res => res.data)
  }
  // 顶评论
  likeComment (data) {
    return api.post(config.serverIp + '/api/like', data).then(res => res.data)
  }
}

export default new service()
