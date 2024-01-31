module.exports = {
    apps: [
        {
            name: 'Sunset-Server',
            script: './server.js',
            env: {
                NODE_ENV: 'production',
                port : 1001,
            },
        },
    ], 
};