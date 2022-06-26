import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { DataProvider } from "../../Context/DataProvider";

const SingleSurah = (props) => {
  const { handlePlaySurah } = useContext(DataProvider);
  const navigate = useNavigate();

  return (
    <>
      <Col>
        <Card
          onClick={() => {
            handlePlaySurah(props.singleSurah);
            navigate("/player");
          }}
          className="h-100 shadow-lg border-0 px-3 pb-2 surahCard"
          style={{ borderRadius: "20px" }}
        >
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
          <Card.Footer className="bg-transparent border-0 ">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="rounded-pill shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/surah/${props.singleSurah.number}`);
                }}
              >
                Read
              </Button>
              <Button
                variant="danger"
                className="rounded-pill shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlaySurah(props.singleSurah);
                  navigate("/player");
                }}
              >
                Play
              </Button>
              <Button
                variant="success"
                className="rounded-pill shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  props.handleModalData(props.singleSurah);
                }}
              >
                Modal
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default SingleSurah;
