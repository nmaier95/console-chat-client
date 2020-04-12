// Karma configuration
// Generated on Sat Apr 11 2020 22:49:40 GMT+0200 (GMT+02:00)

module.exports = (config) => {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],


        // list of files / patterns to load in the browser
        files: [
            'src/**/*.ts',
            '__tests__/**/*.spec.ts',
        ],


        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['karma-typescript',],
            '__tests__/**/*.spec.ts': 'karma-typescript'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'karma-typescript',],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        client: {
            captureConsole: false,
        },

        coverageReporter: {
            type: 'text', // 'lcov' for ci system and then deployed to codecov.io
            check: {
                global: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [
                        // 'foo/bar/**/*.js'
                    ]
                },
                each: { // on-file basis
                    // statements: 50,
                    // branches: 50,
                    // functions: 50,
                    // lines: 50,
                    // excludes: [
                    // ],
                    // overrides: {
                        // 'baz/component/**/*.js': {
                        //     statements: 98
                        // }
                    // }
                }
            },
        },
    })
}
