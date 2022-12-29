const Theme = {
    boardSquareStyling: {
        width: `w-[39.5px]`,
        height: `h-[39.5px]`,
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        float: `float-left`,
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
        height: `h-[100px]`,
        width: `w-[200px]`,
        minHeight: `min-h-[100px]`,
        minWidth: `min-w-[100px]`,
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        marginTop: `mt-[100px]`,
    },
};

export { Theme };
