import React from "react";
import PropTypes from "prop-types";
import ShowSummary from "./ShowSummary";
import EpisodeSummary from "./EpisodeSummary";
import EpisodeSwitcherDropdownGroup from "./EpisodeSwitcherDropdownGroup";
import { Container, Row } from "react-bootstrap";
import { formatDate } from "./Utils";

const EpisodeSwitcher = ({
  currentShow,
  episodeList,
  handleEpisodeSwitch,
  episodeSwitchError,
}) => {
  return (
    <Container>
      <ShowSummary show={currentShow} />
      <br />
      <EpisodeSwitcherDropdownGroup
        episodeList={episodeList}
        error={episodeSwitchError}
        handleEpisodeSwitch={handleEpisodeSwitch}
      />
      <br />
      {Object.keys(episodeList).map((season) => {
        const seasonSize = episodeList[season].length;
        return (
          <div key={season}>
            <Row>
              <h2>{`Season ${season}`}</h2>
            </Row>
            <Row>
              <h6 style={{ color: "gray" }}>{`${seasonSize} ${
                seasonSize > 0 ? "episodes" : "episode"
              } ${
                episodeList[season][0].airdate
                  ? " | Aired " +
                    formatDate(new Date(episodeList[season][0].airdate))
                  : ""
              }`}</h6>
            </Row>
            <hr />
            {episodeList[season].map((episode) => {
              return (
                <div key={episode.name}>
                  <EpisodeSummary
                    key={episode.name}
                    episode={episode}
                  ></EpisodeSummary>
                  <br />
                </div>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};

const propTypes = {
  currentShow: PropTypes.object.isRequired,
  episodeList: PropTypes.object.isRequired,
  handleEpisodeSwitch: PropTypes.func.isRequired,
  episodeSwitchError: PropTypes.string,
};

EpisodeSwitcher.propTypes = propTypes;

export default EpisodeSwitcher;
