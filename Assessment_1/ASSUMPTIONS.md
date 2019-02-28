## assumptions for the function of the UI:
1) This is a static page and will not navigate to any other page. Though, there are href tags on each a tag that will show a hashtag with a sudo page name in the url.
2) There is only one photo of the property available to us.
3) The menu on the bottom of the page was assumed to be navigation (the white box with 'Map' & 'Photo Gallery'). This is because of the direction of the arrows, which could imply 'next page' as the 'back' button in the header has an arrow that points the opposite direction. It could alternatively be an accordion or a menu whose selections appear to the right of it.
4) There is only one color of logo and branding, it does not match the header background. A way to fix this would be to use a logo with transparent background.
5) Made in Chrome 72, and is untested in other browsers for compatability.
6) Is using Flexbox.

## considerations for the layout of the code:
1) grouped site wide styles into main.css
2) grouped component styles into components.css
3) grouped modifications into modifications.css
4) The menu at the bottom is assumed to stay in the same position when the screen is enlarged. 
5) The background is snapped to the width of the 'main' element, and there are no gutters on the edge of the site.
