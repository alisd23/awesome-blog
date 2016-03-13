
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import serverConfig from './config';

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

  render() : React.ReactElement<HTMLProps> {
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

          <link rel="shortcut icon" href={`${serverConfig.fruks_web_hostname}/favicon.ico`} />
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
                  appId      : ${serverConfig.fb_app_id},
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
