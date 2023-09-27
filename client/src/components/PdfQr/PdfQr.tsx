import React from 'react';
import { Page, View, Document } from '@react-pdf/renderer';

type Props = {
    path: string;
}

export const PdfQr = ({ path }: Props) => {

    console.log(path)
    
    return (
        <Document >
            <Page object-fit="fill" size="A4">
                <View>
                    <img src={ path } alt="images" />
                </View>
            </Page>
        </Document>
    );
};
