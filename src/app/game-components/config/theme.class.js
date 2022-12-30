const Theme = {
    boardSquareStyling: {
        width: `w-[39.5px]`,
        height: `h-[39.5px]`,
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        float: `float-left`,
    },

    boardSquareCursor: {
        player: `cursor-pointer`,
        enemy: `cursor-cell`,
    },

    boardSquareBG: {
        ship: `bg-zinc-400`,
        valid: `bg-lime-500`,
        invalid: `bg-rose-400`,
        adjacent: `bg-zinc-500`,
        attackMiss: `bg-sky-500`,
        attackHit: `bg-rose-600`,
        enemy: `bg-violet-400`,
    },

    boardStyling: {
        height: `h-[400px]`,
        width: `w-[400px]`,
        minHeight: `min-h-[400px]`,
        minWidth: `min-w-[400px]`,
        marginLeft: `ml-px`,
        marginTop: `mt-px`,
        borderColor: `border-zinc-800`,
        borderThickness: `border-2`,
    },

    infoDiv: {
        height: `h-[200px]`,
        width: `w-[450px]`,
        minHeight: `min-h-[200px]`,
        minWidth: `min-w-[300px]`,
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        marginTop: `mt-[100px]`,
        text: `text-white`,
        flex: `flex`,
        flexCol: `flex-col`,
        justify: `justify-center`,
        align: `items-center`,
        gap: `gap-6`,
        font: `font-blockfont`,
        fontsize: `text-sm`,
    },

    playAgainButton: {
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        padding: `p-2`,
        BG: `bg-zinc-400`,
        cursor: `cursor-pointer`,
    },
};

export { Theme };
