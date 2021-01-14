import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownButton,
  Row,
  InputGroup,
  FormControl,
  Col,
  Form,
  Button,
} from "react-bootstrap";

const EpisodeSwitcherDropdownGroup = ({
  episodeList,
  handleEpisodeSwitch,
  error,
}) => {
  const [season, setSeason] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState('');
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
      if(Object.keys(episodeList).length > 0){
          setSeason(Object.keys(episodeList)[0]);
      } else{
          setSeason('NA');
      }
  }, [episodeList])

  useEffect(() => {
    setEpisodes(
      episodeList[season]?.map((episode) => {
        return episode.number;
      })
    );
  }, [season, episodeList]);

  useEffect(() => {
    if (episodes?.length > 0) {
      setEpisode(episodes[0]);
    } else {
      setEpisode("NA");
    }
  }, [episodes]);

  return (
    <>
      <Form
        inline
        onSubmit={(e) => {
          e.preventDefault();
          handleEpisodeSwitch(episode, season, searchTerm);
        }}
      >
        <Row>
          <span style={{ paddingTop: "5px" }}>Replace</span>
          <Col xs={3}>
            <InputGroup>
              <DropdownButton title="Season">
                {Object.keys(episodeList).map((season) => {
                  return (
                    <Dropdown.Item
                      key={season}
                      onClick={() => {
                        setSeason(season);
                      }}
                    >
                      Season {season}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <FormControl value={season} readOnly />
            </InputGroup>
          </Col>
          <Col xs={3}>
            <InputGroup>
              <DropdownButton title="Episode">
                {episodeList[season]?.map((episode) => {
                  return (
                    <Dropdown.Item
                      key={episode.number}
                      onClick={() => {
                        setEpisode(episode.number);
                      }}
                    >
                      Episode {episode.number}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <FormControl value={episode} readOnly />
            </InputGroup>
          </Col>
          <span style={{ paddingTop: "5px" }}> with </span>
          <Col>
            <FormControl
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Button type="submit">Replace</Button>
          </Col>
        </Row>
      </Form>
      {error ? (
        <div
          style={{
            marginTop: "15px",
            border: "solid",
            borderWidth: "1px",
            backgroundColor: "#eb94a1",
          }}
        >
          <span>{error}</span>
        </div>
      ) : null}
    </>
  );
};

const propTypes = {
  episodeList: PropTypes.object.isRequired,
  handleEpisodeSwitch: PropTypes.func.isRequired,
  error: PropTypes.string,
};

EpisodeSwitcherDropdownGroup.propTypes = propTypes;

export default EpisodeSwitcherDropdownGroup;
