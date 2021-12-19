import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './buttons/Button';
import withAppManager from '../utilities/withAppManager';
import Colors from '../theme/colors';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
  viewport: PropTypes.string,
  handleDelete: PropTypes.func,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'row'};
  padding: 20px 16px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const ImgWrapper = styled.div`
  display: flex;
`;

const StyledImg = styled.img`
  height: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  width: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  vertical-align: middle;
  margin-right: 16px;
  ${({ isMobile }) => isMobile && 'margin-bottom: 16px;'}
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
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile ? 'row' : 'column'};
  justify-items: space-between;
  margin-left: ${({ isMobile }) => isMobile ? '0' : 'auto'};
  padding-left: ${({ isMobile }) => isMobile ? '0' : '16px'};
  ${({ isMobile }) => isMobile && 'padding-top: 16px;'}
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
    imgUrl,
    viewport,
    handleDelete,
  } = props;

  const isMobile = viewport === 'mobile' || viewport === 'mobileSmall';

  return (
    <Wrapper isMobile={isMobile} {...props}>
      <ImgWrapper>
        <StyledImg isMobile={isMobile} src={imgUrl} alt={title} />
      </ImgWrapper>
      <TextSection>
        <TitleText>{title}</TitleText>
        <DescriptionText>{description}</DescriptionText>
      </TextSection>
      <PriceSection isMobile={isMobile}>
        <PriceText>{`$${price.toFixed(2)}`}</PriceText>
        <Button
          onClick={handleDelete}
          backgroundColor={Colors.SecondaryRed}
          hoverBackgroundColor={Colors.SecondaryRedDark}
        >Delete</Button>
      </PriceSection>
    </Wrapper>
  );
};

MenuItemCard.propTypes = propTypes;

export default withAppManager(MenuItemCard);

