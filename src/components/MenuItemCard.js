import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { editItem } from '../redux/actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './buttons/Button';
import { Input } from './inputs';
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
  position: relative;
`;

const StyledImg = styled.img`
  height: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  width: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  vertical-align: middle;
  ${({ isMobile }) => isMobile ? 'margin-bottom: 16px;' : 'margin-right: 16px;'}
`;

const EditImageOverlay = styled.div`
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  height: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  width: ${({ isMobile }) => isMobile ? '100%' : '120px'};
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const OverlayText = styled.p`
  color: ${Colors.White};
  padding: 0;
  margin: 0;
  font-size: ${({ isMobile }) => isMobile ? '32px' : '20px'};
  font-weight: 600;
`;

const ImageInput = styled(Input)`
  margin: 0 16px;
`;

const ImgInput = styled(Input)`
  width: calc(100% - 16px);
  padding-top: 0;
  margin-top: 4px;
  font-size: 16px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isEdit }) => isEdit && 'flex: 1;'}
`;

const TitleText = styled.h2`
  margin: 0;
  margin-bottom: 12px;
  padding: 0;
`;

const TitleInput = styled(Input)`
  width: calc(100% - 16px);
  padding-top: 0;
  margin-bottom: 4px;
`;

const DescriptionText = styled.p`
  margin: 0;
  padding: 0;
`;

const DescriptionInput = styled(Input)`
  width: calc(100% - 16px);
  font-size: 16px;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile ? 'row' : 'column'};
  margin-left: ${({ isMobile, isEdit }) => (!isMobile && !isEdit) ? 'auto' : '0'};
  padding-left: ${({ isMobile }) => isMobile ? '0' : '16px'};
  ${({ isMobile }) => isMobile && 'padding-top: 16px;'}
`;

const PriceText = styled.h3`
  margin: 0;
  padding: 0;
  flex: 1;
`;

const PriceInputWrapper = styled.div`
  position: relative;
  padding-bottom: ${({ isMobile }) => isMobile ? '0' : '8px'};
  padding-right: ${({ isMobile }) => isMobile ? '12px' : '0'};
  ${({ isMobile }) => isMobile && 'width: 73px;'}
`;

const CurrencySymbol = styled.span`
  color: ${Colors.GrayDark};
  font-size: 22px;
  position: absolute;
  left: 8px;
  top: 7px;
`;

const PriceInput = styled(Input)`
  padding: 0;
  padding-left: 22px;
  width: 50px;
  height: 35px;
`;

const EditButton = styled(Button)`
  ${({ isMobile }) => isMobile ?
    'margin-right: 8px; margin-left: auto;' :
    'margin-bottom: 8px;'
  }
`;

const MenuItemCard = (props) => {
  const {
    id,
    title,
    description,
    price,
    imgUrl,
    viewport,
    handleDelete,
  } = props;

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const isMobile = viewport === 'mobile' || viewport === 'mobileSmall';
  const { register, handleSubmit, reset, formState: { isDirty }} = useForm({
    defaultValues: {
      title,
      description,
      price,
      imgUrl,
    }
  });

  const handleEdit = (data) => {
    if (isEdit && isDirty) {
      data.price = parseInt(data.price, 10);
      dispatch(editItem(id, data));
      setIsEdit(false);
      reset(data);
    } else {
      setIsEdit((prev) => !prev);
    }
    setEditImg(false);
  };

  const cancelEdit = () => {
    reset();
    setIsEdit(false);
    setEditImg(false);
  };

  return (
    <Wrapper isMobile={isMobile} {...props}>
      <ImgWrapper isEdit={isEdit}>
        <StyledImg isMobile={isMobile} src={imgUrl} alt={isEdit ? 'Edit image' : title} />
        {isEdit && 
          <EditImageOverlay 
            isMobile={isMobile} 
            onClick={() => setEditImg(true)}
          >
            {(editImg && isMobile) ?
              <ImageInput 
                name='imgUrl'
                placeholder='Image URL' 
                {...register('imgUrl')} 
              /> :
              <OverlayText isMobile={isMobile}>
                Click to edit
              </OverlayText>
            }
          </EditImageOverlay>
        }
      </ImgWrapper>
      <TextSection isEdit={isEdit}>
        {isEdit ? 
          <TitleInput 
            name='title'
            placeholder='Title'
            {...register('title', { required: 'Must include a title for your menu item.' })} 
          /> :
          <TitleText>{title}</TitleText>
        }
        {isEdit ?
          <DescriptionInput 
            name='description' 
            placeholder='Description'
            {...register('description', { required: 'Must include a description for your menu item.' })} 
          /> :
          <DescriptionText>{description}</DescriptionText>
        }
        {editImg && !isMobile &&
          <ImgInput 
            name='imgUrl'
            placeholder='Image URL' 
            {...register('imgUrl')} 
          />
        }
      </TextSection>
      <PriceSection isMobile={isMobile}>
        {isEdit ? 
          <PriceInputWrapper isMobile={isMobile}>
            <CurrencySymbol>$</CurrencySymbol>
            <PriceInput 
              name='price' 
              type='number'
              pattern='[0-9]*'
              autoComplete='off'
              {...register('price', { required: 'Must include a price for your menu item.' })} 
            /> 
          </PriceInputWrapper>
          :
          <PriceText>{`$${price.toFixed(2)}`}</PriceText>
        }
        <EditButton
          variant='primary'
          backgroundColor={Colors.Gray}
          hoverBackgroundColor={Colors.GrayDark}
          onClick={handleSubmit(handleEdit)}
          isMobile={isMobile}
        >
          {isEdit ? 'Done' : 'Edit'}
        </EditButton>
        {
          isEdit ? 
          <Button 
            variant='secondary'
            onClick={cancelEdit}
          >
            Cancel
          </Button> :
          <Button
            onClick={handleDelete}
            backgroundColor={Colors.SecondaryRed}
            hoverBackgroundColor={Colors.SecondaryRedDark}
          >
            Delete
          </Button>
        }
        
      </PriceSection>
    </Wrapper>
  );
};

MenuItemCard.propTypes = propTypes;

export default withAppManager(MenuItemCard);

