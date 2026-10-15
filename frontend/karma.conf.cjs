// Configuración de Karma para correr las pruebas con Jasmine.
// Usa webpack + babel para poder leer archivos .jsx (React).
const fs = require("fs");

const rutasChrome = [
  process.env.CHROME_BIN,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
process.env.CHROME_BIN = rutasChrome.find((ruta) => ruta && fs.existsSync(ruta));

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],

    files: [
      { pattern: "src/tests/**/*.spec.jsx", watched: false },
      { pattern: "public/img/**/*", included: false, served: true, watched: false },
    ],
    proxies: { "/img/": "/base/public/img/" },

    preprocessors: {
      "src/tests/**/*.spec.jsx": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                // Mide la cobertura del codigo de src (menos las pruebas)
                plugins: [["istanbul", { exclude: ["src/tests/**", "**/*.spec.jsx"] }]],
              },
            },
          },
          // El proyecto es "type: module"; esto permite importar sin escribir la extensión
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
      },
      resolve: { extensions: [".js", ".jsx"] },
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
        { type: "json-summary", subdir: ".", file: "resumen.json" },
      ],
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },

    singleRun: true,
    restartOnFileChange: false,
  });
};
