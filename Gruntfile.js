"use strict";

module.exports = function(grunt) {

    // Load all grunt-* tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Define Directories
        dirs: {
            js: "src/js",
            build: "dist"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
            "\n" +
            "/*\n" +
            " * -------------------------------------------------------\n" +
            " * Project: <%= pkg.title %>\n" +
            " * Version: <%= pkg.version %>\n" +
            " *\n" +
            " * Author:  <%= pkg.author.name %>\n" +
            //" * Site:    <%= pkg.author.url %>\n" +
            " * Contact: <%= pkg.author.email %>\n" +
            " *\n" +
            " *\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> Bjorn Lammers\n" +
            " * -------------------------------------------------------\n" +
            " */\n" +
            "\n",

        jshint: {
            options: {
                curly: true,
                debug: true,
                unused: true,
                forin: true,
                eqnull: true,
                eqeqeq: true,
                browser: true,
                globals: {
                    devel: true,
                    jquery: false
                }
            },
            all: ['src/js/arrow.js'] //, '<%= dirs.build %>/<%= pkg.title %>-<%= pkg.version %>.min.js']
        },

        // Minify and Concatenate JS Files
        uglify: {
            options: {
                mangle: false,
                report: 'min',
                banner: "<%= banner %>"
            },
            dist: {
                files: {
                    "<%= dirs.build %>/<%= pkg.title %>-<%= pkg.version %>.min.js": "<%= dirs.js %>/arrow.js"
                }
            }
        },

        // Notifications
        notify: {
            js: {
                options: {
                    title: "Javascript - <%= pkg.title %>",
                    message: "Minified and validated successfully!"
                }
            }
        }
    });

    // Register Tasks
    grunt.registerTask("default", ["uglify", "notify:js"]);
    grunt.registerTask('dev', ['jshint']);
};
