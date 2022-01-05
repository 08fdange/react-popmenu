import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import withAppManager from '../../utilities/withAppManager';
import AnimationWrapper from '../../utilities/AnimationWrapper';
import PropTypes from 'prop-types';
import getMeasures from '../../utilities/utils/getMeasures';


const propTypes = {
  open: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  viewport: PropTypes.string,
  children: PropTypes.any,
}

const MODAL_WIDTH = {
  mobileSmall: '90%',
  mobile: '90%',
  tablet: '80%',
  desktopSmall: '65%',
  default: '50%',
};

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgba(229, 234, 240, 0.85);
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  border-radius: 8px;
  overflow: scroll;
  width: ${({ width, viewport }) => width || getMeasures(MODAL_WIDTH, viewport)}; 
  ${({ viewport }) => viewport === 'desktop' && 'max-height: 90vh;'};
  background-color: white;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
`;

const StyledAnimationWrapper = styled(AnimationWrapper)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Modal = (props) => {
  const {
    children, height, width, open, viewport, ...rest
  } = props;

  if (!open) return null;

  const ModalComponent = (
    <ModalBackground>
      <StyledAnimationWrapper animated autoReset startAnimation={open} animation="fadeInDown">
        <ModalWrapper width={width} height={height} viewport={viewport} {...rest}>
          {children}
        </ModalWrapper>
      </StyledAnimationWrapper>
    </ModalBackground>

  );

  return createPortal(ModalComponent, document.body);
};

Modal.propTypes = propTypes;

Modal.defaultProps = {
  open: false,
  viewport: 'desktop',
};

export default withAppManager(Modal);
