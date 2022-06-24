import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { DataProvider } from "../../Context/DataProvider";

const Player = () => {
  const { searchData, selectedPlay } = useContext(DataProvider);
  const [loading, setLoading] = useState(false);
  const [surahLoading, setSurahLoading] = useState(false);
  const [allSurah, setAllSurah] = useState([]);
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
        console.log(playSurah.ayahs[0]?.audio);
        setAudio(playSurah.ayahs[0]?.audio);
        setAyah(playSurah.ayahs[0]?.text);
        setAyahNo(1);
      } else {
        setAudio(
          "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
        );
        setAyah("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
        setAyahNo(0);
      }
      setSurahLoading(false);
    }
  }, [playSurah]);

  const getData = async () => {
    const quranData = await axios.get(
      "https://api.alquran.cloud/v1/quran/ar.alafasy"
    );
    setAllSurah(quranData.data.data.surahs);
    if (!selectedPlay.number) {
      setPlaySurah(quranData.data.data.surahs[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

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
    <Container style={{ marginTop: "70px" }}>
      <Row>
        <Col xs={1} md={9} style={{ height: "80vh" }}>
          {surahLoading ? (
            <div className="text-center mx-auto" style={{ marginTop: "40vh" }}>
              <Button variant="primary" disabled>
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
              <Card style={{ height: "100%" }}>
                {playSurah && (
                  <>
                    <div>
                      <Card>
                        <Card.Body>
                          <Card.Title className="text-start">
                            Surah Name : {playSurah.name}
                          </Card.Title>
                          <Card.Text className="text-start">
                            Surah Name English: {playSurah.englishName}
                          </Card.Text>
                          <Card.Text className="text-start">
                            Surah Serial No: {playSurah.number}
                          </Card.Text>
                          <Card.Text className="text-start">
                            English Translated Name:{" "}
                            {playSurah.englishNameTranslation}
                          </Card.Text>
                          <Card.Text className="text-start">
                            Number of Ayahs :{playSurah?.ayahs?.length}
                          </Card.Text>
                          <Card.Text className="text-start">
                            Surah Revelation Type : {playSurah.revelationType}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <div>
                      {showAyah && (
                        <div>
                          <h6 className="text-center">
                            Playing Ayah no :{ayahNo}
                          </h6>
                          <br />
                          <h3 className="text-center">{ayah}</h3>
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
                        style={{ width: "90%" }}
                        src={audio}
                        controls
                        autoPlay={auto}
                        onPlay={() => {
                          setShowAyah(true);
                          setAuto(true);
                        }}
                        onEnded={() => {
                          setAudio(playSurah.ayahs[ayahNo]?.audio);
                          setAyah(playSurah.ayahs[ayahNo]?.text);
                          if (ayahNo < playSurah.ayahs.length) {
                            setAyahNo(ayahNo + 1);
                          }
                          if (ayahNo === playSurah.ayahs.length) {
                            // setShowAyah(false);
                            setPlaySurah(
                              allSurah.find(
                                (sSurah) =>
                                  sSurah.number === playSurah.number + 1
                              )
                            );
                          }
                        }}
                      ></audio>
                      <div>
                        <Button
                          onClick={() => {
                            playPrevious();
                          }}
                        >
                          Prev
                        </Button>
                        <Button
                          onClick={() => {
                            playNext();
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </>
          )}
        </Col>
        <Col xs={1} md={3} style={{ height: "88vh", overflowY: "scroll" }}>
          {loading ? (
            <div className="text-center mx-auto" style={{ marginTop: "40vh" }}>
              <Button variant="primary" disabled>
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
              {allSurah.map((surah) => {
                return (
                  <Card
                    key={surah.number}
                    onClick={() => {
                      setPlaySurah(surah);
                    }}
                    className={`my-3 border-0 shadow px-3  ${
                      playSurah.number === surah.number ? "bg-danger" : ""
                    }`}
                    style={{ height: "110px", justifyContent: "center" }}
                  >
                    <Row>
                      <Col
                        xs={2}
                        md={2}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h2>{surah.number}</h2>
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
                        <h4>{surah.name}</h4>
                        <h4>{surah.englishName}</h4>
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
