import React, { useEffect, useState } from 'react'
import { getSubmissions } from "../service/submissionService";
import Rellax from 'rellax';

const VerticalSlides = () => {
  const [submissions, setSubmissions] = useState(null);

  useEffect(() => {
    new Rellax(".slides", {
      speed: -5,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });

    async function loadSubmission() {
      const { data } = await getSubmissions();
      setSubmissions(data);
    }
    loadSubmission();
  }, [])

  return (
    <div className="verticalSlides__container slides">
      <h3 className="verticalSlides__overlay">Qdo is a community people share their lives with</h3>
      {submissions !== null
        ? submissions.map(submission => <img src={submission.image} alt="Fans submitted picture" />)
        : <React.Fragment>
          <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/V1.jpg" alt="Fan Submission"></img>
          <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/V4.jpg" alt="Fan Submission"></img>
          <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/V3.jpg" alt="Fan Submission"></img>
          <img src="https://myronbankbank.s3-ap-southeast-1.amazonaws.com/V2.jpg" alt="Fan Submission"></img>
        </React.Fragment>}

    </div>
  );
}

export default VerticalSlides;