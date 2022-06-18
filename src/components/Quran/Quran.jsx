import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import SingleSurah from "../SingleSurah/SingleSurah";

const Quran = () => {
  const [loading, setLoading] = useState(false);
  const [surah, setSurah] = useState([]);
  const [ayah, setAyah] = useState(0);
  const navigate = useNavigate()
  const getData = async () => {
    const quranData = await axios.get(
      "https://api.alquran.cloud/v1/quran/ar.alafasy"
    );
    setSurah(quranData.data.data.surahs);
    console.log(quranData.data.data.surahs[0].ayahs[0].audio);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <Container>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-center">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {surah.map(siSurah=><SingleSurah singleSurah={siSurah}/>)}
        </Row>
      )}
    </Container>
  );
};

export default Quran;
