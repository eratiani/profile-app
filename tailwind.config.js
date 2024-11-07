/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "aot",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
    options: {
      safelist: ["text-primary-error", "bg-header-gradient"],
    },
  },
  theme: {
    extend: {
      colors: {
        "primary-green": "#1DBF73",
        "primary-blue": "#0284c7",
        "btn-disabled": "#A7A7A7",
      },
      
      
    },
  },
  plugins: [],
}

