import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    ::-webkit-scrollbar-track
    {
        background: rgba(0,0,0,.2);
    }

    ::-webkit-scrollbar
    {
        width: 5px;
        height: 5px;
        background: rgba(0,0,0,.2);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 14px;
        --bg-main-color: linear-gradient(360deg, #040B2D 0%, #0C2163 53.65%, #103258 100%);
    }

    iframe#webpack-dev-server-client-overlay{display:none!important}

    body {
        font-family: 'lexend', sans-serif;
    }

    a {
        text-decoration: none;
    }
    
    img{
        object-fit: contain;
    }

    .ant-image-img {
        background: #fff;
    }
`;
