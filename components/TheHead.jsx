import Head from 'next/head'

const TheHead = ({ subtitle = "playground" }) => {
    return (
        <div>
            <Head>
                <title>checkupAI | {subtitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
    )
}

export default TheHead
