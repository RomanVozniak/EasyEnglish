import React, { useState, useEffect } from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import "./style.scss";

export default function CardWrapper(props) {
  const { title, text, footer, type, progress } = { ...props };

  const border = type === "success" ? "success" : "";

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card border={border} className="text-center card shadow">
            {progress >= 0 && (
              <Card.Header>
                <ProgressBar now={progress} />
              </Card.Header>
            )}
            <Card.Body>
              <Card.Title className="body-title">
                <h2>{title}</h2>
              </Card.Title>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
            <Card.Footer>{footer}</Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
}
