module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            crypto: false
        };
        return config;
    },
};
