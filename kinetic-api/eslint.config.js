import js from "@eslint/js";
import globals from "globals";
import configPrettier from "eslint-config-prettier";

export default [

    {
        ignores: ["node_modules/", "uploads/", "logs/", "database/"]
    },


    js.configs.recommended,

    configPrettier,

    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        rules: {

            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],


            "no-console": "off",
        },
    },
];