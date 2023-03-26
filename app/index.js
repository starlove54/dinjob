// Importing necessary packages

import { useState } from "react"
import {
    View,
    SafeAreaView,
    ScrollView
} from "react-native"
import {
    Stack, useRouter
} from 'expo-router'
import {
    COLORS,
    SIZES,
    images,
    icons
} from '../constants'
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome
} from '../components'

const Home = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")

    // Render the component
    return ( 
    <SafeAreaView 
    style = {{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
            }}
        >   
        {/* HEADER SECTION */}
        <Stack.Screen 
                options = {{
                headerStyle: {
                    backgroundColor: COLORS.lightWhite,
                },
                headerShadowVisible:false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl ={icons.menu}
                        dimension ="70%"
                    />
                ),
                headerRight: () => (    
                    <ScreenHeaderBtn
                        iconUrl ={images.profile}
                        dimension ="100%"
                    />
                ),
                headerTitle:""
            }
        }
        />
        {/* MAIN SECTION */}
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                flex:1,
                padding:SIZES.medium,
            }}>
            {/* WELCOME SECTION */}
                <Welcome
                searchTerm= {searchTerm}
                setSearchTerm= {setSearchTerm}
                handleClick = {() => {
                    if(searchTerm){
                        router.push(`/search/${searchTerm}`)
                    }
                }}
                />
                {/* POPULAR JOBS SECTION */}
                <Popularjobs/>
                {/* NEARBY JOBS SECTION */}
                <Nearbyjobs/>
            </View>
        </ScrollView>
         </SafeAreaView>
    )
}
export default Home;