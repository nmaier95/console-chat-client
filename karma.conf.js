// Karma configuration
// Generated on Sat Apr 11 2020 22:49:40 GMT+0200 (GMT+02:00)

const withTextCoverage =
	process.argv[process.argv.indexOf('--reportmode') + 1] === 'text'
		? true
		: false;


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
            '__tests__/**/*.ts',
        ],


        // list of files / patterns to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['karma-typescript'],
            '__tests__/**/*.ts': ['karma-typescript']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'karma-typescript',],


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
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        client: {
            captureConsole: false,
        },

        coverageReporter: {
            type: withTextCoverage ? 'text': 'lcov', // 'lcov' for ci system and then deployed to codecov.io, 'text' for local coverage table inside of terminal
            dir: 'coverage',
            subdir: function(browser) {
                // normalization process to keep a consistent browser name across different
                // OS
                return browser.toLowerCase().split(/[ /-]/)[0];
            },
            check: {
                global: {
                    statements: 87.72,
                    branches: 87.32,
                    functions: 76.92,
                    lines: 87.69,
                    excludes: [
                        // '__tests__/config/**/*.ts'
                    ]
                },
                each: { // on-file basis
                    statements: 93.62,
                    branches: 88.24,
                    functions: 90.91,
                    lines: 94.87,
                    excludes: [
                        'src/states/sockets/*.ts',
                        'src/services/SocketService.ts'
                    ],
                    overrides: {
                        // 'baz/component/**/*.js': {
                        //     statements: 98
                        // }
                    }
                }
            },
        },

        karmaTypescriptConfig: {
            coverageOptions: {
                exclude: [/(\__tests__\/.*|\.d)\.ts/i]
            }
        },
    })
}
