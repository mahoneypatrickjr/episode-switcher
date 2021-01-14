import React, { useEffect, useState } from "react";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import axios from "../api/axios";
import EpisodeSwitcher from "./EpisodeSwitcher";
const EpisodeSwitcherContainer = () => {
  const [currentShow, setCurrentShow] = useState();
  const [episodeList, setEpisodeList] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [episodeSwitchError, setEpisodeSwitchError] = useState();
  const [isFetching, setIsFetching]= useState(true);

  useEffect(() => {
    function getRandomNumber(){
      // in my testing it seems 52926 is the high end cap
      // because the page loads a random number it felt more correct to
      // hard code the cap to the right number rather than guess and implement a
      // 404 which would not be obvious to an end user why nothing was found
      return Math.floor(Math.random() * (52926 - 0 + 1)) + 0;
      }
    async function fetchShow() {
      try{
        const request = await axios.get(`/shows/${getRandomNumber()}`);
        setCurrentShow(request.data);
      } catch(e){
        fetchShow();
      }
    }
    setIsFetching(true);
    fetchShow();
  }, []);

  useEffect(() => {
    async function fetchEpisodes() {
      const request = await axios.get(`/shows/${currentShow.id}/episodes`);
      const episodes = {};
      request.data.forEach((ep) => {
        const season = episodes[ep.season];
        if (!season) {
          episodes[ep.season] = [ep];
        } else {
          season.push(ep);
        }
      });
      setEpisodeList(episodes);
      setIsFetching(false);
    }
    if (currentShow !== undefined) {
      fetchEpisodes();
    }
  }, [currentShow]);

  const handleSearch = async () => {
    const request = await axios.get(`singlesearch/shows/?q=${searchTerm}`);
    setCurrentShow(request.data);
    setSearchTerm("");
    setEpisodeSwitchError(undefined);
  };

  const handleEpisodeSwitch = async (episodeNumber, seasonNumber, show) => {
    try {
      const getShowResponse = await axios.get(`singlesearch/shows/?q=${show}`);
      try {
        const getSingleEpisodeResponse = await axios.get(
          `/shows/${getShowResponse.data.id}/episodebynumber?season=${seasonNumber}&number=${episodeNumber}`
        );

        const newEpisode = getSingleEpisodeResponse.data;

        const newEpisodeList = episodeList[seasonNumber].filter((episode) => {
          return episode.number !== episodeNumber;
        });
        newEpisodeList.splice(episodeNumber - 1, 0, newEpisode);
        const fullSeasonList = { ...episodeList };
        fullSeasonList[seasonNumber] = newEpisodeList;
        setEpisodeList(fullSeasonList);
        setEpisodeSwitchError(undefined);
      } catch (e) {
        setEpisodeSwitchError(
          `There was an error retrieving the specified episode for ${show}.`
        );
        return;
      }
    } catch (e) {
      setEpisodeSwitchError(`There is no show matching ${show}.`);
      return;
    }
  };

  return !isFetching ? (
    <>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand onClick={() => window.location.reload()}>
            Episode Switcher
          </Navbar.Brand>
          <Form
            inline
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(e);
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Button type="submit">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <br /> <br />
      <Container>
        <EpisodeSwitcher
          currentShow={currentShow}
          episodeList={episodeList}
          handleEpisodeSwitch={handleEpisodeSwitch}
          episodeSwitchError={episodeSwitchError}
        />
      </Container>
    </>
  ) : (
    <></>
  );
};

export default EpisodeSwitcherContainer;
