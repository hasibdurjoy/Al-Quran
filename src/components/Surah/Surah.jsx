import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";

const Surah = () => {
  const { surahNumber } = useParams();

  const [loading, setLoading] = useState(false);
  const [newSurah, setNewSurah] = useState([]);
  const [ayahNo, setAyahNo] = useState(0);
  const [audio, setAudio] = useState("");
  const [ayah, setAyah] = useState("");
  const [showAyah, setShowAyah] = useState(false);
  const [auto, setAuto] = useState(false);

  const getSurah = async () => {
    const surah = await axios.get(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
    );
    setNewSurah(surah.data.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getSurah();
    setAudio("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3");
    setAyah("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
    setAyahNo(0);
  }, [surahNumber]);

  return (
    <div style={{ marginTop: "70px" }}>
      <Container>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status" className="text-center">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <Card className="shadow-lg">
          <Card.Body>
            <Row>
              <Col xs={12} md={4} className="text-start">
                <Card.Title>Surah Name : {newSurah.name}</Card.Title>
                <Card.Text>
                  Surah Name English: {newSurah.englishName}
                </Card.Text>
                <Card.Text>Surah Serial No: {newSurah.number}</Card.Text>
                <Card.Text>
                  English Translated Name: {newSurah.englishNameTranslation}
                </Card.Text>
                <Card.Text>
                  Number of Ayahs :{newSurah?.ayahs?.length}
                </Card.Text>
                <Card.Text>
                  Surah Revelation Type : {newSurah.revelationType}
                </Card.Text>
              </Col>
              <Col xs={12} md={8}>
                <div className="text-center mt-5">
                  <audio
                    src={audio}
                    controls
                    autoPlay={auto}
                    onPlay={() => {
                      setShowAyah(true);
                      setAuto(true);
                    }}
                    onEnded={() => {
                      setAudio(newSurah.ayahs[ayahNo]?.audio);
                      setAyah(
                        newSurah.ayahs[ayahNo]?.text.replace(
                          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                          ""
                        )
                      );
                      if (ayahNo < newSurah.ayahs.length) {
                        setAyahNo(ayahNo + 1);
                      }
                      if (ayahNo === newSurah.ayahs.length) {
                        setShowAyah(false);
                      }
                    }}
                  ></audio>
                </div>
                {showAyah && (
                  <>
                    <h6 className="text-center">Playing Ayah no :{ayahNo}</h6>
                    <br />
                    <h3 className="text-center">{ayah}</h3>
                  </>
                )}
              </Col>
            </Row>
            <Card.Title>Ayats</Card.Title>
            {newSurah?.ayahs?.map((sAyah, index) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "5px",
                      borderBottom: "1px solid black",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <div className="d-flex align-items-center g-3">
                      <h4 className="me-3">{index + 1}:</h4>
                      <h6 className={ayahNo === index + 1 ? "text-danger" : ""}>
                        {sAyah.text.replace(
                          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                          ""
                        )}
                      </h6>
                    </div>
                    <div>
                      <audio src={sAyah.audio} controls></audio>
                    </div>
                  </div>
                </>
              );
            })}
            <Card.Footer></Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Surah;
