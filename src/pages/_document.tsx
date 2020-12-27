import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

export default class ApplicationDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;800&display=swap" rel="stylesheet" />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        <div id="modal"/>
        </body>
      </Html>
    );
  }
}