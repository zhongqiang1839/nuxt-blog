module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'server',
            max_memory_restart: "1024M",
            script: 'server/index.js',
            ignore_watch: [
                "node_modules",
            ],
            watch_options: {
                "usePolling": true
            },
            instances  : 4,
            exec_mode  : "cluster",
            env: {
                COMMON_VARIABLE: 'true',
                NODE_ENV: 'production'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            out_file: '/usr/fengzhongqiang/logs/nuxt-blog/pm2-out.log',
            error_file: '/usr/fengzhongqiang/logs/nuxt-blog/pm2-error.log'
        }
    ],
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy : {
        // 项目信息1
        // 下面的配置是我用什么用户登录哪个服务器，从哪拉代码，项目存到什么位置。拉完执行的脚本是啥
        production : {
            user : 'root',
            // 写成数组，可以同时部署到多台服务器
            host : '119.27.163.168',
            ref  : 'origin/master',
            "ssh_options": "StrictHostKeyChecking=no",
            repo : 'https://gitee.com/zhongqiang1839/nuxt-blog.git',
            path : '/usr/fengzhongqiang/nuxt-blog',
            "post-deploy" : 'git pull && npm install &&  npm run build  && pm2 startOrRestart ecosystem.config.js --env production'
        }
    }

};
