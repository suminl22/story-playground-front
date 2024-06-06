import React from "react";
import Slider from "react-slick";
import styled from '@emotion/styled';
import CreateContent from './CreateContent';
import RankingContent from './RankingContent';

const SimpleSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const data = [
    { key: 'create', component: <CreateContent /> },
    { key: 'ranking', component: <RankingContent /> }
  ];

  return (
    <Wrap>
      <Slider {...settings}>
        {data.map(content => (
          <div key={content.key}>
            {content.component}
          </div>
        ))}
      </Slider>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 5% auto;
  width: 100%;
  .slick-prev:before {
    opacity: 1;
    color: black;
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;

export default SimpleSlider;
