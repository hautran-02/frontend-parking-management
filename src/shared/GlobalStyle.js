import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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

    .border-none: {
        border: none;
    }

    .border-1 {
        border-radius: 8px;
    }

    .k-card {
        &.hide-header {
            .k-card-header {
                display: none;
            }
        }

        .k-card-body {
            padding-inline: 0;
            padding-block: 0;
        }
    }

    .ant-card.card-main{
        border-radius: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: none;

        .ant-card-head {
            padding: 10px 10px 0px;
            border: none;
            min-height: auto;
            .ant-card-head-title {
                display: contents;
                padding: 0;
            }
            .ant-card-extra{
                padding: 0;
            }
        }

        .ant-card-body {
            flex: 1;
            padding: 0 16px;
        }
    }
`;
