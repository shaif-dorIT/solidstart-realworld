// @refresh reload
import {
  Routes,
  FileRoutes,
  Scripts,
  ErrorBoundary,
  Head,
  Body,
  Meta,
  Html,
  Link
} from 'solid-start'
import { Suspense } from 'solid-js'

import { Provider } from './store'
import DefaultLayout from './layout/DefaultLayout'

export default function Root() {
  return (
    <Html lang='en'>
      <Head>
        <Meta charset='utf-8' />
        <Meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        {/* <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on --> */}
        <Link
          href='//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
          rel='stylesheet'
          type='text/css'
        />
        <Link
          href='//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic'
          rel='stylesheet'
          type='text/css'
        />
        {/* <!-- Import the custom Bootstrap 4 theme from our hosted CDN --> */}
        <Link
          rel='preconnect'
          href='https://static.productionready.io'
          crossorigin='anonymous'
        />
        <Link
          rel='preconnect'
          href='https://api.realworld.io'
          crossorigin='anonymous'
        />
        <Link
          rel='preconnect'
          href='http://code.ionicframework.com'
          crossorigin='anonymous'
        />
        <Link
          rel='stylesheet'
          href='/css/main.css'
        />
        <Link
          rel='shortcut icon'
          type='image/x-icon'
          href='/favicon.ico'
        />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <Provider>
              <DefaultLayout>
                <Routes>
                  <FileRoutes />
                </Routes>
              </DefaultLayout>
            </Provider>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  )
}
