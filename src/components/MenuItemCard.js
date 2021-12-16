import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
};

const Wrapper = styled.div`
  display: flex;
  padding: 20px 16px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const ImgWrapper = styled.div`
  display: flex;
`

const StyledImg = styled.img`
  height: 120px;
  width: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  vertical-align: middle;
  margin-right: 16px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.h2`
  margin: 0;
  margin-bottom: 12px;
  padding: 0;
`;

const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
`;

const PriceSection = styled.div`
  margin-left: auto;
`;

const PriceText = styled.h3`
  margin: 0;
  padding: 0;
  flex: 1;
`;

const MenuItemCard = (props) => {
  const {
    title,
    description,
    price,
    imgUrl
  } = props;

  return (
    <Wrapper {...props}>
      <ImgWrapper>
        <StyledImg src={imgUrl} alt={title} />
      </ImgWrapper>
      <TextSection>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </TextSection>
      <PriceSection>
        <PriceText>{`$${price.toFixed(2)}`}</PriceText>
      </PriceSection>
    </Wrapper>
  )
}

MenuItemCard.propTypes = propTypes;

export default MenuItemCard;

