const animationConfig = {
  fadeInUp: {
    duration: '1000ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
      0% {
        transform: translateY(40px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    `,
  },
  fadeInDown: {
    duration: '1000ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
      0% {
        transform: translateY(-40px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    `,
  },
  fadeDownOut: {
    duration: '1000ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(40px);
        opacity: 0;
      }
    `,
  },
  fadeInLeft: {
    duration: '2000ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
    `,
  },
  fadeOutRight: {
    duration: '2000ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
    0% {
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-20px);
    }
    `,
  },
  slideDown: {
    duration: '500ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(96px);
    }
    `,
  },
  slideUp: {
    duration: '500ms',
    delay: '0ms',
    timingFunction: 'ease-in-out',
    keyFrame: `
    0% {
      transform: translateY(96px);
    }
    100% {
      transform: translateY(0px);
    }
    `,
  },
};

export default animationConfig;