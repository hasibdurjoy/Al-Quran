import React, { useEffect, useState } from "react";
import { Card, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import PlayModal from "../PlayModal/PlayModal";

const SingleSurah = (props) => {
  const navigate = useNavigate();
  const [ayahNo, setAyahNo] = useState(0);
  const [showAyah, setShowAyah] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ayah, setAyah] = useState("");
  const [audio, setAudio] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setAyah("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
    setAudio("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3");
  }, []);

  return (
    <div>
      <Col className="h-100">
        <Card>
          <Card.Body>
            <Card.Title className="text-start">
              Surah Name : {props.singleSurah.name}
            </Card.Title>
            <Card.Text className="text-start">
              Surah Name English: {props.singleSurah.englishName}
            </Card.Text>
            <Card.Text className="text-start">
              Surah Serial No: {props.singleSurah.number}
            </Card.Text>
            <Card.Text className="text-start">
              English Translated Name:{" "}
              {props.singleSurah.englishNameTranslation}
            </Card.Text>
            <Card.Text className="text-start">
              Number of Ayahs :{props.singleSurah.ayahs.length}
            </Card.Text>
            <Card.Text className="text-start">
              Surah Revelation Type : {props.singleSurah.revelationType}
            </Card.Text>
            {/* <audio
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
                if (ayahNo < props.singleSurah.ayahs.length - 1) {
                  setAyahNo(ayahNo + 1);
                }
                if (ayahNo == props.singleSurah.ayahs.length - 1) {
                  setShowAyah(false);
                }
              }}
            ></audio>
            {showAyah && (
              <>
                <div>Playing Ayah no :{ayahNo}</div>
                <p>{ayah}</p>
              </>
            )} */}
            <Card.Footer>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() =>
                    navigate(`/surah/${props.singleSurah.number}`)
                  }
                >
                  See More
                </Button>
                <Button variant="primary" onClick={handleShow}>
                  Play
                </Button>
              </div>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <PlayModal singleSurah={props.singleSurah}/>
      </Modal>
    </div>
  );
};

export default SingleSurah;
