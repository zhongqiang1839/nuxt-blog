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
};

export const mutations = {
  FETCH_ART (state) {
  },
  SET_ART_SUCCESS (state, { data }) {
    let {docs, ...paginate} = data;
    if(paginate.page === 1) {
        state.art = {
            list: docs,
            pagination: paginate
        }
    } else {
        state.art = {
            list: [...state.art.list, ...docs],
            pagination: paginate
        }
    }
  },
  SET_COMMENTS_LIST (state, { data }) {
      state.comments = {
        list: [data, ...state.comments.list],
        pagination: state.comments.pagination
      }
  },
  LIKE_COMMENT (state, { data }) {
      state.comments = {
        list: state.comments.list.map(item => {
            if(item._id === data._id) {
                item = data;
                item.likes += 1;
            }
            return item;
        }),
        pagination: state.comments.pagination
      }
  },
  SET_COMMENTS_SUCCESS (state, { data }) {
    let {docs, ...paginate} = data;
    state.comments = {
      list: docs,
      pagination: paginate
    }
  },
  SET_ART_FAIL (state) {
    state.art = { pagination: {}, list: [] }
  },
  SET_TAG_SUCCESS (state, { data }) {
    state.tags = data;
  },
  TOOGLE_TAGS (state, data) {
    state.tags = data
  },
  SET_DETAILS (state, { data }) {
    data.views +=1;
    state.details = data
  },
  SET_ARTICLE_LIKE(state, { data }) {
    data.likes +=1;
    state.details = data
  }
};
