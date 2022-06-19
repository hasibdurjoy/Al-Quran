import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Card, Col, Row } from "react-bootstrap";
import Slider from "react-slick";

const PlayModal = (props) => {
  const [ayahNo, setAyahNo] = useState(0);
  const [showAyah, setShowAyah] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ayah, setAyah] = useState("");
  const [audio, setAudio] = useState("");

  useEffect(() => {
    setAudio("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3");
    setAyah("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
    setAyahNo(0);
  }, [props.singleSurah]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Modal.Header closeButton>
        <h3 className="text-center">Surah Name : {props.singleSurah.name}</h3>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Row>
            <Col xs={12} md={4} className="text-start">
              <Card.Body>
                <Card.Title>Surah Name : {props.singleSurah.name}</Card.Title>
                <Card.Text>
                  Surah Name English: {props.singleSurah.englishName}
                </Card.Text>
                <Card.Text>
                  Surah Serial No: {props.singleSurah.number}
                </Card.Text>
                <Card.Text>
                  English Translated Name:{" "}
                  {props.singleSurah.englishNameTranslation}
                </Card.Text>
                <Card.Text>
                  Number of Ayahs :{props.singleSurah.ayahs.length}
                </Card.Text>
                <Card.Text>
                  Surah Revelation Type : {props.singleSurah.revelationType}
                </Card.Text>
              </Card.Body>
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
                    setAudio(props.singleSurah.ayahs[ayahNo]?.audio);
                    setAyah(props.singleSurah.ayahs[ayahNo]?.text);
                    if (ayahNo < props.singleSurah.ayahs.length) {
                      setAyahNo(ayahNo + 1);
                    }
                    if (ayahNo === props.singleSurah.ayahs.length) {
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
        </Card>
        <br />
        <br />
        <div className="mx-5">
          <h2 className="text-center">All Surah</h2>
          <Slider {...settings}>
            {props.allSurah.map((sinSurah) => {
              return (
                <Card
                  onClick={() => {
                    props.handleModalData(sinSurah);
                  }}
                  style={{
                    border:
                      sinSurah.number === props.singleSurah.number
                        ? "1px solid red"
                        : "",
                  }}
                  className="mx-2"
                >
                  <p className="text-center">{sinSurah.number}</p>
                  <p className="text-center">{sinSurah.name}</p>
                </Card>
              );
            })}
          </Slider>
          <br />
          <br />
        </div>
      </Modal.Body>
    </div>
  );
};

export default PlayModal;