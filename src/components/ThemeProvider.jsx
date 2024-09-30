import { useSelector } from "react-redux";

const ThemeProvider = ({children}) => {
    
    const {theme} = useSelector((state) => state.theme);

    return ( 
        <div className={theme}>
            <div className="bg-white text-gray-700 dark:text-gray-300 dark:bg-slate-800 min-h-screen">
                {children}
            </div>
        </div>
     );
}
 
export default ThemeProvider;