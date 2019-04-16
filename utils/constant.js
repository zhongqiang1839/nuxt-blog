export const ARTICLE_SOURCE = [
    {
        label: '原创',
        value: 0,
        code: 'original',
        isActive: true
    },
    {
        label: '转载',
        value: 1,
        code: 'reprint',
        isActive: false
    },
    {
        label: '混撰',
        value: 2,
        code: 'hybrid',
        isActive: false
    },
    {
        label: '翻译',
        value: 3,
        code: 'translate',
        isActive: false
    },
]


export const FN_CATEGORYS = [
    {
        label: '前端技术',
        value: 0,
        code: 'icon-qianduan',
        isActive: true
    },
    {
        label: '后端技术',
        value: 1,
        code: 'icon-fuwuqi',
        isActive: false
    },
    {
        label: '情感文字',
        value: 2,
        code: 'icon-shenghuo',
        isActive: false
    },
    {
        label: '人在路上',
        value: 3,
        code: 'icon-travel',
        isActive: false
    },
]



export const FN_MESSAGE = {
    "mouseover": [{
        "selector": ".post-body img",
        "text": ["文章特色配图好看嘛？"]
    }, {
        "selector": ".fe-sidebar__gitee",
        "text": ["我命令你给主人个star，哦不是...求求你了~~"]
    }, {
        "selector": "fancybox.image img",
        "text": ["点击图片可以放大了噢~~"]
    }, {
        "selector": ".fe-sidebar__index",
        "text": ["要返回主页嘛？"]
    }, {
        "selector": ".fe-sidebar__about",
        "text": ["想要了解更多关于主人，那就再深入点吧~~"]
    }, {
        "selector": ".fe-sidebar__item-list",
        "text": ["无敌换色 赤橙黄绿青蓝紫 来玩玩~~"]
    }, {
        "selector": ".meta-footer__chat-item",
        "text": ["主人的社交ID，不关注下嘛？"]
    }, {
        "selector": ".reward-content",
        "text": ["客官大人，是要准备给主人打赏吗？谢谢啦~~"]
    }, {
        "selector": ".back-to-top",
        "text": ["回到顶部去吧~~"]
    }, {
        "selector": "#post-box input[name=name]",
        "text": ["敢问客官尊姓大名~~"]
    }, {
        "selector": "#post-box input[name=email]",
        "text": ["留下你的邮箱呗~这样我才能提醒到你呢~"]
    }, {
        "selector": "#post-box input[name=url]",
        "text": ["客官的博客在哪儿呢？我要去看看。"]
    }, {
        "selector": "#post-box .markdown-editor",
        "text": ["嘛，东西可以乱吃，话可不能乱说噢~~"]
    }, {
        "selector": ".reference .like",
        "text": ["客官要给个大大的喜欢吗 小的感激不尽..."]
    }, {
        "selector": "#post-box .submit",
        "text": ["写好了就回复吧！我会第一时间通知主人的~~"]
    }, {
        "selector": ".ihoey-links-item",
        "text": ["这是主人的好伙伴噢~~"]
    }, {
        "selector": ".post-nav .post-nav-next",
        "text": ["点击看上一篇文章~~"]
    }, {
        "selector": ".post-nav .post-nav-prev",
        "text": ["点击看下一篇文章~~"]
    }],
    "click": [{
        "selector": ".reference .like",
        "text": ["客官点一次就可以了...", "客官要是还没过瘾的话..！", "先刷新页面再点！"]
    }]
};

