import React from "react";
import PropTypes from "prop-types";
import { Image, Row, Col } from "react-bootstrap";
import { stripAndTruncateHtml, formatDate } from "./Utils";

const EpisodeSummary = ({ episode }) => {
  return (
    <div>
      {
        <Row>
          <Col>
            {episode.image ? (
              <Image
                className="float-left"
                fluid
                src={episode.image?.original}
                rounded
                style={{ height: "197px", width: "350px", marginRight: "15px" }}
              ></Image>
            ) : (
              <div
                className="float-left"
                style={{
                  height: "197px",
                  width: "350px",
                  backgroundColor: "#252b27",
                  textAlign: "center",
                  padding: "50px",
                  color: "white",
                  fontSize: "50px",
                  marginRight: "15px",
                }}
              >
                <span>NA</span>
              </div>
            )}
            <h2>{episode.name}</h2>
            <h6 style={{ color: "gray" }}>{`Season ${
              episode.season
            } | Episode ${episode.number} ${
              episode.airdate
                ? " | " + formatDate(new Date(episode.airdate))
                : ""
            }`}</h6>
            {stripAndTruncateHtml(episode?.summary, 250)}
          </Col>
        </Row>
      }
    </div>
  );
};

const propTypes = {
  episode: PropTypes.shape({
    image: PropTypes.shape({
      original: PropTypes.string,
    }),
    name: PropTypes.string,
    season: PropTypes.number,
    airdate: PropTypes.string,
    summary: PropTypes.string,
    number: PropTypes.number,
  }),
};

EpisodeSummary.propTypes = propTypes;

export default EpisodeSummary;
