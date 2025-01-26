import Movie from "../assets/components/Movie";

function Home() {
    const movies = [
     {id:1, title:"John-Wich", release_date:"2020"},
     {id:2, title:"John-Wh", release_date:"2022"},
     {id:3, title:"John-Wic", release_date:"2023"},
     {id:4, title:"John-Wi", release_date:"2024"},
    ];
    return ( 
    <div className ="home">
        <div className="moviesgrid">
            {movies.map((movie)=> (
                <Movie movie={movie} key= {movies.id} />
             ))}
        </div>
    </div>

    );
}
export default Home