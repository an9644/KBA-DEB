import { useState } from "react";

const Card=({customClasses})=>{
    const [likes,setLikes]=useState(0);
    const [titlecolor,setTileColor]=useState('text-purple');

    const toogleTitleColor=()=>{
        setTileColor((prevColor)=>
            prevColor === 'text-purple'?'text-blue-500':'text-purple'
    )
};
        return(
            <div className={`max-w-sm rounded overflow-hidden shadow-lg p-6  bg-white ${customClasses}`}>
                <h2 className={`font-bold text-xl mb-2 ${titlecolor}`}>
                    Card Title
                </h2>
                <p className="text-gray-700 text-base">This is some example text in the card</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"  onClick={()=>setLikes(likes+1)}>
                    Likes: {likes}
                </button>
                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hovrer:bg-green-700" onClick={toogleTitleColor}>
                    Toogle titel color
                </button>
            </div>
        )
}

export default Card;