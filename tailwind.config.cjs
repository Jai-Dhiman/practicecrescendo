const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["customlight", "customdark"],
    defaultTheme: "customlight",
  },
};

module.exports = config;
