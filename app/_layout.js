// this component is responsible for two things 
// 1. navigation in app
// 2. loading custom fonts 

import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'

//set splash screen visible until hide async is called
//prevent the splash screen from automatically hiding before the custom fonts have been loaded.
SplashScreen.preventAutoHideAsync();
const Layout = () => {

    //get the fonts
    const [fontsLoaded] =  useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    })

    //load them to screen
    const onLayoutRootView = useCallback(async () => {
        //app should not render any text before the fonts have been loaded, hide the splash screen if loaded
        if(fontsLoaded){
            await SplashScreen.hideAsync(); //hideAsync is called so splash screen is no more visible 
        }
    },[fontsLoaded]) //whenever the  fontsloaded changes the function is recreated

    if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView}/>
}

export default Layout;


