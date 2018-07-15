import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    position: absolute;
    top:0;
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  .container{
    position: absolute;
    width: 100%;
    top:0;
    z-index:1
  }
  svg{
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .track,
  .track-inset,
  .track-overlay {
    stroke-linecap: round;
  }

  .track {
    stroke: #000;
    stroke-opacity: 0.3;
    stroke-width: 10px;
  }

  .track-inset {
    stroke: #dcdcdc;
    stroke-width: 8px;
  }

  .track-overlay {
    pointer-events: stroke;
    stroke-width: 50px;
    stroke: transparent;
    cursor: pointer;
  }

  .handle {
    fill: #fff;
    stroke: #000;
    stroke-opacity: 0.5;
    stroke-width: 1.25px;
  }

  .graphs {
    height: 100px;
    stroke: hsl(200, 43%, 50%);
    stroke-width: 1px;
    fill: hsl(200, 43%, 77%)
  }

  .axis--x path {
    display: none;
  }

  .axis--y path {
    display: none;
  }
`;
