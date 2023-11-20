import styled from 'styled-components';

export const TransformBlock = styled.div`
  height: 96%;
  border: 1px solid #f0f0f0;
  padding: 18px;
  border-radius: 8px;
  background-color: #fff;

  @keyframes flashing {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .flashing {
    animation: flashing 0.7s infinite; /* The 'infinite' value will make the animation loop indefinitely */
  }
  .slot {
    position: absolute;
  }

  .image-container {
    position: absolute;
    z-index: 3;

    &:hover {
    }
  }
`;
