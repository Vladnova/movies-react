import HomePage from "../pages/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import MoviesPage from "../pages/MoviesPage";

export const HeaderNav = [
    {
        name: 'Home',
        path:'/',
        exact: true,
        component:HomePage
        
    },
    {
        name: '',
        path: '/movies/:movieId',
        exact: false,
        component: MovieDetailsPage,
    },
    {
        name: 'Movies',
        path: '/movies',
        exact: true,
        component: MoviesPage        
    },    
]