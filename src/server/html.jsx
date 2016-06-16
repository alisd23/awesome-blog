import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import config from './app.config';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

export default class Html extends React.Component {

  render() {
    const {assets, component, store} = this.props;
    let content = component ? renderToString(component) : '';
    let head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href='/assets/favicons/favicon.ico' />
          <link rel="apple-touch-icon" sizes="57x57" href="/assets/favicons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/assets/favicons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/assets/favicons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/assets/favicons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/assets/favicons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/favicons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/assets/favicons/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicons/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/assets/favicons/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          {/*{
            Object.keys(assets.styles).length === 0
              ? <style dangerouslySetInnerHTML={{__html: require('../../sass/app.scss')._style}}/>
              : null
          }*/}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <div id="dev-tools"></div>
          <script dangerouslySetInnerHTML={{__html:  `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>

          {/* Facebook SDK */}
          <script dangerouslySetInnerHTML={{__html: `
            window.fbAsyncInit = function() {
                FB.init({
                  appId      : ${config.fb_app_id},
                  xfbml      : true,
                  version    : 'v2.5'
                });
              };

            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "//connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
          `}}></script>
        </body>
      </html>
    );
  }
}
