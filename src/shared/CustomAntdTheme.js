import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    .ant-menu {
        .ant-menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100px;

            .anticon {
                font-size: 1.6rem;
            }

            .ant-menu-title-content {
                font-weight: 600;
                font-size: 1.2rem;
            }
        }
    }
`;
