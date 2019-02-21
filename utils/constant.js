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
        code: 'skills',
        isActive: true
    },
    {
        label: '后端技术',
        value: 1,
        code: 'skills',
        isActive: false
    },
    {
        label: '生活情感',
        value: 2,
        code: 'life',
        isActive: false
    },
    {
        label: '人在路上',
        value: 3,
        code: 'tour',
        isActive: false
    },
]



export const FN_MESSAGE = {
    "mouseover": [{
        "selector": ".posts-expand .post-title a, #menu li a",
        "text": ["要看看 <span style=\"color:#f6f;\">{text}</span> 么？"]
    }, {
        "selector": ".post-body img",
        "text": ["文章特色配图好看嘛？"]
    }, {
        "selector": ".post-body .post-button .btn",
        "text": ["想要了解更多，那就再深入点吧~~"]
    }, {
        "selector": "fancybox.image img",
        "text": ["点击图片可以放大了噢~~"]
    }, {
        "selector": ".custom-logo-site-title",
        "text": ["<span style=\"color:red;\">要返回主页嘛？</span>"]
    }, {
        "selector": ".lower #show-nav",
        "text": ["<span style=\"color:red;\">那是菜单按钮噢~~</span>"]
    }, {
        "selector": ".site-author-image",
        "text": ["<span style=\"color:red;\">那不要乱玩噢~~</span>"]
    }, {
        "selector": ".motion-element",
        "text": ["<span style=\"color:red;\">主人的社交ID，不关注下嘛？</span>"]
    }, {
        "selector": ".reward-content",
        "text": ["客官大人，是要准备给主人打赏吗？谢谢啦~~"]
    }, {
        "selector": "#comments .info",
        "text": ["想要吐槽些什么吗？"]
    }, {
        "selector": ".back-to-top",
        "text": ["回到顶部去吧~~"]
    }, {
        "selector": ".vheader input[name=nick]",
        "text": ["敢问客官尊姓大名~~"]
    }, {
        "selector": ".vheader input[name=mail]",
        "text": ["留下你的邮箱呗~这样我才能提醒到你呢~"]
    }, {
        "selector": ".vheader input[name=link]",
        "text": ["客官的博客在哪儿呢？我要去看看。"]
    }, {
        "selector": "#comments .veditor",
        "text": ["嘛，东西可以乱吃，话可不能乱说噢~~"]
    }, {
        "selector": ".smilies-logo",
        "text": ["客官要挑选一个滑稽的表情吗？"]
    }, {
        "selector": ".vsubmit",
        "text": ["写好了就发送吧！我会第一时间通知主人的~~"]
    }, {
        "selector": ".ihoey-links-item",
        "text": ["这是主人的好伙伴噢~~"]
    }, {
        "selector": ".post-nav .post-nav-next",
        "text": ["点击看上一篇文章~~"]
    }, {
        "selector": ".post-nav .post-nav-prev",
        "text": ["点击看下一篇文章~~"]
    }, {
        "selector": ".eevee",
        "text": ["干嘛呢你，快把手拿开~~", "鼠…鼠标放错地方了！"]
    }],
    "click": [{
        "selector": ".eevee",
        "text": ["不要动手动脚的！快把手拿开~~", "真…真的是不知羞耻！", "Hentai！", "再摸的话我可要报警了！⌇●﹏●⌇", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"]
    }]
};

