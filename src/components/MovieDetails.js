import React, {Component} from 'react';
import "../styles/MovieDetails.css";
import Spinner from 'react-spinner-material';

class MovieDetails extends Component {

    state = {
        title: "",
        characterNames: [],
        loading: true
    };

    details;
    namesList = [];

    moviePosters = [
        "https://i0.wp.com/themediabyte.com/wp-content/uploads/2019/05/vstar-was-a-new-hope-albert-hall-2.jpg?resize=1000%2C500&ssl=1",
        "https://static1.srcdn.com/wp-content/uploads/2017/12/Star-Wars-Jedi-fight.jpg",
        "https://clashingsabers.files.wordpress.com/2019/05/anakin-qgj.jpg?w=1000",
        "https://aleteiaen.files.wordpress.com/2016/01/hero-darth-vader-lucas-arts-promo.jpg?quality=100&strip=all&w=1200",
        "https://vignette.wikia.nocookie.net/26a1a0d3-0b80-4b31-822b-aea09179fee6/scale-to-width-down/1000",
        "http://www.channelstarwars.com/wp-content/uploads/2017/04/DARTHVADER_Eng-1000x500-2.jpg",
        "https://image.dynamixse.com/s/crop/1200x500/https://static.whereyat.com/whereyatcom_598173146.jpg"
    ];

    // characterDetails;

    componentDidMount() {
        this.getMovieDetails();
    }

    async getMovieDetails() {
        await fetch(this.props.movieSelected)
            .then(async res => {
                this.details = await res.json();
                console.log(this.details)
            });

        this.fetAllCharacters();
    }

    async fetAllCharacters() {
        await Promise.all(
            this.details.characters.map(async link => {
                await fetch(link)
                    .then(async res => {
                        let characterDetails = await res.json();
                        this.namesList = [...this.namesList, characterDetails.name]
                    });
                return link
            })
        );

        this.setState({
            title: this.details.title,
            characterNames: this.namesList,
            loading: false
        });

    }


    closeDetails() {
        document.getElementById("movie-details-wrapper").style.animation = "close .5s ease forwards";
        document.getElementById("bottom").style.animation = "open .5s ease forwards";
        document.getElementById("top").style.animation = "open .5s ease forwards";
        this.props.closeDetails();
    }

    render() {
        return (
            <div className="movie-details-wrapper" id="movie-details-wrapper">
                {
                    (this.state.loading ?
                            <div className="spinner">
                                <Spinner size={220} spinnerColor={"#e9c2e9"} spinnerWidth={4} visible={true}/>
                            </div>
                            :
                            <div className="test">
                                <div className="poster"
                                     style={{backgroundImage: `url(${this.moviePosters[this.props.index]})`}}>
                                    <button className="close-button" onClick={() => {
                                        this.closeDetails()
                                    }}>X
                                    </button>
                                </div>
                                <div className="details-title">
                                    {this.state.title}
                                </div>
                                <div className="characters">
                                    <h1>Characters</h1>
                                    <ul className="names-list">
                                        {this.state.characterNames.map((name, index) => {
                                            return (
                                                <li key={index}>
                                                    <img
                                                        src="https://screenshotlayer.com/images/assets/placeholder.png"
                                                        alt="profile"/>
                                                    <div>{name}</div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                    )
                }
            </div>
        )
    }
}

export default MovieDetails;

/*
http://www.honcho-sfx.com/blog/wp-content/uploads/2015/11/Luke-Skywalker-300x300.jpg
* */