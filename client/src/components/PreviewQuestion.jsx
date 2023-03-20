import React from "react";
import Question from "./Question";
import "../scss/previewQuestion.scss";

const PreviewQuestion = ({ images, questions }) => {
  return (
    <div className="preview-question">
      {images?.length > 0 ? (
        <div className="with-image">
          {images.map((img, index) => {
            return (
              <div key={index}>
                <img src={`http://localhost:1337${img}`} alt="HIT-image" />
                {questions?.map((question, index) => {
                  return <Question question={question} key={index} />;
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-image">
          {questions?.map((question, index) => {
            return <Question question={question} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PreviewQuestion;
