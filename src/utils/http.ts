// import { RequestOptions } from '../interfaces/RequestOptions';

// function handleHttpRequestResult(event: Response, options: RequestOptions): object {
//     const result = {
//         success: [204, 202, 201, 200].indexOf(event.target.status) > -1,
//         status: event.target.status,
//         data: false,
//         error: null,
//         errorCode: 0,
//         title: '',
//     };

//     event.target.

//     // Try to extract response
//     if (event.target.responseType === 'arraybuffer') {
//         result.data = event.target.response;

//         if (options && options.transformer) {
//             options.transformer(result);
//         }
//     } else if (
//         (event.target.responseText && event.target.responseType === '') ||
//         event.target.responseType === 'text'
//     ) {
//         try {
//             result.data = JSON.parse(event.target.responseText);

//             if (options && options.transformer) {
//                 options.transformer(result);
//             }
//         } catch (e) {
//             result.success = false;
//             result.data = false;
//         }
//     }

//     // Set error
//     if (event.type !== 'load') {
//         result.error = event.type;
//     }

//     // Get error code?
//     return result;

//     return {}
// }

// export function request(url: string, options: RequestOptions): Promise<object> {
//     return new Promise((resolve: Function) => {
//         const xmlRequest = new XMLHttpRequest();
//         xmlRequest.addEventListener('load', (event) => {
//             resolve(handleHttpRequestResult(event, options));
//         });
//         xmlRequest.addEventListener('abort', (event) => {
//             resolve(handleHttpRequestResult(event, options));
//         });
//         xmlRequest.addEventListener('error', (event) => {
//             resolve(handleHttpRequestResult(event, options));
//         });
//         xmlRequest.addEventListener('timeout', (event) => {
//             resolve(handleHttpRequestResult(event, options));
//         });
//         xmlRequest.open(options.method, url);

//         if (options.authorization) {
//             xmlRequest.setRequestHeader(
//                 'Authorization',
//                 'Bearer ' + options.authorization,
//             );
//         }
//         if (options.acceptType) {
//             if (options.acceptType) {
//                 xmlRequest.setRequestHeader('accept', options.acceptType);
//             }
//         }
//         if (options.responseType) {
//             xmlRequest.responseType = options.responseType;
//         }
//         if (options.contentType) {
//             xmlRequest.setRequestHeader(
//                 'content-type',
//                 options.contentType || 'application/json',
//             );
//         }

//         if (options.body) {
//             if (typeof options.body === 'object') {
//                 xmlRequest.send(JSON.stringify(options.body, null, 4));
//             } else {
//                 xmlRequest.send(options.body);
//             }
//         } else if (options.formData) {
//             xmlRequest.send(options.formData);
//         } else {
//             xmlRequest.send();
//         }
//     });
// }
