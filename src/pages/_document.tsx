import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

export default class ApplicationDocument extends Document {
  render() {
    return (
      <Html>
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        <div id="modal"/>
        </body>
      </Html>
    );
  }
}