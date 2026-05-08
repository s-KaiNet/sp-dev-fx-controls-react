/// <reference types="sinon" />
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { FileTypeIcon } from './FileTypeIcon';
import { IconType, ApplicationType, ImageSize } from './IFileTypeIcon';
var ICON_CDN_URL = "https://modernb.akamai.odsp.cdn.office.net/files/fabric-cdn-prod_20210703.001/assets/item-types";
describe('<FileTypeIcon />', function () {
    var fileTypeIcon;
    afterEach(function () {
        fileTypeIcon.unmount();
    });
    /**
     * Font icon tests
     */
    it('Font icon test with application', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font, application: ApplicationType.SASS }));
        expect(fileTypeIcon.find('i[data-icon-name="FileSass"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    it('Font icon test with path', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.doc" }));
        expect(fileTypeIcon.find('i[data-icon-name="WordDocument"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    it('Font icon test with path that contains querystring params', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.vsd?param1=prop1&param2=prop2" }));
        expect(fileTypeIcon.find('i[data-icon-name="VisioDocument"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    it('Font icon test with path of unknown extension', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font, path: "https://contoso.sharepoint.com/documents/filename.unknown" }));
        expect(fileTypeIcon.find('i[data-icon-name="Page"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    it('Font icon test without application or path, should render the generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font }));
        expect(fileTypeIcon.find('i[data-icon-name="Page"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    it('Font icon test with both the application and path, should take the path into account', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.font, application: ApplicationType.SASS, path: "https://contoso.sharepoint.com/documents/filename.doc" }));
        expect(fileTypeIcon.find('i[data-icon-name="WordDocument"]')).to.have.length(1);
        expect(fileTypeIcon.find('div')).to.have.length(0);
        done();
    });
    /**
     * Image icon tests
     */
    it('Image icon test with application', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.Word }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test with path', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.doc" }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test with path that contains querystring params', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.vsd?param1=prop1&param2=prop2" }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/vsdx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test with path of unknown extension', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, path: "https://contoso.sharepoint.com/documents/filename.unknown" }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test without application or path, should render the generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test with both application and path, should take the path into account', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.SASS, path: "https://contoso.sharepoint.com/documents/filename.docx" }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size SMALL test', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.Word, size: ImageSize.small }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size MEDIUM test', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.Word, size: ImageSize.medium }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/48/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size LARGE test', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: ApplicationType.Word, size: ImageSize.large }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/96/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size SMALL test for generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, size: ImageSize.small }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size MEDIUM test for generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, size: ImageSize.medium }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size LARGE test for generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, size: ImageSize.large }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size test with unkown size', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, size: ImageSize.small, application: ApplicationType.Word }));
        expect(fileTypeIcon.find("img[src=\"".concat(ICON_CDN_URL, "/16/docx.png\"]"))).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon size test with unkown size for generic icon', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, size: ImageSize.small }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
    it('Image icon test with unkown application', function (done) {
        fileTypeIcon = mount(React.createElement(FileTypeIcon, { type: IconType.image, application: 90 }));
        expect(fileTypeIcon.find('img')).to.have.length(1);
        expect(fileTypeIcon.find('i')).to.have.length(0);
        done();
    });
});
//# sourceMappingURL=FileTypeIcon.test.js.map