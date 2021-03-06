import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';
import React from 'react';
import FilterBar from './FilterBar.js';
import {HEXtoRGB, rgbToHsl, RGBtoHex, HSLtoRGB, hexToGrayscale} from './colorCalcHelpers.js';
import hsltohex from 'hsl-to-hex';
import hexToHsl from 'hex-to-hsl';

var Preview2 = ({location: {query}}) => {

  var styles = {
    headerFooter: {},
    left: {},
    right: {},
    headersLeft: {},
    headersRight: {},
    links: {}
  };

  var setStyles = function() {
    var i = 0;
    for (var key in query) {
      i++;
    }
    var colorCount = i - 4;
    // Temporary for testing purposes - REMOVE THESE TWO LINES
    delete query.color4;
    delete query.color5;

    var temp1 = query.color1;
    var temp2 = query.color2;
    var temp3 = query.color3;

    query.color1 = temp2;
    query.color2 = temp3;
    query.color3 = temp1;

    // Dynamic color generation when passed too few colors for a full theme
    if ( hexToGrayscale(query.color2) < .5 ) {
      console.log('Left is DARK');
      var hsl4 = hexToHsl(query.color1);
      var generatedColor4 = hsltohex(hsl4[0], hsl4[1], 80 );
      var hsl5 = hexToHsl(query.color3);
      var generatedColor5 = hsltohex(hsl5[0], hsl5[1], 80 );
      query.color4 = query.color4 || generatedColor4;
      query.color5 = query.color5 || generatedColor5;
    } else {
      console.log('Left is LIGHT');
      var hsl4 = hexToHsl(query.color1);
      var generatedColor4 = hsltohex(hsl4[0], hsl4[1], 20);
      var hsl5 = hexToHsl(query.color3);
      var generatedColor5 = hsltohex(hsl5[0], hsl5[1], 20);
      query.color4 = query.color4 || generatedColor4;
      query.color5 = query.color5 || generatedColor5;
    }
    if ( hexToGrayscale(query.color3) < .5 ) {
      console.log('Right is DARK');
      var hsl1 = hexToHsl(query.color2);
      var generatedColor6 = hsltohex(hsl1[0], hsl1[1], 80);
    } else {
      console.log('Right is LIGHT');
      var hsl1 = hexToHsl(query.color2);
      var generatedColor6 = hsltohex(hsl1[0], hsl1[1], 20);
    }

    //Grayscale is a percentage, as it approaches 0, it becomes closer to black;
    //Set headers and right body text to white or black depending on background
    if ( hexToGrayscale(query.color1) < .5 ) {
      styles.headerFooter.color = 'white';
    } else {
      styles.headerFooter.color = 'black';
    }
    if ( hexToGrayscale(query.color3) < .5 ) {
      styles.right.color = 'white';
    } else {
      styles.right.color = 'black';
    }
    styles.headerFooter.backgroundColor = query.color1;
    styles.left.backgroundColor = query.color2;
    styles.right.backgroundColor = query.color3;
    styles.headersLeft.color = query.color4;
    styles.headerFooter.borderBottom = 'solid ' + query.color5 + ' 2px';
    styles.links.color = query.color5;
    styles.headersRight.color = generatedColor6;

  }();

  return (
    <div id="container">
      <div><FilterBar/></div>
      <main id="center" class="column" style={styles.headerFooter}>
        <article>
          <h1>Heading</h1>
        </article>
      </main>
      <div id="columnholder">
        <nav id="left"class="column" style={styles.left}>
          <h3 style={styles.headersLeft}>Left heading</h3>
          <ul>
            <li><a style={styles.links} href="#">Link 1</a></li>
            <li><a style={styles.links} href="#">Link 2</a></li>
            <li><a style={styles.links} href="#">Link 3</a></li>
            <li><a style={styles.links} href="#">Link 4</a></li>
            <li><a style={styles.links} href="#">Link 5</a></li>
          </ul>
          <h3 style={styles.headersLeft}>Left heading</h3>
          <ul>
            <li><a style={styles.links} href="#">Link 1</a></li>
            <li><a style={styles.links} href="#">Link 2</a></li>
            <li><a style={styles.links} href="#">Link 3</a></li>
            <li><a style={styles.links} href="#">Link 4</a></li>
            <li><a style={styles.links} href="#">Link 5</a></li>
          </ul>
        </nav>
        <div id="innermid">
          <h2 style={styles.links}>Lorem Ipsum</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed augue velit. Nunc sit amet sagittis eros. Ut fermentum pulvinar neque, quis vehicula mi fringilla vel. Aenean vitae leo posuere, eleifend tellus at, viverra justo. Suspendisse eget sem vel nulla varius posuere. Sed magna ipsum, venenatis at efficitur ac, fringilla quis est. Nullam at efficitur orci, dapibus luctus justo.
            <br/><br/>Mauris interdum nibh sit amet tempor sagittis. Morbi auctor nunc mi, at egestas orci sagittis nec. Sed pulvinar viverra porttitor. In odio neque, interdum non sagittis nec, volutpat ut dui. Curabitur ultrices, nibh vel molestie molestie, nisi lacus vehicula risus, at gravida enim lectus eget velit. Suspendisse sit amet odio at dui vulputate euismod. Sed fringilla at mi vel tincidunt. Etiam pulvinar metus neque, eu ultricies tortor finibus non. Aliquam finibus lacinia lorem, nec porta ante semper vel. Sed maximus nec massa quis cursus. Vestibulum ut venenatis orci. Morbi faucibus pulvinar felis, sed bibendum ipsum tincidunt et. Integer risus arcu, fringilla eu ex non, pretium fringilla purus. Praesent volutpat est est, vitae tincidunt odio mollis sed. Proin dignissim, lorem ut semper imperdiet, turpis orci dignissim velit, eget cursus risus odio sit amet elit.
            <br/><br/>Sed nec porttitor velit, non aliquam ipsum. Suspendisse aliquam cursus lorem. Praesent cursus non ipsum a tincidunt. Cras commodo nunc et lectus iaculis luctus. Phasellus dapibus consequat odio, vel mattis ex elementum quis. Nunc id pulvinar nibh, eget fermentum neque. Nam hendrerit leo in sodales hendrerit. Praesent posuere velit vel lacus facilisis vehicula.
            <br/><br/>Phasellus id molestie ex. Nulla ac semper ante. Nam venenatis, dolor tempor fringilla pretium, enim lorem posuere lectus, vitae viverra purus sapien quis turpis. Nullam a viverra tellus, id mattis ligula. Aenean luctus eu ante et gravida. Vivamus hendrerit quam tellus, eget pretium neque efficitur in. Donec a risus quis erat laoreet mollis. Aenean vitae egestas mi.
            <br/><br/>Nullam lobortis pellentesque sem ut finibus. Phasellus sed vehicula eros. Sed mollis rhoncus diam, non cursus dolor scelerisque ac. Ut blandit quam ut semper aliquam. Maecenas scelerisque a elit id lobortis. Phasellus ut congue orci, nec dapibus tellus. Curabitur eu mauris placerat, consectetur arcu eget, viverra felis. Aenean interdum, justo vitae lobortis commodo, nibh erat aliquam tellus, sed sagittis purus sem sed eros. Praesent elementum nisi eu arcu sodales ultricies. Sed luctus luctus turpis, ac dapibus nisi finibus eu. Nulla tincidunt justo eget fringilla luctus. Ut porttitor faucibus turpis quis vestibulum. Donec congue, est sed tincidunt sagittis, ligula nisi interdum mauris, id efficitur sem tortor ut ante. Nullam eu fringilla turpis, sed pulvinar velit.
        </div>
        <div id="right" class="column" style={styles.right}>
          <h3 style={styles.headersRight}>What is Lorem Ipsum</h3>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          <h3 style={styles.headersRight}>Why do we use it</h3>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>
      </div>
    <div id="footer-wrapper">
      <footer id="footer" style={styles.headerFooter}><p>Footer...</p></footer>
    </div>
  </div>
  );
};


export default Preview2;
