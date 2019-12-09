
import React from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import 'bootstrap/dist/css/bootstrap.css';
import * as legoData from './legoData.json';
import * as doneData from './doneData.json';
import * as error from './error.json';

const legoOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const errorOptions = {
  loop: false,
  autoplay: true,
  animationData: error.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
const doneOption = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = ({ loading, error }) => {
  const loadingAnimation = () => {
    if (loading) {
      return (
        <>
          <h1>טוען נתונים...</h1>
          <Lottie options={legoOptions} height={120} width={120} />
        </>
      );
    }
    return <Lottie options={doneOption} height={120} width={120} />;
  };
  const errorAnimation = () => <Lottie options={errorOptions} height={120} width={120} />;

  return (
    <FadeIn>
      <div className="d-flex justify-content-center align-items-center">
        {error ? errorAnimation() : loadingAnimation() }
      </div>
    </FadeIn>
  );
};

export default Loading;
