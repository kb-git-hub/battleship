/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            fontFamily: {
                blockfont: [`'Press Start 2P'`, 'cursive'],
            },
        },
    },
    plugins: [],
};

// npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
// have to use template literals to get the font to work.
