import axios from "axios";
import {
  SkipForwardCircle,
  SkipBackCircle,
  Rewind,
  FastForward,
} from "phosphor-react";
import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { DataProvider } from "../../Context/DataProvider";
import "./Player.css";

const Player = () => {
  const { searchData, selectedPlay } = useContext(DataProvider);
  const [loading, setLoading] = useState(false);
  const [surahLoading, setSurahLoading] = useState(false);
  const [allSurah, setAllSurah] = useState([]);
  const [displaySurah, setDisplaySurah] = useState([]);
  const [playSurah, setPlaySurah] = useState(selectedPlay ? selectedPlay : {});
  const [ayahNo, setAyahNo] = useState(0);
  const [showAyah, setShowAyah] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ayah, setAyah] = useState("");
  const [audio, setAudio] = useState("");

  useEffect(() => {
    setSurahLoading(true);
    if (selectedPlay.name || playSurah.name) {
      if (playSurah.number === 1) {
        setAudio(playSurah.ayahs[0]?.audio);
        setAyah(playSurah.ayahs[0]?.text);
        setAyahNo(1);
        const scrollV = document.getElementById(1);
        scrollV &&
          scrollV.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setAudio(
          "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
        );
        setAyah("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
        setAyahNo(0);
        if (playSurah.number && allSurah.length) {
          const scrollV = document.getElementById(playSurah.number);
          scrollV &&
            scrollV.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      setSurahLoading(false);
    }
  }, [playSurah]);

  const getData = async () => {
    const quranData = await axios.get(
      "https://api.alquran.cloud/v1/quran/ar.alafasy"
    );
    // const quranData = await axios.get("./AllSurah.json");
    setDisplaySurah(quranData.data.data.surahs);
    setAllSurah(quranData.data.data.surahs);
    if (!selectedPlay.number) {
      setPlaySurah(quranData.data.data.surahs[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (allSurah.length) {
      setDisplaySurah(
        allSurah.filter((s) =>
          s.englishName.toLowerCase().includes(searchData.toLowerCase())
        )
      );
    }
  }, [searchData]);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const handleOnEnd = () => {
    setAudio(playSurah.ayahs[ayahNo]?.audio);
    setAyah(
      playSurah.ayahs[ayahNo]?.text.replace(
        "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
        ""
      )
    );
    if (ayahNo < playSurah.ayahs.length) {
      setAyahNo(ayahNo + 1);
    }
    if (ayahNo === playSurah.ayahs.length) {
      if (playSurah.number === 114) {
        setPlaySurah(allSurah[0]);
      } else {
        setPlaySurah(
          allSurah.find((sSurah) => sSurah.number === playSurah.number + 1)
        );
      }
    }
  };

  const playPrevious = () => {
    if (playSurah.number === 1) {
      setPlaySurah(allSurah[113]);
    } else {
      setPlaySurah(
        allSurah.find((sSurah) => sSurah.number === playSurah.number - 1)
      );
    }
  };
  const playNext = () => {
    if (playSurah.number === 114) {
      setPlaySurah(allSurah[0]);
    } else {
      setPlaySurah(
        allSurah.find((sSurah) => sSurah.number === playSurah.number + 1)
      );
    }
  };

  return (
    <Container style={{ marginTop: "70px", overflow: "hidden" }}>
      <Row>
        <Col xs={12} md={9} className="player">
          {surahLoading ? (
            <div className="text-center mx-auto spinner">
              <Button variant="danger" disabled>
                <div className="d-flex align-items-center justify-content-between">
                  <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </div>
          ) : (
            <>
              <Card
                style={{ height: "100%" }}
                className="shadow-lg playerCard pb-2"
              >
                {playSurah && (
                  <>
                    <div className="px-5 mt-3 card border-0 shadow-sm">
                      <div className="text-center">
                        <h3 className="surahName">{playSurah.name}</h3>
                      </div>
                      <div className="text-center">
                        <h4 className="surahName">{playSurah.englishName}</h4>
                      </div>
                      <div className="text-start d-none d-md-block">
                        Surah Serial No: {playSurah.number}
                      </div>
                      <div className="text-start d-none d-md-block">
                        English Translated Name:{" "}
                        {playSurah.englishNameTranslation}
                      </div>
                      <div className="text-start d-none d-md-block">
                        Number of Ayahs :{playSurah?.ayahs?.length}
                      </div>
                      <div className="text-start d-none d-md-block">
                        Surah Revelation Type : {playSurah.revelationType}
                      </div>
                    </div>
                    <div>
                      {showAyah && (
                        <div className="pt-md-2 mt-lg-4 mt-md-3">
                          <span className="text-center d-none d-md-block">
                            Playing Ayah no : {ayahNo}
                          </span>
                          <br className="d-none d-md-block" />
                          <h4 className="text-center pt-2 ayah">{ayah}</h4>
                        </div>
                      )}
                    </div>
                    <div
                      className="text-center"
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <audio
                        className="audioPlayer"
                        style={{ width: "90%" }}
                        src={audio}
                        controls
                        autoPlay={auto}
                        onPlay={() => {
                          setShowAyah(true);
                          setAuto(true);
                        }}
                        onEnded={() => {
                          handleOnEnd();
                        }}
                      ></audio>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          variant="danger"
                          className="rounded-circle p-0"
                          onClick={() => {
                            playPrevious();
                          }}
                        >
                          <SkipBackCircle size={30} />
                        </Button>
                        <div>
                          <Button
                            className="rounded-circle p-0"
                            onClick={() => {
                              playNext();
                            }}
                            disabled
                          >
                            <Rewind size={20} />
                          </Button>
                          <Button
                            className="rounded-circle p-0"
                            onClick={() => {
                              playNext();
                            }}
                            disabled
                          >
                            <FastForward size={20} />
                          </Button>
                        </div>
                        <Button
                          variant="danger"
                          className="rounded-circle p-0"
                          onClick={() => {
                            playNext();
                          }}
                        >
                          <SkipForwardCircle size={30} />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </>
          )}
        </Col>
        <Col xs={12} md={3} className="allSurah">
          {loading ? (
            <div className="text-center mx-auto spinner">
              <Button variant="success" disabled>
                <div className="d-flex align-items-center justify-content-between">
                  <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </div>
          ) : (
            <>
              {displaySurah.map((surah) => {
                return (
                  <Card
                    key={surah.number}
                    onClick={() => {
                      setPlaySurah(surah);
                    }}
                    className={`mb-2 shadow px-3  ${
                      playSurah.number === surah.number
                        ? "bg-danger text-light"
                        : ""
                    }`}
                    style={{
                      height: "70px",
                      justifyContent: "center",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    id={surah.number}
                  >
                    <Row>
                      <Col
                        xs={2}
                        md={2}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h4>{surah.number}</h4>
                      </Col>
                      <Col
                        xs={10}
                        md={10}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h6>{surah.name}</h6>
                        <h6>{surah.englishName}</h6>
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Player;
