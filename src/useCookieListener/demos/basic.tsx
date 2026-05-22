import React, { useEffect } from 'react';
import { Cookie } from '@dtinsight/dt-utils';
import { Button, message } from 'antd';
import { useCookieListener } from 'dt-react-component';

export default () => {
    useEffect(() => {
        console.log(Cookie);
        Cookie.remove('dt_token');
        Cookie.remove('dt_userid');
        return () => {
            Cookie.remove('dt_token');
            Cookie.remove('dt_userid');
        };
    }, []);

    useCookieListener(
        ({ changedFields }) => {
            console.log('cookie fields hasChanged', changedFields);
            if (changedFields?.length) {
                message.info(
                    '以下Cookie字段发生变更：' +
                        changedFields.map((field) => `${field.key} : ${field.value}`).join(',')
                );
            }
        },
        ['dt_token']
    );

    useCookieListener(({ prevValue, nextValue }) => {
        message.info(
            `监听到Cookie从 ${JSON.stringify(prevValue)} 变更为了 ${JSON.stringify(nextValue)} `
        );
    }, []);

    return (
        <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <p>
                <Button
                    onClick={() => {
                        Cookie.set('dt_token', `im_new_token_${Date.now()}`);
                        Cookie.set('dt_userid', `im_new_userid_${Date.now()}`);
                    }}
                >
                    修改Cookie值
                </Button>
            </p>
            <p>监听页面 Cookie 信息变更</p>
        </div>
    );
};
