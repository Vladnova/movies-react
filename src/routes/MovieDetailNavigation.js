import Cast from "../components/MoviesPreview/Cast";
import Reviews from "../components/MoviesPreview/Reviews";


export const MovieNav = [
    {
        name: 'Cast',
        path:'/cast',
        exact: true,
        component: Cast
        
    },
    {
        name: 'Reviews',
        path:'/reviews',
        exact: true,
        component: Reviews        
    }
]