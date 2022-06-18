import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";

const Surah = () => {
  const { surahNumber } = useParams();

  const [loading, setLoading] = useState(false);
  const [newSurah, setNewSurah] = useState([]);
  const [newAyah, setNewAyah] = useState([]);
  const [ayahNo, setAyahNo] = useState(0);
  const [audio, setAudio] = useState("");
  const [ayah, setAyah] = useState("");

  const getSurah = async () => {
    const surah = await axios.get(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
    );
    setNewSurah(surah.data.data);
    setNewAyah(surah.data.data.ayahs);
    setAyah(surah.data.data.ayahs[0].text);
    setAudio(surah.data.data.ayahs[0].audio);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getSurah();
  }, [surahNumber]);

  return (
    <div>
      <h2>Surah {surahNumber}</h2>
      <Container>
        <Row xs={1} md={1} className="g-4">
          {loading && (
            <div className="text-center">
              <Spinner animation="border" role="status" className="text-center">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{newSurah.name}</Card.Title>
                <Card.Text>{newSurah.englishName}</Card.Text>
                <Card.Text>{newSurah.number}</Card.Text>
                <Card.Text>{newSurah.englishNameTranslation}</Card.Text>
                <Card.Text>{newSurah.numberOfAyahs}</Card.Text>
                <Card.Text>{newSurah.revelationType}</Card.Text>
                <audio
                  src={audio}
                  controls
                  autoPlay
                  onEnded={() => {
                    setAudio(newSurah?.ayahs[ayahNo]?.audio);
                    setAyah(newSurah?.ayahs[ayahNo]?.text);
                    if(ayahNo<newSurah.ayahs.length-1){
                      setAyahNo(ayahNo + 1)
                    }
                  }}
                ></audio>
                <p>{ayah}</p>
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
                        }}
                        key={index}
                      >
                        <h4>{index + 1}:</h4>
                        <h6>{sAyah.text}</h6>
                        <audio
                          src={sAyah.audio}
                          controls
                        ></audio>
                      </div>
                    </>
                  );
                })}
                <Card.Footer></Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Surah;
