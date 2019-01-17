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
                NODE_ENV: "production",
                ENVIRONMENT: "beta"
            }
        }
    ]

};
