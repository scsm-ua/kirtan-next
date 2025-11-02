/**/
export function displayVersionInfo() {
  try {
    // console.log(
    //   `%cBUILD INFO:`,
    //   'color: #aaa; font-weight: bold;',
    //   // @ts-ignore
    //   JSON.stringify(__BUILD_INFO__, null, 2)
    // );
    // const info = JSON.parse('<%- buildInfo %>');
    const styles = [
      // 'color: #957742',
      // 'background-color: #77CEF1',
      'color: royalBlue',
      'font-size: 14px',
      'font-weight: 600'
    ].join(';');

    console.log(`%c -={( Kirtan Site )}=-`, styles);
    console.log(JSON.stringify(__BUILD_INFO__, null, 2));
  } catch (e) {
    console.log('No build info given.');
  }
}
