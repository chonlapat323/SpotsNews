module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // สร้างชุดสีใหม่โดยอ้างอิงจาก CSS Variable
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
      },
      textColor: {
        // สร้างชุดสีตัวอักษรใหม่
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
    },
  },
  plugins: [],
};
