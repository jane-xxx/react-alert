import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'antd-mobile/lib/modal/index';
import {Action} from 'antd-mobile/lib/modal/PropsType';

export default function alert (
    title: React.ReactNode,
    message: React.ReactNode,
    actions = [{text: '知道啦'}]
) {
    let div = document.createElement('div');
    document.body.appendChild(div);
    let close = () => {
        ReactDom.unmountComponentAtNode(div);
        div.remove();
    };
    let footer = actions.map((button: Action<React.CSSProperties>) => {
        let oldPress = button.onPress || (() => {});
        button.onPress = () => {
            let res = oldPress();
            if (res && res.then) {
                res.then(close).catch(() => {})
            } else {
                close();
            }
        }
        return button;
    });
    ReactDom.render(
        <Modal
            visible={true}
            transparent={true}
            title={title}
            closable={false}
            maskClosable={false}
            footer={footer}
        >
            <div>{message}</div>
        </Modal>,
        div
    )
}
