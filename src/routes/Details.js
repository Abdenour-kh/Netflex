import axios from "axios";
import React, { Component } from "react";
import { Spinner, HeaderDetails, ActorList } from "../Components";
import { API_URL, API_KEY } from "../config";

class Details extends Component {
  state = {
    loading: true,
    actors: [],
    mTitle: "",
    mDesc: "",
    imgSrc: "",
    revenue: "",
    runtime: "",
    status: "",
    vote: "",
  };

  async componentDidMount() {
    try {
      const movieId = this.props.match.params.id;
      const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
      const {
        data: {
          revenue,
          runtime,
          title,
          overview,
          status,
          vote_average,
          poster_path,
        },
      } = await this.loadInfos(url);
      this.setState(
        {
          revenue,
          runtime,
          mTitle: title,
          mDesc: overview,
          status,
          imgSrc: poster_path,
          vote: vote_average,
        },
        async () => {
          const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`;
          const {
            data: { cast },
          } = await this.loadInfos(url);
          this.setState({
            actors: [...cast],
            loading: false,
          });
        }
      );
    } catch (e) {
      console.log("e", e);
    }
  }

  loadInfos = (url) => axios.get(url);

  render() {
    const {
      loading,
      mTitle,
      mDesc,
      actors,
      imgSrc,
      revenue,
      runtime,
      status,
      vote,
    } = this.state;
    return (
      <div className="app">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <HeaderDetails
              mTitle={mTitle}
              mDesc={mDesc}
              imgSrc={imgSrc}
              runtime={runtime}
              revenue={revenue}
              status={status}
              vote={vote}
            />

            <ActorList actors={actors} />
          </>
        )}
      </div>
    );
  }
}

export { Details };
