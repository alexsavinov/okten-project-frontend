import { Editor } from "@ckeditor/ckeditor5-core";

export class MyUploadAdapter {
  loader: any;
  xhr: any;

  constructor(loader: Editor ) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file
      .then( (file: any) => new Promise( ( resolve, reject ) => {
        this._initRequest();
        this._initListeners( resolve, reject, file );
        this._sendRequest( file );
      } ) );
  }
  abort() {
    if ( this.xhr ) {
      this.xhr.abort();
    }
  }
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://mapit.itermit.com/api/v1/users/avatar', true ); // TODO change the URL
    xhr.responseType = 'json';
    xhr.setRequestHeader("Accept", "application/json");
  }
  // @ts-ignore
  _initListeners( resolve, reject, file ) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${ file.name }.`;
    xhr.addEventListener( 'error', () => reject( genericErrorText ) );
    xhr.addEventListener( 'abort', () => reject() );
    xhr.addEventListener( 'load', () => {
      const response = xhr.response;
      if ( !response || response.error ) {
        return reject( response && response.error ? response.error.message : genericErrorText );
      }
      resolve( {
        default: response.url
      } );
    } );
    if ( xhr.upload ) {
      // @ts-ignore
      xhr.upload.addEventListener( 'progress', evt => {
        if ( evt.lengthComputable ) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      } );
    }
  }
  // @ts-ignore
  _sendRequest( file ) {
    const data = new FormData();
    data.append( 'upload', file );
    this.xhr.send( data );
  }
}
