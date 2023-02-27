

// import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'


//     const MARVEL_API_PUBLIC_KEY = '7fead384f47c49c922b9b22230925b2d';
//     // const MARVEL_API_PRIVATE_KEY = '1f8c144f29d25d0a81ca0da06423d32ec165d7f1';
//     const MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';



//     const hash = "ec4422d50ee040bd47f23f7344073f23"

// export const marvelApi = createApi({
//     reducerPath: "marvel",

//     baseQuery: fetchBaseQuery({
//         baseUrl: MARVEL_API_URL,
//         prepareHeaders(headers) {
//             headers.set('Content-Type', 'application/json');
//             headers.set('Accept', 'application/json');
//             headers.set('Authorization', `Bearer ${MARVEL_API_PUBLIC_KEY}`);
//             headers.set('Hash', hash);
//             return headers;
//           },    
//     }),
//         endpoints(builder) {
//             return {
//                 getCharacters: builder.query({
//                     query(nameStartsWith) {
//                         return `/characters?nameStartsWith=${nameStartsWith}&limit=20&offset=0`
//                     }
//                 })
//             }
//         }
// })
// export const { useGetCharactersQuery} = marvelApi