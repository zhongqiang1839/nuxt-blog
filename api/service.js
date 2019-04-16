import api from './request';
import config from '~/utils/config';

class service {
  getArticle (data) {
    return api.get(`${config.serverIp}/api/article`, data).then(res => res.data);
  }
  //发布文章
	postArticle (data) {
    return api.post(`${config.serverIp}/api/article/add`, data).then(res => res.data)
  }
  //点赞文章
	getLikeArticle (data) {
    return api.get(`${config.serverIp}/api/article/like/${data._id}`).then(res => res.data)
  }
  //获取整个tags
	getTags() {
    return api.get(`${config.serverIp}/api/tags`).then(res => res.data);
  }
  //获取单个文章
	getArt (data) {
    return api.get(`${config.serverIp}/api/article/${data.id}`).then(res => res.data)
  }
  //获取评论列表
	getComment(params) {
    return api.get(`${config.serverIp}/api/comments`, params).then(res => res.data)
  }
  //提交评价
	postComment (data) {
    return api.post(`${config.serverIp}/api/comments/add`, data).then(res => res.data)
  }
  //点赞评论
	likeComment (data) {
    return api.post(`${config.serverIp}/api/like`, data).then(res => res.data)
  }
}

export default new service()
