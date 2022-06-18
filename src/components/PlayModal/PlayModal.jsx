import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Card, Col, Button} from "react-bootstrap";

const PlayModal = (props) => {
  const [ayahNo, setAyahNo] = useState(0);
  const [showAyah, setShowAyah] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ayah, setAyah] = useState("﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
  const [audio, setAudio] = useState("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3");

  return (
    <div>
      <Modal.Header closeButton>
          Surah Name : {props.singleSurah.name}
        </Modal.Header>
        <Modal.Body>
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
          </Card.Body>
        </Card>
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
              <h2 className="text-center">Playing Ayah no :{ayahNo}</h2><br />
              <h3 className="text-center">{ayah}</h3>
            </>
          )} 
        </Modal.Body>
    </div>
  );
};

export default PlayModal;