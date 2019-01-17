/**
 * 文章
 * 标签
 */
export const state = () => {
  return {
    // 列表文章
    art: {
      pagination: {},
      list: []
    },
    comments: {
      pagination: {},
      list: []
    },
    tags: [],
    fetch: false,
    // 文章详情
    details: {}
  }
}

export const mutations = {
  FETCH_ART (state) {
  },
  SET_ART_SUCCESS (state, data) {
    let {docs, ...paginate} = data;
    state.art = {
      list: docs,
      pagination: paginate
    }
  },
  SET_COMMENTS_SUCCESS (state, data) {
    let {docs, ...paginate} = data.body;
    state.comments = {
      list: docs,
      pagination: paginate
    }
  },
  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
  },
  SET_TAG_SUCCESS (state, data) {
    state.tags = data.body;
  },
  TOOGLE_TAGS (state, data) {
    state.tags = data
  },
  SET_DETAILS (state, data) {
    state.details = data.body[0]
  },

  ADD_COMMENT (state) {
    state.details.comments += 1
  }

}
