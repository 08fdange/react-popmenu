import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { addItem } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import Modal from './BaseModal';
import Button from '../buttons/Button';
import { Input } from '../inputs';
import Colors from '../../theme/colors';

const propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  background-color: ${Colors.Purple};
  color: white;
  padding: 0 16px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
`;

const FormWrapper = styled.div`
  padding: 20px 16px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 100%;
`;

const InputWrapper = styled.div`
  padding-bottom: 16px;
  margin-right: 16px;
  ${({ error }) => error && 'padding: 0;'}
`;

const PriceInputWrapper = styled(InputWrapper)`
  position: relative;
`;

const CurrencySymbol = styled.span`
  color: ${Colors.GrayDark};
  font-size: 22px;
  position: absolute;
  left: 8px;
  top: 32px;
`;

const PriceInput = styled(Input)`
  padding-left: 25px;
  width: calc(100% - 19px);
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  background-color: ${Colors.GrayLight};
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

const StyledButton = styled(Button)`
  box-shadow: none;
  margin-right: 16px;
`;

const ErrorText = styled.p`
  margin: 0;
  padding: 6px 0;
  font-size: 12px;
  color: ${Colors.SecondaryRed}
`;

const AddItemModal = (props) => {
  const { open, handleModal, scrollToBottom } = props;
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = (data) => {
    data.price = parseInt(data.price, 10);
    data.id = uuid();
    dispatch(addItem(data));
    handleModal();
    scrollToBottom();
  };

  const closeModal = () => {
    reset();
    handleModal();
  };

  return(
    <Modal open={open}>
      <Wrapper>
        <Header>
          <Title>Add a menu item</Title>
          <Button color='white' variant='transparent' onClick={closeModal}>✕</Button>
        </Header>
        <FormWrapper>
          <StyledForm>
            <InputWrapper error={!!errors?.title?.message}>
              <label>Title</label>
              <Input 
                type='text'
                name='title'
                {...register('title', { required: 'Must include a title for your menu item.' })}
              ></Input>
              <ErrorText>{errors?.title?.message}</ErrorText>
            </InputWrapper>
            <InputWrapper error={!!errors?.description?.message}>
              <label>Description</label>
              <Input
                variant='textarea'
                type='text' 
                name='description'
                {...register('description', { required: 'Must include a description for your menu item.' })}
                ></Input>
                <ErrorText>{errors?.description?.message}</ErrorText>
            </InputWrapper>
            <PriceInputWrapper error={!!errors?.price?.message}>
              <label>Price</label>
              <CurrencySymbol>$</CurrencySymbol>
              <PriceInput 
                type='number'
                name='price'
                pattern="[0-9]*"
                {...register('price', { required: 'Must include a price for your menu item.' })}
              ></PriceInput>
              <ErrorText>{errors?.price?.message}</ErrorText>
            </PriceInputWrapper>
            <InputWrapper error={!!errors?.imgUrl?.message}>
              <label>Image URL</label>
              <Input
                type='text'
                name='imgUrl'
                {...register('imgUrl', { 
                  required: 'Must include a image url for your menu item.',
                  pattern: {
                    value: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
                    message: 'Must be a valid url'
                  }
                })}
              ></Input>
              <ErrorText>{errors?.imgUrl?.message}</ErrorText>
            </InputWrapper>
          </StyledForm>
        </FormWrapper>
        <Footer>
          <ButtonWrapper>
            <StyledButton variant='secondary' onClick={closeModal}>Cancel</StyledButton>
            <StyledButton onClick={handleSubmit(handleSubmitForm)} backgroundColor={Colors.Purple}>Save</StyledButton>
          </ButtonWrapper>
        </Footer>
      </Wrapper>
    </Modal>
  );
};

AddItemModal.propTypes = propTypes;

export default AddItemModal;