const Theme = {
    colors: {
        neutralSquare: 'sky-500',
    },

    boardSquareStyling: {
        width: `w-[59.5px]`,
        height: `h-[59.5px]`,
        borderColor: `border-zinc-600`,
        borderThickness: `border-2`,
        float: `float-left`,
    },

    boardSquareBG: {
        valid: `bg-lime-500`,
        invalid: `bg-rose-400`,
        adjacent: `bg-zinc-500`,
        attackMiss: `bg-sky-500`,
        attackHit: `bg-rose-600`,
    },

    boardStyling: {
        height: `h-[600px]`,
        width: `w-[600px]`,
        minHeight: `min-h-[600px]`,
        minWidth: `min-w-[600px]`,
        marginLeft: `ml-px`,
        marginTop: `mt-px`,
        borderColor: `border-sky-500`,
        borderThickness: `border-2`,
    },
};

export { Theme };

/*
   valid: `bg-lime-500`,
        invalid: `bg-rose-400`,
        adjacent: `bg-zinc-500`,
        attackMiss: `bg-sky-500`,
        attackHit: `bg-rose-600`,
*/
