import service from '../api/service';
import {
  text,
  typeStyle,
  typeFormat,
  sourceFormat,
  sourceStyle,
  dateFormat
} from "../filters";

export const actions = {

  nuxtServerInit (store, { params, route, isServer, req }) {
    // 设备检查类型
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent;
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent);
    store.commit('options/SET_MOBILE_LAYOUT', isMobile);
    store.commit('options/SET_USER_AGENT', userAgent);

		const initAppData = [
      store.dispatch('getTagsList'),
    ];

    return Promise.all(initAppData)
  },

  // 发表文章
  async postArticle ({ commit, state }, article) {
		return await service.postArticle(article).catch(err => console.error(err));
  },

  // 点赞文章
  async postLikeArticle ({ commit, state }, article) {
    const res = await service.getLikeArticle(article).catch(err => console.error(err));
    commit('article/SET_LIKES');
    return res;
  },

  // 获取文章
  async getArticleList ({ commit, state }, res) {
    const { data, success } = await service.getArticle(res).catch(err => console.error(err));
    if(success) {
      data.docs.map(item => {
        item.sourceName = sourceFormat(item.source);
        item.sourceClass = sourceStyle(item.source);
        item.create_at = dateFormat(item.create_at, 'yyyy.MM.dd');
        item.typeName = typeFormat(item.type);
        item.typeClass = typeStyle(item.type)
      });
      commit('article/SET_ART_SUCCESS', data || {})
    }
  },
  // 文章详情, 更新浏览量
  async getArtDetail ({ commit }, data) {
    const res = await service.getArt(data).catch(err => console.error(err));
    res.data.formatTime = dateFormat(res.data.create_at, 'yyyy.MM.dd hh:mm');
    commit('article/SET_DETAILS', res.data);
  },
  // 获取标签
  async getTagsList ({ commit, state }) {
    const res = await service.getTags().catch(err => console.error(err));
    commit('article/SET_TAG_SUCCESS', res || {})
  },
  // 根据post-id获取评论列表
  async loadCommentsByPostId ({ commit, state }, data) {
    data.sort = data.sort || -1;
    data.current_page = data.current_page || 1;
    const res = await service.getComment(data).catch(err => console.error(err));
    commit('article/SET_COMMENTS_SUCCESS', res);
    return res;
  },
  // 发表评论
  async postComment ({ commit, state }, comment) {
    const res = await service.postComment(comment).catch(err => console.error(err));
    commit('article/SET_COMMENTS_LIST', res);
    commit('article/SET_COMMENTS');
    return res;
  },
  // 顶顶顶
  async likeComment ({ commit, state }, comment) {
    const res = await service.likeComment(comment).catch(err => console.error(err));
    commit('article/LIKE_COMMENT', res);
    return res;
  },

};
