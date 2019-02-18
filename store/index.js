import service from '../api/service';

export const actions = {

  nuxtServerInit (store, { params, route, isServer, req }) {
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
    commit('article/SET_ARTICLE_LIKE', res || {});
    return res;
  },

  // 获取文章
  async getArticleList ({ commit, state }, data) {
    const res = await service.getArticle(data).catch(err => console.error(err));
    if(res.success) {
      commit('article/SET_ART_SUCCESS', res || {})
    }
  },
  // 文章详情
  async getArtDetail ({ commit }, data) {
    const res = await service.getArt(data).catch(err => console.error(err));
    commit('article/SET_DETAILS', res || {});
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
    return res;
  },
  // 顶顶顶
  async likeComment ({ commit, state }, comment) {
    const res = await service.likeComment(comment).catch(err => console.error(err));
    commit('article/LIKE_COMMENT', res);
    return res;
  },

};
