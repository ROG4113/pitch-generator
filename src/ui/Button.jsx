
function Button({children, disabled, type, onClick}) {
    const base=`bg-gray-800 uppercase font-semibold 
        text-stone-100 inline-block tracking-wide rounded-full 
        hover:bg-gray-700 transition-colors duration-300 
        focus:outline-nonefocus:ring focus:ring-yellow-300 
        focus:ring-yellow-300 focus:ring-offset-2 
        disabled:cursor-not-allowed text-sm
        `;
    
    const styles={
        primary: base +' py-3 px-4 md:px-6 md:py-4',
        small:base+' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round:base+' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary:` uppercase font-semibold 
        text-stone-400 inline-block tracking-wide rounded-full 
        hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 
        focus:outline-nonefocus:ring focus:ring-stone-200 focus:ring-offset-2 focus:text-stone-800
        disabled:cursor-not-allowed border-2 text-sm
        border-stone-300 py-2.5 px-4 md:px-6 md:py-3.5`
    }
    if(onClick){
        return (
            <button disabled={disabled} onClick={onClick} className={styles[type]}>
                {children}
            </button>
        )
    }
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
