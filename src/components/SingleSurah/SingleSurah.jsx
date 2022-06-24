import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { DataProvider } from "../../Context/DataProvider";

const SingleSurah = (props) => {
  const { handlePlaySurah } = useContext(DataProvider);
  const navigate = useNavigate();

  return (
    <div>
      <Col className="h-100">
        <Card
          onClick={() => {
            handlePlaySurah(props.singleSurah);
            navigate("player");
          }}
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
            <Card.Footer>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => navigate(`/surah/${props.singleSurah.number}`)}
                >
                  See More
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    props.handleModalData(props.singleSurah);
                  }}
                >
                  Play
                </Button>
              </div>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default SingleSurah;
