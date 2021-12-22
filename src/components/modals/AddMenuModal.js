import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { addMenu } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './BaseModal';
import Button from '../buttons/Button';
import { Input } from '../inputs';
import { camelize } from '../../utilities';
import Colors from '../../theme/colors';

const propTypes = {
  open: PropTypes.bool,
  handleModal: PropTypes.func.isRequired,
  menu: PropTypes.string,
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
  padding-bottom: 8px;
  margin-right: 16px;
  ${({ error }) => error && 'padding: 0;'}
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

const AddMenuModal = (props) => {
  const { open, handleModal } = props;
  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = (data) => {
    data.key = camelize(data.title);
    dispatch(addMenu(data));
    reset();
    handleModal();
  };

  const closeModal = () => {
    reset();
    handleModal();
  };

  return(
    <Modal open={open}>
      <Wrapper>
        <Header>
          <Title>Add a menu</Title>
          <Button color='white' variant='transparent' onClick={closeModal}>✕</Button>
        </Header>
        <FormWrapper>
          <StyledForm>
            <InputWrapper error={!!errors?.title?.message}>
              <label>Title</label>
              <Input 
                type='text'
                name='title'
                {...register('title', { required: 'Must include a title for your menu.' })}
              ></Input>
              <ErrorText>{errors?.title?.message}</ErrorText>
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

AddMenuModal.propTypes = propTypes;

export default AddMenuModal;