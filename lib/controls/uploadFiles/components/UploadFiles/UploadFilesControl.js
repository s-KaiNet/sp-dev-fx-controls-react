import { __assign } from "tslib";
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import { useAtom } from 'jotai';
import { globalState } from '../../jotai/atoms';
import { DocumentList } from '../DocumentList/DocumentList';
export var UploadFilesControl = function (props) {
    var themeVariant = props.themeVariant, context = props.context, title = props.title, onUploadFiles = props.onUploadFiles, pageSize = props.pageSize;
    var _a = useAtom(globalState), setGlobalState = _a[1];
    React.useEffect(function () {
        setGlobalState(function (prevState) {
            return __assign(__assign({}, prevState), { themeVariant: themeVariant, context: context, title: title, onUploadFiles: onUploadFiles, pageSize: pageSize });
        });
    }, [themeVariant, context, pageSize, title, onUploadFiles]);
    return (React.createElement("section", null,
        React.createElement(DocumentList, { onUploadFiles: onUploadFiles })));
};
//# sourceMappingURL=UploadFilesControl.js.map