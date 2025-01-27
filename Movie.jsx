function Movie({movie}){  
    
    function onFavoriteClick(){
        alert("CLICKED")
    }
    return(
        <div className= "moviecard">
            <div className="movieposter">
                <img src={movie.url} alt={movie.title}/>
                <div className="movieoverlay"> 
                    <button className="favorite-btn" onClick={{onFavoriteClick}}>
                     <img src="heart" alt="heart" />
                    </button>
                </div>
            </div>
            <div className="movieino">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    )
}
export default Movie
