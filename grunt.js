config.init({
    pkg: "<json:package.json>",
    meta: {
        banner:                         "/*! <%= pkg.name %> version <%= pkg.version %>" +
                                        " * Copyright (c) 2010, <%= template.today('yyyy') %> <%= pkg.author.name %>" +
                                        " * <%= pkg.name %> is licensed under the terms of <%= _.pluck(pkg.licenses, 'type').join(', '') %>" +
                                        " */"
    },
    concat: {
        "dist/w3c/oauth.js":            ["<banner>", "<file_strip_banner:src/OAuth/Request/*.js>"],
        "dist/titanium/oauth.js":       ["<banner>", "<file_strip_banner:src/OAuth/Request/*.js>"]
    },
    min: {
        "dist/w3c/oauth.min.js":        ["<banner>", "dist/w3c/oauth.js"],
        "dist/titanium/oauth.min.js":   ["<banner>", "dist/titanium/oauth.js"]
    },
    test: {
        w3c:                            ["spec/**/*.js"],
        titanium:                       ["spec/**/*.js"],
        commonjs:                       ["spec/suites/UrlSpec.js", "spec/suites/CryptographySpec.js", "spec/suites/OAuthRequestSpec.js"]
    },
    lint: {
        all:                            ["grunt.js", "src/**/*.js", "spec/**/*.js"],
        commonjs:                       ["grunt.js", "src/OAuth/Request/**/*.js", "<config:test.commonjs>"]
    },
    watch: {
        files:                          "<config:lint.commonjs>",
        tasks:                          "lint:commonjs test:commonjs"
    },
    jshint: {
        options: {
            curly:                      true,
            eqeqeq:                     true,
            immed:                      true,
            latedef:                    true,
            newcap:                     true,
            noarg:                      true,
            sub:                        true,
            undef:                      true,
            boss:                       true,
            eqnull:                     true,
            browser:                    true,
            es5:                        true
        },
        globals: {
            require:                    true,
            module:                     true,
            exports:                    true,
            task:                       true,
            config:                     true
        }
    },
    uglify: {}
});

task.registerTask("default",            "lint test concat min");

task.registerTask("w3c",                "lint test:w3c concat:dist/w3c/oauth.js min:dist/w3c/oauth.min.js");
task.registerTask("titanium",           "lint test:titanium concat:dist/titanium/oauth.js min:dist/titanium/oauth.min.js");
task.registerTask("commonjs",           "lint:commonjs test:commonjs");