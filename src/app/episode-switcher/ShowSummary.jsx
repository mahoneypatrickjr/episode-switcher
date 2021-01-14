import React from "react";
import PropTypes from "prop-types";
import { Image, Row, Col } from "react-bootstrap";
import { stripAndTruncateHtml, formatDate } from "./Utils";

const ShowSummary = ({ show }) => {
  const getGenreAndPremiereString = () => {
    let genreString = "";
    if (show.genres.length > 0) {
      genreString = `${show.genres.join(", ")}`;
    }
    const premiereString = formatDate(new Date(show.premiered));
    return `${genreString} ${genreString !== "" ? "|" : ""} ${premiereString}`;
  };

  return (
    <div>
      {
        <Row>
          <Col>
            {show.image ? (
              <Image
                className="float-left"
                src={show.image?.original}
                rounded
                style={{
                  maxHeight: "450px",
                  maxWidth: "300px",
                  marginRight: "15px",
                }}
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
            <h2>{show.name}</h2>
            <h6 style={{ color: "gray" }}>{getGenreAndPremiereString()}</h6>
            {stripAndTruncateHtml(show?.summary)}
          </Col>
        </Row>
      }
    </div>
  );
};

const propTypes = {
  show: PropTypes.shape({
    image: PropTypes.shape({
      original: PropTypes.string,
    }),
    genres: PropTypes.arrayOf(PropTypes.string),
    summary: PropTypes.string,
    premiered: PropTypes.string,
    name: PropTypes.name,
  }),
};

ShowSummary.propTypes = propTypes;

export default ShowSummary;
