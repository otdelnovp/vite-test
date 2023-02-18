import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
//@ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import { CompanySearchInput } from '@core/CompanySearchInput/CompanySearchInput';

Quill.register('modules/imageResize', ImageResize);

const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
            [{ 'align': [] }],
        ],
    },
    clipboard: {
        matchVisual: false,
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    }
}

const TestFeatures = () => {
    const [reactQuillValue, setReactQuillValue] = useState('');
    const [companyValue, setCompanyValue] = useState('')

    return <React.Fragment>
        <ReactQuill modules={modules} theme="snow" value={reactQuillValue} onChange={setReactQuillValue} />
        <CompanySearchInput
            name="INN"
            label="Поиск по ИНН"
            inputType="inn"
            defaultValue={companyValue}
            onChange={({ target: { value: newCompanyData } }) => {
                // console.log("newCompanyData", newCompanyData)}
            }}
            noOptionsText="Не найдена компания"
            loadingText="Загрузка..."
        />
        {/* <InputMask /> */}
    </React.Fragment>

};

export default TestFeatures;
