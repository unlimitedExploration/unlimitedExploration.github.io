const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Some Notes",
  description: "Everything's gonna be all right.",

  dest: ".vuepress/dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    }
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "",
    author: "liuzh",

    locales: {
      "/": {
        nav: [
          { text: "主页", link: "/", icon: "home" },
          /* { text: "项目主页", link: "/home/", icon: "home" }, */
          {
            text: "JAVA",
            icon: "java",
            link: "/java/",
          },
          {
            text: "前端",
            icon: "html",
            link: "/front-end/",
          },
          {
            text: "其他",
            icon: "others",
            link: "/others/",
          },
        ],
        sidebar: {
          "/java/": [
            {
              title: "JAVA",
              icon: "java",
              children: [
                {
                  title: "springboot",
                  prefix: "springboot/",
                  children: ["springboot-https","jeecgboot","log","maven-jar"]
                },
                "grails-file",
              ],
            },
          ],
          "/front-end/": [
            {
              title: "前端",
              icon: "html",
              children: [
                {
                  title: "uniapp",
                  prefix: "uniapp/",
                  children: ["uniapp"]
                },
                "nexttick",
                "echarts-tooltip",
                "vcharts-extend"
              ],
            }
          ],
          "/others/": [
            {
              title: "其他",
              icon: "others",
              children: [
                "virtualbox"
              ],
            }
          ]
        },
      },
      /* "/en/": {
        nav: [
          { text: "Blog Home", link: "/en/", icon: "home" },
          { text: "Project Home", link: "/en/home/", icon: "home" },
          {
            text: "Guide",
            icon: "creative",
            link: "/en/guide/",
          },
          {
            text: "Docs",
            link: "https://vuepress-theme-hope.github.io/",
            icon: "note",
          },
        ],

        sidebar: {
          "/en/": [
            "",
            "home",
            "slides",
            "layout",
            {
              title: "Guide",
              icon: "creative",
              prefix: "guide/",
              children: ["", "page", "markdown", "disable", "encrypt"],
            },
          ],
        },
      }, */
    },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      avatar: "/avatar.png",
      /* links: {
        Zhihu: "https://zhihu.com",
        Baidu: "https://baidu.com",
        Github: "https://github.com",
      }, */
    },

    footer: {
      display: false,
      content: "默认页脚",
    },

    comment: {
      type: "",
      serverURL: "",
    },

    copyright: {
      status: "",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },
    
    pwa: false,
    /* pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }, */
  },
});
