import React, {Component} from 'react';
import YTSearch from 'youtube-api-search';

import Search from './Search';

const API_KEY = 'AIzaSyBc_dM0_1hEm6VQz9DS8lBeTHpLZ_AhnCY';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            videos: [],
            selectedVideo: null
        };
    }

    handleGetVideos(searchTerm, event) {
        event.preventDefault();
        YTSearch({key: API_KEY, term: searchTerm}, (data) => {
            this.setState({videos: data});
            const video = data[0];
            const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

            this.handleSelectVideo(videoUrl);
        })
    }

    handleSelectVideo(videoUrl) {
        this.setState({selectedVideo: videoUrl})
    }

    handleInputChange(key, event) {
        this.setState({[key]: event.target.value});
    }

    render() {
        const { searchTerm, videos, selectedVideo } = this.state;

        return (
            <div className="App p3">
                <h1>Youtube app</h1>

                <Search
                    onInptChange = {this.handleInputChange.bind(this, 'searchTerm')}
                    onBtnClick   = {this.handleGetVideos.bind(this, searchTerm)}
                    value        = {searchTerm}
                />

                <div className="clearfix">
                    {selectedVideo ? (<div className="col col-8 py2">
                        <iframe
                            width="560"
                            height="315"
                            src={selectedVideo}
                            frameBorder="0"
                            allowFullScreen></iframe>
                    </div>) : null}
                    <div className="col col-4">
                        {videos.map((video, index) => {
                            const videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;

                            return (
                                <div onClick={this.handleSelectVideo.bind(this, videoUrl)} key={index}>
                                    <h3>{video.snippet.title}</h3>
                                    <img src={video.snippet.thumbnails.medium.url}
                                         alt={video.snippet.title}
                                         width="250"
                                         height="180"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
