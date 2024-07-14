// import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
// export const getHomeRouteForLoggedInUser = userRole => {
//   return DefaultRoute
// }

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#F0F8CC', // for option hover bg-color
    primary: '#C78643', // for selected option bg-color
    // neutral10: '#C78643 !important', // for tags bg-color
    neutral20: '#C78643 !important', // for input border-color
    // neutral30: '#D8D6E2 !important' // for input hover border-color
  }
})
