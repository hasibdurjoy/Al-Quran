import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Spinner, Modal } from "react-bootstrap";
import SingleSurah from "../SingleSurah/SingleSurah";
import PlayModal from "../PlayModal/PlayModal";
import { DataProvider } from "../../Context/DataProvider";

const Quran = () => {
  const { searchData } = useContext(DataProvider);
  const [loading, setLoading] = useState(false);
  const [surah, setSurah] = useState([]);
  const [showSurah, setShowSurah] = useState([]);
  const [playSurah, setPlaySurah] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleModalData = (data) => {
    setPlaySurah(data);
    handleShow();
    console.log(data);
  };

  const getData = async () => {
    const quranData = await axios.get(
      "https://api.alquran.cloud/v1/quran/ar.alafasy"
    );
    setShowSurah(quranData.data.data.surahs);
    setSurah(quranData.data.data.surahs);
    setLoading(false);
  };
  useEffect(() => {
    const show = surah.filter((s) =>
      s.englishName.toLowerCase().includes(searchData.toLowerCase())
    );
    setShowSurah(show);
  }, [searchData]);
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <>
      <Container style={{ marginTop: "70px" }}>
        {loading ? (
          <div className="text-center mx-auto" style={{ marginTop: "50vh" }}>
            <Button variant="primary" disabled>
              <div className="d-flex align-items-center justify-content-between">
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                />
                <b>Loading...</b>
              </div>
            </Button>
          </div>
        ) : (
          <Row xs={1} md={3} className="g-4">
            {showSurah.map((siSurah) => (
              <SingleSurah
                singleSurah={siSurah}
                handleModalData={handleModalData}
                key={siSurah.number}
              />
            ))}
          </Row>
        )}
      </Container>
      <div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ maxWidth: "1000px !important" }}
        >
          <PlayModal
            singleSurah={playSurah}
            allSurah={surah}
            handleModalData={handleModalData}
          />
        </Modal>
      </div>
    </>
  );
};

export default Quran;
