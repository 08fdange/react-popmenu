import React from 'react';
import styled from 'styled-components';
import { removeItem } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from './BaseModal';
import Button from '../buttons/Button';
import Colors from '../../theme/colors';

const ItemType = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
};

const propTypes = {
  open: PropTypes.bool,
  item: PropTypes.shape(ItemType),
  handleModal: PropTypes.func.isRequired,
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

const BodyWrapper = styled.div`
  padding: 20px 16px;
`;

const PromptText = styled.h4`
  margin: 0;
  padding: 16px 0;
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

const RemoveItemModal = (props) => {
  const { open, item, handleModal } = props;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeItem(item?.id));
    handleModal();
  };

  return(
    <Modal open={open}>
      <Wrapper>
        <Header>
          <Title>Delete menu item</Title>
          <Button color='white' variant='transparent' onClick={handleModal}>✕</Button>
        </Header>
        <BodyWrapper>
          <PromptText>
            Are you sure you want to delete {item?.title} from the menu?
          </PromptText>
        </BodyWrapper>
        <Footer>
          <ButtonWrapper>
            <StyledButton variant='secondary' onClick={handleModal}>Cancel</StyledButton>
            <StyledButton 
              onClick={deleteItem} 
              backgroundColor={Colors.SecondaryRed}
              hoverBackgroundColor={Colors.SecondaryRedDark}
            >Delete</StyledButton>
          </ButtonWrapper>
        </Footer>
      </Wrapper>
    </Modal>
  );
};

RemoveItemModal.propTypes = propTypes;

export default RemoveItemModal;