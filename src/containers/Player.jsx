import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getVideoSource} from "../actions";
import '../assets/styles/components/Player.scss'
import NotFound from "./NotFound";


function Player(props) {
    const {id} = useParams();
    const navigate = useNavigate();

    // const hasPlaying = Object.keys(props.playing) > 0;

    const  hasPlaying = async () => {
        try {
            return Object.keys(props.playing).length > 0
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        props.getVideoSource(id)
    }, []);


    return hasPlaying ? (
        <div className='Player'>
            <video controls autoPlay>
                <source src={ props.playing.source } type="video/mp4"/>
            </video>
            <div className="Player-back">
                <button type="button" onClick={() => navigate(-1)}>Regresar</button>
            </div>
        </div>
    ) : <NotFound />;
}

const mapStateToProps = state => {
    return {
        playing: state.playing
    }
}

const mapDispatchToProps = {
    getVideoSource,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)