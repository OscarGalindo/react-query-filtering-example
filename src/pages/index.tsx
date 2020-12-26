import Head from 'next/head'
import React from 'react'
import Users from "./users";

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo React-Query Filtering</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="container mx-auto py-10">
        <Users/>
      </div>
    </>
  )
}
