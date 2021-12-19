import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import AnimationConfig from './animationConfig';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * Determines the type of animation to be used.
   */
   animation: PropTypes.oneOf(['fadeInUp', 'fadeInDown', 'fadeDownOut', 'fadeInLeft', 'fadeOutRight', 'slideUp', 'slideDown']),
   /**
   * If set to true, children wrapped in component will be animated.
   */
   animated: PropTypes.bool,
   /**
    * To signal to start animation. Could be used as a delay or auto
    */
   startAnimation: PropTypes.bool,
   /**
    * Reset animation
    */
   autoReset: PropTypes.bool,
   /**
   * Children to be passed into animation wrapper.
   */
   children: PropTypes.any,
   /**
    * Custom function to configure when animation ends
    */
   onAnimationEnd: PropTypes.func,
    /**
    * Custom function to configure when animation starts
    */
   onAnimationStart: PropTypes.func,
 };

const buildAnimation = (animation) => {
  if (animation === {} || !animation) {
    return null;
  };

  const {
    duration, delay, timingFunction, keyFrame,
  } = animation;
  const animationKeyframe = keyframes`${keyFrame}`;

  return css`
    animation: ${duration} ${timingFunction} ${delay} ${animationKeyframe};
  `;
};

const AnimatorWrapper = styled.div`
  position: relative;
  ${({ animation, animated }) => animated && buildAnimation(animation)};
  animation-play-state: ${({ startAnimation }) => (startAnimation ? 'running' : 'paused')};
  animation-fill-mode: forwards;
`;

const AnimationWrapper = (props) => {
  const {
    animation: animationType, animated, children, startAnimation, autoReset, ...rest
  } = props;
  const animation = AnimationConfig[animationType];

  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  const onAnimationStart = () => {
    setAnimationStarted(true);
    setAnimationFinished(false);
  };

  const onAnimationEnd = () => {
    setAnimationFinished(true);
  };

  /**
   * Status of animation: running or paused
  */
  const status = (startAnimation && !animationFinished)
  || (!startAnimation && !animationFinished && animationStarted);

  /**
   * Function to determine the animation type if autoReset is set to true
   * Upon entering page, animation will be ''
   * This prevents animation to be played initially
   */
  const getAnimation = () => {
    if (!animationStarted && !animationFinished && !status) {
      return undefined;
    }
    return animation;
  };

  return (
    <AnimatorWrapper
      animated={animated}
      animation={autoReset ? getAnimation() : animation}
      {...(autoReset
        ? {
          onAnimationStart,
          onAnimationEnd,
          startAnimation: status,
        }
        : { startAnimation }
      )}
      {...rest}
    >
      {children}
    </AnimatorWrapper>
  );
};

AnimationWrapper.propTypes = propTypes;

export default AnimationWrapper;