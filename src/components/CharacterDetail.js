import React, {Component} from 'react';
import "../styles/CharacterDetail.css";

class CharacterDetail extends Component {

    state = {
        charaterDetails: []
    };

    currentOpenedDetail = "";
    currentPanelShifted = "";
    currentViewDetails = "";

    open = {
        height: "fit-content",
        visibility: "visible",
        opacity: 1
    };

    componentDidMount() {
        this.fetchCharacterDetails();
    }

    async fetchCharacterDetails() {
        let id = "";

        Promise.all(
            this.props.charactersURL.map(async url => {
                id = url.replace(/[^0-9]/g, '');

                await fetch("https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/id/" + id + ".json")
                    .then(async res => {
                        let details = await res.json();

                        this.setState({
                            charaterDetails: [...this.state.charaterDetails, details]
                        });
                        return details
                    });
                return url
            })
        );
    }

    //------FIX THIS MESS!!!
    async showCharacterDetails(index) {
        let charDetail = document.getElementById("character-detail-" + index);
        let listItem = document.getElementById("list-item" + index);
        let viewDetails = document.getElementById("view-details" + index);
        let detailPanel = document.getElementById("detail-panel" + index);
        let shift = (detailPanel.offsetHeight + 70).toString() + "px";
        listItem.style.transition = "all .3s ease";

        if (this.currentOpenedDetail === "") {
            charDetail.style.animation = "charDetailsOpen .3s ease forwards";
            listItem.style.marginBottom = shift;
            viewDetails.innerText = "close details";

            this.currentOpenedDetail = "character-detail-" + index;
            this.currentPanelShifted = "list-item" + index;
            this.currentViewDetails = "view-details" + index;

        } else if (this.currentOpenedDetail === "character-detail-" + index) {
            charDetail.style.animation = "charDetailsOpen .3s ease forwards" ?
                "charDetailsClose .3s ease forwards" : "charDetailsOpen .3s ease forwards";
            listItem.style.marginBottom = shift ? "0" : shift;
            viewDetails.innerText = "close details" ? "view details" : "close details";

            this.currentOpenedDetail = "";
            this.currentPanelShifted = "";

        } else {
            charDetail.style.animation = "charDetailsOpen .3s ease forwards";
            listItem.style.marginBottom = shift;
            viewDetails.innerText = "close details";


            document.getElementById(this.currentOpenedDetail).style.animation = "charDetailsClose .3s ease forwards";
            document.getElementById(this.currentPanelShifted).style.marginBottom = "0";
            document.getElementById(this.currentViewDetails).innerText = "view details";

            this.currentOpenedDetail = "character-detail-" + index;
            this.currentPanelShifted = "list-item" + index;
            this.currentViewDetails = "view-details" + index;
        }
    }

    render() {
        return (
            <div className="characters-wrapper">
                <div className="characters">
                    <h1>Characters</h1>
                    <ul className="names-list">
                        {
                            this.state.charaterDetails.length === this.props.charactersURL.length &&
                            this.props.charactersURL.map((res, index) => {
                                return (
                                    <li key={index}
                                        id={"list-item" + index}>
                                        <img src={this.state.charaterDetails[index].image}
                                             alt="profile"/>
                                        <div className="name-section"
                                             onClick={() => {
                                                 this.showCharacterDetails(index)
                                             }}>
                                            <div>{this.state.charaterDetails[index].name}</div>
                                            <h5 className="view-details"
                                                id={"view-details" + index}>view detials</h5>
                                        </div>
                                        <section className={"character-detail"}
                                                 id={"character-detail-" + index}>
                                            <h1>{this.state.charaterDetails[index].name}</h1>
                                            <div className="detail-panel" id={"detail-panel" + index}>
                                                <div className="side-border">
                                                    <h3>Affiliations</h3>
                                                    <h4>{this.state.charaterDetails[index].affiliations}</h4>
                                                </div>
                                                <div className="side-border">
                                                    <h3>Species</h3>
                                                    <h4>{this.state.charaterDetails[index].species}</h4>
                                                </div>
                                                <div className="side-border">
                                                    <h3>Height</h3>
                                                    <h4>{this.state.charaterDetails[index].height}cm</h4>
                                                </div>
                                                <div className="side-border">
                                                    <h3>Gender</h3>
                                                    <h4>{this.state.charaterDetails[index].gender}</h4>
                                                </div>

                                                <div className="side-border">
                                                    <h3>Eye Color</h3>
                                                    <h4>{this.state.charaterDetails[index].eyeColor}</h4>
                                                </div>
                                                <div className="side-border">
                                                    <h3>Home World</h3>
                                                    <h4>{this.state.charaterDetails[index].homeworld}</h4>
                                                </div>
                                            </div>
                                        </section>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default CharacterDetail