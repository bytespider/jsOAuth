config.init({
    pkg: "<json:package.json>",
    meta: {
        banner: "/*! <%= pkg.name %> version <%= pkg.version %>" +
                " * Copyright (c) 2010, <%= template.today('yyyy') %> <%= pkg.author.name %>" +
                " * <%= pkg.name %> is licensed under the terms of <%= _.pluck(pkg.licenses, 'type').join(', ') %>" +
                " */"
    },
    concat: {
        "dist/oauth.js": ["<banner>", "<file_strip_banner:src/OAuth/Request/*.js>"]
    },
    min: {
        "dist/oauth.min.js": ["<banner>", "dist/oauth.js"]
    },
    test: {
        files: ['spec/**/*.js']
    },
    lint: {
        files: ["grunt.js", "src/**/*.js", "spec/**/*.js"]
    },
    watch: {
        files: "<config:lint.files>",
        tasks: 'lint test'
    },
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            eqnull: true,
            browser: true
        }
    },
    uglify: {},
    commonjs: {
        files: "<config:lint.files>",
        jshint: {
            globals: {
                exports: true,
                module: true
            }
        }
    }
});

task.registerTask('default', 'lint test concat min');
task.registerTask('commonjs', "Build commonjs module", function (prop) {
    var options = config('jshint.options', 'commonjs.jshint.options');
    var globals = config('jshint.globals', 'commonjs.jshint.globals');

    // Display flags and globals.
    verbose.writeflags(options, 'Options');
    verbose.writeflags(globals, 'Globals');

    console.log(options, globals);
});